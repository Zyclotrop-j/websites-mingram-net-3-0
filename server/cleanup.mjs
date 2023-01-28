import { join } from 'path';
import { fileURLToPath } from 'url'
import debounce from 'lodash.debounce';
import findRemoveSync from 'find-remove';

import { __dirname } from './dirname.mjs';

const clean = async (log, maxage = 60 * 60 * 24 * 7) => {
    await Promise.resolve();
    try {
        const dir = join(__dirname, 'tmp');
        log.info(`Cleaning up ${dir}`)
        const result = findRemoveSync(dir, {
            dir: '*', files: '*.*',
            ignore: '.gitkeep',
            age: { seconds: maxage },
            limit: 100
        });
        log.info(`Cleaned up ${Object.keys(result).length} files`, result);
    } catch (e) {
        log.error(e);
    }
};

export const cleanup = debounce(clean, 1000 * 60);

if (process.argv?.[1] === fileURLToPath(import.meta.url)) {
    clean({
        info: (...args) => console.info(...args),
        error: (...args) => console.error(...args),
    });
}
