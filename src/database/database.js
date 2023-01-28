import { createRxDatabase, addRxPlugin } from 'rxdb';
import { getRxStoragePouch, addPouchPlugin } from 'rxdb/plugins/pouchdb';
import PuchDBAdapterIDB from 'pouchdb-adapter-idb';
import { RxDBAttachmentsPlugin } from 'rxdb/plugins/attachments';
import { v4 as uuidv4 } from 'uuid';
import once from 'lodash.once';
import get from 'lodash.get';
import { RxDBMigrationPlugin } from 'rxdb/plugins/migration';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode'; // remove for prod!
import { attr } from 'svelte/internal';
addRxPlugin(RxDBDevModePlugin);

addRxPlugin(RxDBAttachmentsPlugin);
addPouchPlugin(PuchDBAdapterIDB);
addRxPlugin(RxDBMigrationPlugin);

const selectFromSchema = (schema, data) => {
    const {
        properties: { data: _, ...rest }
    } = schema;
    return Object.fromEntries(Object.keys(rest).map(key => [key, get(data, key.replaceAll('__', '.'))]));
}

const database = await createRxDatabase({
  name: 'projectdb',
  storage: getRxStoragePouch(
    'idb',
    {
        /**
         * other pouchdb specific options
         * @link https://pouchdb.com/api.html#create_database
         */
    }
  )
});
const collection = once((database, schemas) => database.addCollections({
    ...schemas
}));
export default async function (editor) {
    const assetSchema = {
        title: 'asset schema',
        version: 1,
        primaryKey: 'name',
        type: 'object',
        properties: {
            name: {
                type: 'string',
                maxLength: '00000000-0000-0000-0000-000000000000'.length,
            },
            extension: { type: 'string' },
            'meta__original_name': { type: 'string', maxLength: 50 },
            lastModified: { type: 'integer' },
            src: { type: 'string' },
            subtype: { type: 'string', maxLength: 50 },
            type: { type: 'string', maxLength: 50 },
            data: {
                type: 'object',
            },
            project: { type: 'string', maxLength: '00000000-0000-0000-0000-000000000000'.length * 3 + 3 },
        },
        indexes: [
            'subtype',
            'type',
            ['subtype', 'type'],
            'meta__original_name',
            'project',
        ],
        required: ['name', 'data', 'project'],
    }
    const styleSchema = {
        title: 'style schema',
        version: 1,
        primaryKey: 'project',
        type: 'object',
        properties: {
            data: {
                type: 'object',
            },
            project: { type: 'string', maxLength: '00000000-0000-0000-0000-000000000000'.length * 3 + 3 },
        },
        required: ['data', 'project'],
    }
    const pageSchema = {
        title: 'page schema',
        version: 1,
        primaryKey: 'id',
        type: 'object',
        properties: {
            id: {
                type: 'string',
                maxLength: '00000000-0000-0000-0000-000000000000'.length,
            },
            name: { type: 'string', maxLength: 500 },
            path: { type: 'string', maxLength: 2000 },
            title:{ type: 'string', maxLength: 500 },
            data: {
                type: 'object',
            },
            project: { type: 'string', maxLength: '00000000-0000-0000-0000-000000000000'.length * 3 + 3 },
        },
        indexes: [
            'name',
            'path',
            'title',
            'project',
        ],
        required: ['id', 'data', 'project'],
    }
    const componentSchema = {
        title: 'component schema',
        version: 1,
        primaryKey: 'c_id',
        type: 'object',
        properties: {
            c_id: { type: 'string', maxLength: '00000000-0000-0000-0000-000000000000'.length, minLength: '00000000-0000-0000-0000-000000000000'.length },
            idx: { type: 'integer' },
            type: { type: 'string', maxLength: 100, minLength: 1 },
            data: {
                type: 'object',
            },
            project: { type: 'string', maxLength: '00000000-0000-0000-0000-000000000000'.length * 3 + 3 },
            parentId: { type: 'string', maxLength: '00000000-0000-0000-0000-000000000000'.length, minLength: '00000000-0000-0000-0000-000000000000'.length },
        },
        indexes: [
            'type',
            'project',
        ],
        required: ['c_id', 'type', 'data', 'project', 'idx'],
    }
    const createCollections = () => collection(database, {
        assets: {
            schema: assetSchema,
            migrationStrategies: {
                1: function(oldDoc){ // 1 means, this transforms data from version 0 to version 1
                  return oldDoc;
                }
            }
        },
        styles: {
            schema: styleSchema,
            migrationStrategies: {
                1: function(oldDoc){
                  return oldDoc;
                }
            }
        },
        pages: {
            schema: pageSchema,
            migrationStrategies: {
                1: function(oldDoc){
                  return oldDoc;
                }
            }
        },
        components: {
            schema: componentSchema,
            migrationStrategies: {
                1: function(oldDoc){
                  return oldDoc;
                }
            }
        },
    });

    const currentProject = 'project-1';

    editor.Storage.add('pouchdb', {
        async load(options = {}) {
            await createCollections();
            const [style, assets, pages, components] = await Promise.all([
                database.styles.findOne({
                    selector: {
                        project: currentProject
                    }
                }).exec(),
                database.assets.find({
                    selector: {
                        project: currentProject
                    }
                }).exec(),
                database.pages.find({
                    selector: {
                        project: currentProject
                    }
                }).exec(),
                database.components.find({
                    selector: {
                        project: currentProject
                    }
                }).exec(),
            ]);
            const cmap = components.map(c => ({ // create a mutable copy
                ...c.data.data,
                parentId: c.data.parentId,
                idx: c.data.idx,
                c_id: c.c_id,
            }))
            const componentIndex = Object.fromEntries(cmap.map(comp => [comp.c_id, comp]));
            const topLevelComponents = {};
            cmap.forEach(component => { // re-construct the tree
                const p = componentIndex[component.parentId];
                if(p) {
                    p.components ??= [];
                    p.components[component.idx ?? p.components.length] = component;
                } else { // if it's not in the tree, it must be inthe root
                    topLevelComponents[component.parentId] = component;
                }
            });
            const ppages = pages.map(page => {
                const { frames, ...attrs } = page.data;
                return {
                    ...attrs,
                    frames: frames.map(frame => {
                        const component = topLevelComponents[frame.c_id];
                        delete topLevelComponents[frame.c_id];
                        return {
                            ...frame,
                            component
                        };
                    })
                };
            });
            if(Object.keys(topLevelComponents).length) {
                console.warn(`Found orphan nodes`, topLevelComponents);
            }
            if(ppages.length < 1) {
                ppages.push({
                        component: `<div class="test">Initial content</div>`
                  })
            }
            return { assets: assets.map(asset => asset.data), pages: ppages, styles: style?.data || [] };
        },
    
        async store(data, options = {}) {
            const { assets, pages, styles }= data;
            await createCollections();

            const flatten = (root, parent, idx, globalAttrs) => {
                const { components = [], type, attributes = {}, ...attrs } = root;
                const thisId = attrs.c_id || attributes.c_id || uuidv4();
                const children = components.flatMap((item, idx) => flatten(item, thisId, idx, globalAttrs));
                return [
                    { 
                        ...globalAttrs,
                        data: {
                            ...globalAttrs,
                            ...attrs,
                            attributes: {
                                c_id: thisId,
                                ...attributes,
                            },
                            type,
                        },
                        parentId: parent,
                        c_id: thisId,
                        type,
                        idx
                    },
                    ...children,
                ];
            }
            const { pages: ppages, components: pcomponents } = pages.reduce(({ pages, components }, page) => {
                const { frames, ...attrs } = page;
                const framesAndComponents = frames.map(frame => {
                    const { component, attributes = {}, c_id = attributes.c_id || uuidv4(), ...attrs } = frame
                    const components = flatten(component, c_id, 0, {
                        page: page.id,
                    });
                    return {
                        frame: {
                            ...attrs,
                            attributes: {
                                c_id: c_id,
                                ...attributes
                            },
                            c_id
                        },
                        components,
                    }
                });

                return {
                    pages: [
                        ...pages,
                        {
                            ...attrs,
                            frames: framesAndComponents.map(({ frame }) => frame)
                        }
                    ], components: [
                        ...components,
                        ...framesAndComponents.flatMap(({ components }) => components)
                    ]
                } ;
            }, { pages: [], components: [] });

            // todo: more optimisation logic here to only save actual changes!!

            await Promise.all([
                database.components.find({
                    selector: { project: currentProject, c_id: { $nin: pcomponents.map(c => c.c_id) } }
                }).remove(),
                database.components.bulkUpsert(pcomponents.map(component => ({
                    ...selectFromSchema(componentSchema, component),
                    project: currentProject,
                    data: component,
                }))),
                database.assets.bulkUpsert(assets.map(asset => ({
                    ...selectFromSchema(assetSchema, asset),
                    project: currentProject,
                    data: asset,
                }))),
                database.pages.find({
                    selector: { project: currentProject, id: { $nin: ppages.map(c => c.id) } }
                }).remove(),
                database.pages.bulkUpsert(ppages.map(page => ({
                    id: page.id || uuidv4(),
                    ...selectFromSchema(pageSchema, page),
                    project: currentProject,
                    data: page,
                }))),
                database.styles.upsert({
                    project: currentProject,
                    data: styles,
                }),
            ]);
            console.info(`Saved page`);
        }
    });
    
    
    
    /*
    myDocument.lastName$.subscribe(lastName => {
        console.log('lastName is now ' + lastName);
    });
    const foundDocuments = await database.documents.find({
        selector: {
            age: {
                $gt: 21
            }
        }
    }).exec();
    await myDocument.atomicPatch({
        lastName: 'Carol'
    });
    await myDocument.remove();
    */
    
}