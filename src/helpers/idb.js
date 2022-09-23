import { openDB } from 'idb/with-async-ittr';

const assetStore = 'keyval';

const dbPromise = openDB(`${assetStore}-store`, 1, {
  upgrade(db) {
    db.createObjectStore(assetStore);
  },
});

export async function get(key) {
  return (await dbPromise).get(assetStore, key);
};
export async function set(key, val) {
  return (await dbPromise).put(assetStore, val, key);
};
export async function del(key) {
  return (await dbPromise).delete(assetStore, key);
};
export async function clear() {
  return (await dbPromise).clear(assetStore);
};
export async function keys() {
  return (await dbPromise).getAllKeys(assetStore);
};
export async function all() {
  return (await dbPromise).getAll(assetStore);
};
