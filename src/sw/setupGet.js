import { registerRoute } from 'workbox-routing';
import { hprefix } from './utils';

export function setupGet(assetcache) {
    const refresh = async ({ url, cache }) => {
        let resp = await fetch(`http://localhost:3003${url.pathname}`);
        
        if (`${resp.status}`.startsWith('2')) {
            const newHeaders = new Headers(resp.headers);
            newHeaders.append(`${hprefix}-status`, "CLOUD",);
            const newResp = new Response(resp.body, {
                status: resp.status,
                statusText: resp.statusText,
                headers: newHeaders
            });
            cache.put(`${url.pathname}`, newResp.clone());
            resp = newResp;
        }
        return resp.clone();
    };

    registerRoute(({ url }) => {
        return url.pathname.startsWith('/assets/');
    }, async ({ url }) => {
        const cache = await assetcache;
        let cachedResponds = await cache.match(`${url.pathname}`);
        const r = refresh({ url, cache }); // stale-while-revalidate
        return cachedResponds || r;
    }, 'GET');
}
