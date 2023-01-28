import { Queue } from 'workbox-background-sync';
import { WorkboxError } from 'workbox-core/_private/WorkboxError.js';

export function createQueue(uploadAsset) {
    return new Queue('assets-sync', {
        onSync: async ({ queue }) => {
            let entry;
            while (entry = await queue.shiftRequest()) {
                try {
                    await uploadAsset(entry);

                    console.info(
                        `Request for '${entry.request.url?.pathname || entry.request.url}' has been replayed in queue '${queue._name}'`
                    );
                } catch (error) {
                    await queue.unshiftRequest(entry);

                    console.error(
                        `Request for '${entry.request.url?.pathname || entry.request.url}' failed to replay, putting it back in queue '${queue._name}'`,
                        error
                    );
                    throw new WorkboxError('queue-replay-failed', { name: queue._name });
                }
            }
            console.log(
                `All requests in queue '${queue.name}' have successfully replayed; the queue is now empty!`
            );
        },
        maxRetentionTime: Infinity
    });
}
