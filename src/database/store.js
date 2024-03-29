import { v4 as uuidv4 } from 'uuid';
import isEqual from 'lodash.isequal';
import { database, createCollections } from './collection';
import { getSchemas } from './getSchemas';
import { flattenTree, selectFromSchema } from './db-utils';

let lastData = null;

export async function _store(storeMutext, data, currentProject) {
    await storeMutext.runExclusive(async () => {
        const { assets, pages, styles } = data;
        const { assetSchema, styleSchema, pageSchema, componentSchema } = getSchemas();
        await createCollections();

        const { pages: ppages, components: pcomponents } = flattenTree(pages);

        const baseSelector = { project: currentProject };

        let ncomp = pcomponents.map(component => ({
            ...selectFromSchema(componentSchema, component),
            ...baseSelector,
            data: component,
        }));
        let nass = assets.map(asset => ({
            ...selectFromSchema(assetSchema, asset),
            ...baseSelector,
            data: asset,
        }));
        let npag = ppages.map(page => ({
            id: page.id || uuidv4(),
            ...selectFromSchema(pageSchema, page),
            ...baseSelector,
            data: page,
        }));
        // todo: organise styles as array - else it's too big for foundation db!
        let nsty = {
            ...baseSelector,
            data: styles,
        };
        ncomp = ncomp.filter(comp => {
            // never sync svg as they're dynamically fetched in the editor
            return !["svg", "svg-in"].includes(comp?.data?.data?.type);

        });
        if (lastData) {
            const { ncomp: ocomp, nass: oass, npag: opag, nsty: osty } = lastData;
            lastData = { ncomp, nass, npag, nsty };
            const ncompL = ncomp.length;
            ncomp = ncomp.filter(comp => {
                const oldState = ocomp.find(c => c[componentSchema.primaryKey] === comp[componentSchema.primaryKey])?.data;
                const iseq = isEqual(oldState, comp.data);
                if (!iseq) {
                    console.log("Unable to dedupe: ", oldState, comp.data);
                }
                return !iseq;
            });
            const nassL = nass.length;
            nass = nass.filter(comp => {
                const oldState = oass.find(c => c[assetSchema.primaryKey] === comp[assetSchema.primaryKey])?.data;
                return !isEqual(oldState, comp.data);
            });
            const npagL = npag.length;
            npag = npag.filter(comp => {
                const oldState = opag.find(c => c[pageSchema.primaryKey] === comp[pageSchema.primaryKey])?.data;
                return !isEqual(oldState, comp.data);
            });
            nsty = isEqual(osty.data, nsty.data) ? null : nsty;
            console.log(`Reduced save: Components from ${ncompL} to ${ncomp.length}; Assets from ${nassL} to ${nass.length}; Pages from ${npagL} to ${npag.length}; Styles from 1 to ${+!!nsty}`);
            console.log("Remaing components: ", ncomp);
        } else {
            lastData = { ncomp, nass, npag, nsty };
        }


        // todo: more optimisation logic here to only save actual changes!!
        // todo: watch changes and update according nodes!
        await Promise.all([
            // remove all deleted components
            database.components.find({
                selector: { ...baseSelector, c_id: { $nin: pcomponents.map(c => c.c_id) } }
            }).remove(),
            // update all components in tree
            database.components.bulkUpsert(ncomp),
            // remove all deleted assets
            database.assets.find({
                selector: { ...baseSelector, name: { $nin: assets.map(c => c.name) } }
            }).remove(),
            // upsert all assets
            database.assets.bulkUpsert(nass),
            // remove all deleted pages
            database.pages.find({
                selector: { ...baseSelector, id: { $nin: ppages.map(c => c.id) } }
            }).remove(),
            // update all pages
            database.pages.bulkUpsert(npag),
            // there is exactly one db-entry with all styles per project, so no need to delete any styles
            // update all styles
            nsty ? database.styles.upsert(nsty) : Promise.resolve(),
        ]);

        console.info(`Saved page`);
    });
    return lastData;
}
