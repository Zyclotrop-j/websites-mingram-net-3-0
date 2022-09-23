import draggable from '../../helpers/draggable';

export const type =  'img';

export default editor => {
    const domc = editor.DomComponents;
    const defaultType = domc.getType('default');
    const textType = domc.getType('text');
    const defaultModel = defaultType.model;
    const defaultView = defaultType.view;

    const {
        id: imageId, model: Model, view
    } = editor.DomComponents.getType("image");
    class Image extends Model {
        get defaults() {
            return {
                ...super.defaults,
                type,
                draggable: draggable(`*`),
                attributes: {
                    class: 'image'
                },
                traits: [
                    ...super.defaults.traits, // alt
                    {
                        type: 'class_select',
                        options: [
                            {value: '', name: 'Square'},
                            {value: 'round', name: 'Round'},
                        ],
                        label: 'Is round?'
                    },
                    {
                        type: 'checkbox',
                        name: 'data-force-auto-height',
                        label: 'Force auto-height?',
                      },
                      {
                        type: 'checkbox',
                        name: 'data-force-auto-width',
                        label: 'Force auto-width?',
                      },
                ],
                stylable: [
                    'width',
                    'height',
                    'opacity',
                    'filter',
                    'transform',

                    // img
                    'object-fit',
                    'image-rendering',
                    'object-position',
                ],
            }
        }
    }
    editor.Components.addType(type, {
        model: Image,
        view: view
    });
    const existingSelector = editor.Selectors.getAll().findWhere({
        type: 1,
        name: "image",
    });
    if(existingSelector) {
        existingSelector.set({ private: true });
    } else {
        const selectorFn =  (selector) => { 
            if(selector.isClass() && selector.get('name') === "image") {
                selector.set({ private: true });
                editor.off('selector:add', selectorFn);
            }
        };
        editor.on('selector:add', selectorFn);
    }
    
}