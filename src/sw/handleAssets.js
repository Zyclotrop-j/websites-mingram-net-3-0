import { uploadAssetFactory } from './uploadAssetFactory';
import { hprefix } from './utils';
import { createQueue } from './createQueue';
import { setupGet } from './setupGet';
import { setupPut } from './setupPut';

export default () => {
    const assetcache = caches.open('asset-cache-remote');
    const uploadAsset = uploadAssetFactory(assetcache);

    const queue = createQueue(uploadAsset);

    setupPut(queue, assetcache);

    setupGet(assetcache);
}

