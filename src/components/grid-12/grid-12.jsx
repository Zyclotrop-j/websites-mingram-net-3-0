import draggable from '../../helpers/draggable';
import element from "./webcomponent";

export const type =  'grid-12';
export const itemType = 'grid-item';

export default editor => {
    const domc = editor.DomComponents;
    const defaultType = domc.getType('default');
    const textType = domc.getType('text');
    const defaultModel = defaultType.model;
    const defaultView = defaultType.view;
    //console.log(editor.Devices)
    editor.on(editor.Devices.events.select, (e) => {
      //console.log(e)
      e.id; // Desktop
      e.attributes.widthMedia; // width for mediaQuery or ''
      /*
      Change the trait to apply to mobile
      {
        type: 'select', // Type of the trait
        label: 'Width', // The label you will see in Settings
        name: 'data-width', // The name of the attribute/property to use on component
        options: [
          notDefaultWidth && { id: 'none', name: 'inherit' }
          { id: 'auto', name: 'auto'},
          ...Array.from({length: 12}).map((_, idx) => ({ id: `${idx+1}`, name: `Span ${idx+1}`}))
        ]
      }
      */
    });

    editor.Components.addType(type, {
        isComponent: el => el?.tagName?.toLowerCase() === element, // only used if we need to parse external html - internal ones already has data-gjs-type-attr
        model: {
            defaults: {
                tagName: element,
                draggable: draggable('*'),
                droppable: `${itemType},grid-row`,
                attributes: {
                  // permanent dom-attributes
                  class: '',
                  // defaults for traits
                  name: 'default-name',
                },
                stylable: [
                  'padding-top',
                  'padding-bottom',
                  'margin-top',
                  'margin-bottom',
                  'background-color',
                  
                  // Item
                  'order',
                  'flex-grow',
                  'flex-shrink',
                  'flex-basis',
                  'align-self',
                  'justify-self',

                  // Container
                  'gap',
                  'flex-direction-row',
                  'justify-content',
                  'align-content',
                  'align-items',
                ],
                traits: [
                  'name',
                ],
                components: [
                  {
                    type: itemType,
                    attributes: {'data-width': '1'},
                    components: [{
                      type: 'text',
                      components: `Col 1`,
                    }],
                  },
                  {
                    type: itemType,
                    attributes: {'data-width': '2'},
                    components: [{
                      type: 'text',
                      components: `Col 2`,
                    }],
                  },
                  {
                    type: itemType,
                    attributes: {'data-width': '3'},
                    components: [{
                      type: 'text',
                      components: `Col 3`,
                    }],
                  },
                  {
                    type: itemType,
                    attributes: {'data-width': '6'},
                    components: [{
                      type: 'text',
                      components: `Col 6`,
                    }],
                  },
                ],
                styles: `
                    grid-12 { display: flex; flex-wrap: wrap; }
                `,
              }
        },
        view: {
            
        }
        // view: -> this defines editor-only stuff
    });

    editor.Components.addType(itemType, {
      isComponent: el => el?.tagName?.toLowerCase() === itemType, // only used if we need to parse external html - internal ones already has data-gjs-type-attr
      model: {
          toJSON() {
            const obj = defaultModel.prototype.toJSON.apply(this, arguments);
            delete obj.resizable;
            return obj;
          },
          defaults: {
              tagName: itemType,
              draggable: draggable(`${type},grid-row`),
              droppable: '*',
              attributes: {
                // permanent dom-attributes
                class: '',
                // defaults for traits
                name: 'default-name',
                'data-width': 'auto'
              },
              resizable: {
                tl: 0, // Top left
                tc: 0, // Top center
                tr: 0, // Top right
                cl: 1, // Center left
                cr: 1, // Center right
                bl: 0, // Bottom left
                bc: 0, // Bottom center
                br: 0, // Bottom right
                updateTarget: function(element, rect, context){
                    const clipToRange = u => Math.max(Math.min(u, 12), 1); // we're in grid-12
                    const currentSpan = element.dataset.width;
                    const oldSpanNum = parseInt(currentSpan);
                    let currentSpanNum = oldSpanNum;
                    const orig = element.getBoundingClientRect();
                    const current = orig.width;
                    let diffNextUp;
                    let diffNextDown;
                    let diffCurrent;
                    let nextSizeUp;
                    let nextSizeDown;
                    const target = rect.w;
                    if(!oldSpanNum || Number.isNaN(oldSpanNum)) { // case where we don't have a current size, e.g because we have 'auto' or 'undefined'
                      const parentWidth = element.closest('grid-row,grid-12')?.getBoundingClientRect()?.width || element.parentElement.clientWidth;
                      const one12s = parseInt(parentWidth) / 12;
                      const nextup = clipToRange(Math.ceil(current / one12s));
                      const nextdown = clipToRange(Math.floor(current / one12s));
                      diffNextUp = Math.floor(one12s * nextup);
                      diffNextDown = Math.floor(one12s * nextdown);
                      diffCurrent = Infinity; // never stay where we are, because we're not in a set col-width!
                      nextSizeUp = nextup;
                      nextSizeDown = nextdown;
                      currentSpanNum = 1; // set to something else than NaN / undefined - will not be used, as diffCurrent=Infinity;
                    } else { // well-defined current size
                      const diff = current / currentSpanNum;
                      const nextup = current + diff;
                      const nextdown = current - diff;
                      diffNextUp = Math.floor(Math.abs(target - nextup));
                      diffNextDown = Math.floor(Math.abs(target - nextdown));
                      diffCurrent = Math.floor(Math.abs(target - current));
                      nextSizeUp = currentSpanNum + 1
                      nextSizeDown = currentSpanNum - 1;
                    }
                    
                    const [result, __, n] = [
                      ['up', diffNextUp, nextSizeUp],
                      ['down', diffNextDown, nextSizeDown]
                    ].reduce(([ad, diff, n1], [ad2, q, n2]) => q < diff ? [ad2, q, n2] : [ad, diff, n1], ['stay', diffCurrent, currentSpanNum]);
                    const finalN = clipToRange(n);
                    if(currentSpanNum !== finalN || !oldSpanNum || Number.isNaN(oldSpanNum)) {
                      const component = editor.DomComponents.getWrapper().find('#'+element.id)[0];
                      component.addAttributes({ 'data-width':  `${finalN}` });
                    }
                }
              },
              stylable: [
                'padding',
                'margin',
                'background-color',
                
                // Item
                'order',
                'flex-grow',
                'flex-shrink',
                'flex-basis',
                'align-self',
                'justify-self',

                // width overwrite
                '--w',
              ],
              traits: [
                'name',
                {
                  type: 'select', // Type of the trait
                  label: 'Width', // The label you will see in Settings
                  name: 'data-width', // The name of the attribute/property to use on component
                  options: [
                    { id: 'auto', name: 'auto'},
                    ...Array.from({length: 12}).map((_, idx) => ({ id: `${idx+1}`, name: `Span ${idx+1}`}))
                  ]
                }
              ],
              components: [
                {
                  type: 'text',
                  components: `Col auto`,
                }
              ],
              styles: `
                grid-item[data-width="1"] { --w: 1; }
                grid-item[data-width="2"] { --w: 2; }
                grid-item[data-width="3"] { --w: 3; }
                grid-item[data-width="4"] { --w: 4; }
                grid-item[data-width="5"] { --w: 5; }
                grid-item[data-width="6"] { --w: 6; }
                grid-item[data-width="7"] { --w: 7; }
                grid-item[data-width="8"] { --w: 8; }
                grid-item[data-width="9"] { --w: 9; }
                grid-item[data-width="10"] { --w: 10; }
                grid-item[data-width="11"] { --w: 11; }
                grid-item[data-width="12"] { --w: 12; }
                grid-item[data-width="auto"] {
                  flex-grow: 1;
                }
                grid-item { display: inline; flex-grow: var(--w); max-width: calc( 100% / 12 * var(--w) ); }
              `,
            }
      },
      view: {
          
      }
      // view: -> this defines editor-only stuff
    });
}