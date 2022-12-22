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

        initialize(o) {
            // not pretty, but best workaround I could find :(
            Model.prototype.initialize.apply(this, arguments);
            const checkAndRemoveClass = () => {
                try {
                    this.view.$el.removeClass(`gjs-plh-image`);
                    return true;
                } catch(e) {
                    return false;
                }
            }
            const scheudle = () => {
                setTimeout(() => {
                    if(!checkAndRemoveClass()) {
                        scheudle();
                    }
                }, 200);
            }
            //scheudle();
        }

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
    class View extends view {
        init(...args) {
            super.init(...args);
            this.listenTo(this.model, 'change:src', () => {
                // grapejs applies an "empty class" which messes with our styles -> remove it!
                this.$el.removeClass(`gjs-plh-image`);
            });
        }
        render(...args) {
            const r = super.render(...args);
            // grapejs applies an "empty class" which messes with our styles -> remove it!
            this.$el.removeClass(`gjs-plh-image`);
            return r;
        }
    }
    editor.Components.addType(type, {
        model: Image,
        view: View,
        privateClass: ['round']
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