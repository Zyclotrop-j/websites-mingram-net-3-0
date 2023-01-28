import {precacheAndRoute, cleanupOutdatedCaches} from 'workbox-precaching';
import './sw/win.js';
import handleAssets from './sw/handleAssets';

const STATIC_ASSETS = self.__WB_MANIFEST;

addEventListener('message', (event) => {
    if (event.data?.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

//cleanupOutdatedCaches();
//precacheAndRoute(STATIC_ASSETS.filter(({url}) => !url.includes('/sw.js'))); // never cache the sw itself, else we'll be stuck endlessly!
handleAssets();