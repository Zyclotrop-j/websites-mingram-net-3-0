import debounce from 'lodash.debounce';
import draggable from '../../helpers/draggable';
import "./Map";

export const type =  'map-l';

export default editor => {
    const domc = editor.DomComponents;
    const defaultType = domc.getType('default');

    editor.Components.addType(type, {
        isComponent: el => el?.tagName?.toLowerCase() === type, // only used if we need to parse external html - internal ones already has data-gjs-type-attr
        model: {
            defaults: {
                tagName: type,
                draggable: draggable('*'),
                droppable: '*',
                attributes: {
                  mode: 'lock',
                  auto: 'none',
                },
                stylable: [
                  'width',
                  'padding',
                  'margin',
                  'color',
                  'background-color',

                  // Container
                  'gap',
                  'flex-direction-column',
                  'flex-wrap',
                  'justify-content',
                  'align-content',
                  'align-items',
                  // Item
                  'order',
                  'flex-grow',
                  'flex-shrink',
                  'flex-basis',
                  'align-self',
                  'justify-self',

                  // Border
                  'border-radius',
                  'border-color',
                  'border-width',
                  'border-style',
                ],
                traits: [
                  {
                    type: 'select',
                    options: [
                      { value: 'none', name: 'none' },
                      { value: 'height', name: 'fill height' },
                    ],
                    label: 'Auto-fill height?',
                    name: 'auto',
                  },
                  {
                    type: 'select',
                    options: [
                      { value: 'lock', name: 'lock' },
                      { value: 'edit', name: 'edit' },
                    ],
                    label: 'Edit map?',
                    name: 'mode',
                  },
                  {
                    type: 'coordinate',
                    name: 'coordinate',
                    label: 'Lat and lng'
                  },
                  'zoom',
                  {
                    type: 'checkbox',
                    name: 'data-force-fullwidth',
                    label: 'Force full-width?',
                  },
                ],
                components: [{
                  type: 'box-l',
                  components: `<hr data-spacer="vertical" style="height:244px; --w2:0;" />`,
                }],
                styles: ``,
              },
        },
        view: {
          init({ model, el }) {
            model.addAttributes({ mode: 'lock' })
            this.listenTo(model, 'change:attributes', model => {
              if(model.getAttributes().mode === 'edit') {
                model.set({ draggable: false });
              } else {
                model.set({ draggable: draggable('*') });
              }

            });
            function onMutation(mutations) {
              const changeset = {};
              mutations.forEach(function(mutation) {
                if (mutation.type === "attributes") {
                  changeset[mutation.attributeName] = mutation.target[mutation.attributeName];
                }
              });
              model.addAttributes(changeset);
              model.em.trigger('component:toggled');
            }
            const debouncedOnMutation = debounce(onMutation, 200);
            const observer = new MutationObserver((mutations) => {
              if(model.getAttributes().mode === 'edit') return onMutation(mutations);
              return debouncedOnMutation(mutations);
            });
            observer.observe(el, {
              attributes: true,
              attributeFilter: ['coordinate', 'zoom'],
            });
          }
        }
    });
}


