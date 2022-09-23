import fs from 'node:fs/promises';
import fss from 'node:fs';
import { lookupCollections, locate } from '@iconify/json';
import { getIconData, iconToSVG, replaceIDs, defaultIconData, mergeIconData } from '@iconify/utils';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const dir = join(dirname(fileURLToPath(import.meta.url)), '..', `static/icons`);
(async () => {
    const promises = [];
    const descriptions = [];
   // Get list of all icon sets
   const iconSets = await lookupCollections();
   const prefixes = Object.keys(iconSets);

   await fs.mkdir(dir, { recursive: true });
   const existingfiles = await fs.readdir(dir);

   for(const prefix of prefixes) {
    const iconset = JSON.parse(`${await fs.readFile(locate(prefix))}`);
    const allIconNames = [...Object.keys(iconset.icons), ...Object.keys(iconset.aliases ?? {})];
    const {  info: iconsetmeta } = iconset;
    for(const name of allIconNames) {

        const iconData = getIconData(iconset, name);
        const alliconmetadata = mergeIconData(mergeIconData(defaultIconData, iconset), iconData);
        const finalIconData = {
            ...alliconmetadata,
            body: iconData.body,
        };
        const renderData = iconToSVG(finalIconData, { width: 'auto', height: 'auto' });
        const svgAttributes = {
            'xmlns': 'http://www.w3.org/2000/svg',
            'xmlns:xlink': 'http://www.w3.org/1999/xlink',
            ...renderData.attributes,
        };
        const svgAttributesStr = Object.keys(svgAttributes)
            .map(
                (attr) =>
                    // No need to check attributes for special characters, such as quotes,
                    // they cannot contain anything that needs escaping.
                    `${attr}="${svgAttributes[attr]}"`
            )
            .join(' ');
        
        // Generate SVG
        const svg = `<svg ${svgAttributesStr}>${renderData.body}</svg>`;
        descriptions.push({
            meta: {
                ...iconsetmeta,
                ...alliconmetadata
            },
            file: `icons/${`${prefix}-${name}.svg`}`,
            name: name,
            collection: prefix,
        });
        promises.push({
            n: `${prefix}-${name}.svg`,
            fn: async () => {
                const fname = join(dir, `${prefix}-${name}.svg`);
                await fs.writeFile(fname, svg);
            }
        });
    }
   }
   const chunkSize = 3000;
   console.log(`Writing ${promises.length} files`);
   const existingfilesset = new Set(existingfiles);
   const filteredpromises = promises.filter(({n}) => !existingfilesset.has(n));
    for (let i = 0; i < filteredpromises.length; i += chunkSize) {
        const chunk = filteredpromises.slice(i, i + chunkSize);
        await Promise.all(chunk.map(({fn}) => fn()));
        console.log(`Wrote ${i} of ${filteredpromises.length} (${Math.floor((i / filteredpromises.length) * 100)}%)`)
    }
    await fs.writeFile(join(dir, '..', 'icons.json'), JSON.stringify(descriptions, null, '\t'));
   console.log('done')
   
})();