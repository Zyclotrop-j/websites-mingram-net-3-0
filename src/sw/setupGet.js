import { registerRoute } from 'workbox-routing';

export function setupGet(assetcache) {
    const refresh = async ({ url, cache }) => {
        const resp = await fetch(`http://localhost:3003${url.pathname}`);
        if (`${resp.status}`.startsWith('2'))
            cache.put(`${url.pathname}`, resp.clone());
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
