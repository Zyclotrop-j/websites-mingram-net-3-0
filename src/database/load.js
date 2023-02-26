import { database, createCollections } from './collection';
import { unFlattenTree } from './db-utils';

export async function _load(loadMutext, currentProject, options = {}, omit = {}) {
    console.log("Start load");
    const result = await loadMutext.runExclusive(async () => {
        await createCollections();
        const q = {
            get query() {
                return {
                    selector: {
                        project: currentProject
                    }
                };
            }
        };
        const [style, assets, pages, components] = await Promise.all([
            omit.styles === false ? Promise.resolve({data: []}) : database.styles.findOne(q.query).exec(),
            omit.assets === false ? Promise.resolve([]) : database.assets.find(q.query).exec(),
            omit.pages === false ? Promise.resolve([]) : database.pages.find(q.query).exec(),
            omit.components === false ? Promise.resolve([]) : database.components.find(q.query).exec(),
        ]);
        const ppages = unFlattenTree(components, pages);
        if (ppages.length < 1) {
            ppages.push({
                component: `<div class="test">Initial content</div>`
            });
        }
        return { assets: assets.map(asset => asset.data), pages: ppages, styles: style?.data || [] };
    });
    console.log("End load");
    return result;
}
