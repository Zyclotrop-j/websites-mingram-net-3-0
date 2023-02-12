import { v4 as uuidv4 } from 'uuid';
import get from 'lodash.get';

export function unFlattenTree(components, pages) {
    const cmap = components.map(c => ({
        ...c.data.data,
        parentId: c.data.parentId,
        idx: c.data.idx,
        c_id: c.c_id,
    }));
    const componentIndex = Object.fromEntries(cmap.map(comp => [comp.c_id, comp]));
    

    const topLevelComponents = {};
    cmap.forEach(component => {
        const p = componentIndex[component.parentId];
        if (p) {
            p.components ??= [];
            p.components[component.idx ?? p.components.length] = component;
        } else { // if it's not in the tree, it must be inthe root
            topLevelComponents[component.parentId] = component;
        }
        delete component.parentId;
        delete component.idx;
    });
    const ppages = pages.map(page => {
        const { frames, ...attrs } = page.data;
        return {
            ...attrs,
            frames: frames.map(frame => {
                const component = topLevelComponents[frame.c_id];
                if(!component) {
                    console.warn(`Expect topLevel component to exist, but dind't find any for frame ${frame.c_id}`)
                }
                delete topLevelComponents[frame.c_id];
                return {
                    ...frame,
                    component
                };
            })
        };
    });
    if (Object.keys(topLevelComponents).length) {
        console.warn(`Found orphan nodes`, topLevelComponents);
    }
    return ppages;
}

function recursiveflattenTree(root, parent, idx, globalAttrs) {
    const { components = [], type, ...attrs } = root;
    const thisId = attrs.c_id;
    if(!thisId) { // if this doesn't have an id yet, skip until it has
        return [];
    }
    const children = components.flatMap((item, idx) => recursiveflattenTree(item, thisId, idx, {
        ...globalAttrs,
        isFrameChild: false,
    }));
    return [
        {
            ...globalAttrs,
            data: {
                ...globalAttrs,
                ...attrs,
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

export function flattenTree(pages) {
    return pages.reduce(({ pages, components }, { frames, ...pageAttrs }) => {
        // seperate frames and components
        const framesAndComponents = frames.map(({ component, attributes = {}, c_id: frameCId = attributes.c_id || uuidv4(), ...rest }) => {
            // recursively walk and flatten the component tree
            const components = recursiveflattenTree(component, frameCId, 0, {
                isFrameChild: true, 
                page: pageAttrs.id,
            });
            return {
                frame: {
                    ...rest,
                    attributes: {
                        c_id: frameCId,
                        ...attributes
                    },
                    c_id: frameCId
                },
                components,
            };
        });
        // the page without any components, only the top-level frames
        const newPage = {
            ...pageAttrs,
            frames: framesAndComponents.map(({ frame }) => frame)
        };
        // flattened-out components
        const newComponents = framesAndComponents.flatMap(({ components }) => components);

        return {
            pages: pages.concat([newPage]),
            components: components.concat(newComponents),
        }
    }, { pages: [], components: [] });
}

export const selectFromSchema = (schema, data) => {
    const {
        properties: { data: _, ...rest }
    } = schema;
    return Object.fromEntries(Object.keys(rest).map(key => [key, get(data, key.replaceAll('__', '.'))]));
}

