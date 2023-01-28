import HugeUploader from 'huge-uploader';
import { sendMessage, hprefix } from "./utils";

export function uploadAssetFactory(assetcache) {
    const uploadurl = '//localhost:3003/upload/';
    return ({ request: oldrequest }) => {
        const request = oldrequest.clone();
        const requestpathname = `${request.url.pathname}`;
        const requesturl = `${request.url}`;
        const assetname = `${request.headers.get('name')}`;
        const requestheaderentries = request.headers.entries();
        const headers = Object.fromEntries([...requestheaderentries].filter(([i]) => !i.startsWith('sec-ch') && i !== 'user-agent').map(([k, v]) => {
            if (k === 'content-type') {
                return ['filetype', v];
            }
            return [k, v];
        }));
        return new Promise(async (res, rej) => {
            const meta = {
                ...headers,
                filename: headers.name,
            };

            const uploader = new HugeUploader({ endpoint: uploadurl, file: new File([await request.blob()], headers.name), headers: meta /* postParams */ });

            uploader.on('error', async (error) => {
                const cache = await assetcache;
                cache.delete(requestpathname);
                sendMessage({
                    type: 'ASSET_UPLOAD_ERROR', payload: {
                        ...meta,
                        error
                    }
                });
                console.error(error);
                rej(error);
            });
            uploader.on('progress', (progress) => {
                const percentage = progress.detail;
                sendMessage({
                    type: 'ASSET_UPLOAD_PROGRESS', payload: {
                        ...meta,
                        ...progress,
                        percentage,
                    }
                });
            });
            uploader.on('finish', async (body) => {
                const cache = await assetcache;
                const remoteItem = await fetch(`http://localhost:3003/assets/${assetname}`); // move new item into cache
                cache.put(requesturl, remoteItem);
                sendMessage({
                    type: 'ASSET_UPLOAD_SUCCESS', payload: {
                        ...meta,
                        "Content-Type": request.headers.get("Content-Type"),
                        location: `${request.url.pathname}/${headers.name}`,
                        [`${hprefix}-original`]: `${uploadurl}`,
                        [`${hprefix}-name`]: meta.filename,
                        [`${hprefix}-status`]: "CLOUD",
                    }
                });
                res();
            });
            uploader.on('fileRetry', (msg) => sendMessage({
                type: 'ASSET_UPLOAD_RETRY', payload: {
                    ...meta,
                    ...msg,
                }
            })
            );
        });
    };
}
