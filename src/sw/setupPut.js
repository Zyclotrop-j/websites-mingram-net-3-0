import { registerRoute } from 'workbox-routing';
import { hprefix } from './utils';

export function setupPut(queue, assetcache) {
    function buildResponseFromRequest(assetcache) {
        return async ({ url, request }) => {
            const clone = request.clone();
            const body = () => clone.clone().body;
            const cache = await assetcache;
            const resp = (fn) => new Response(body(), fn({
                status: 200,
                statusText: "OK",
                headers: {
                    "Content-Type": request.headers.get("Content-Type"),
                    Location: url
                }
            }));
            await cache.put(new Request(
                `${url}`,
                {
                    method: "GET"
                }
            ), resp(obj => ({
                ...obj,
                [`${hprefix}-cache`]: "CACHE",
            })));
            return resp;
        };
    }
    registerRoute(({ url }) => {
        return /^\/?assets\/?$/.test(url.pathname);
    }, async ({ url: ourl, request, event }) => {
        const url = `${ourl.pathname}${ourl.pathname.endsWith('/') ? '' : '/'}${request.headers.get('name')}`;
        const offlineResponseBuilder = await buildResponseFromRequest({ url, request, event }); // build an offline-response while we're trying the uploading
        try {
            await queue.pushRequest({ request, url });
            return offlineResponseBuilder(obj => ({
                ...obj,
                headers: {
                    ...obj.headers,
                    [`${hprefix}-status`]: "QUEUED",
                }
            }));
        } catch (error) {
            return offlineResponseBuilder(obj => ({
                ...obj,
                status: 500,
                headers: {
                    ...obj.headers,
                    [`${hprefix}-error`]: error,
                    [`${hprefix}-status`]: "ERROR",
                }
            }));
        }
    }, 'PUT');
}
