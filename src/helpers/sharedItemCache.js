import PQueue from 'p-queue';
import LRU from 'lru-cache';

const options = {
    max: 500,
}

const cache = new LRU(options)
export default new Proxy(cache, {
    get(target, prop) {
        return target.get(prop);
    },
    set(target, prop, value) {
        return target.set(prop, value);
    }
});
const queue = new PQueue({concurrency: 10});
export const sharedFetch = async file => {
    const data = await queue.add(() => 
        fetch(file)
            .then(i => i.text())
            .then(i => i.replace('<svg', '<svg class="icon"'))
            .catch(i => `Failed to fetch ${fname}`)
    );
    return data;
};