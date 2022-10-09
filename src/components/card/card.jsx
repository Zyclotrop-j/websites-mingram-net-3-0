import draggable from '../../helpers/draggable';
import lorem from '../../helpers/lorem';
import inlineflowelement from '../../helpers/inlineflowelement';
import sharedIconCache, { sharedFetch } from '../../helpers/sharedItemCache';
import {
  type as typeelement,
  header as headerelement,
  content as contentelement,
  image as imageelement,
  footer as footerelement,
  title as titleelement,
  icon as iconelement,
  footeritem as footeritemelement,
} from './webcomponent';

export const type =  'card';
export const header = `${type}-header`;
export const content = `${type}-content`;
export const image = `${type}-image`;
export const footer = `${type}-footer`;
export const title = `${header}-title`;
export const icon = `${header}-icon`;
export const footeritem = `${footer}-item`;

const memoFetch = ((cache) => {
  return (fname) => {
    if(cache[fname]) {
      return cache[fname];
    }
    const icondata = sharedFetch(`//localhost:3001/${fname}`);
    cache[fname] = icondata;
    return icondata;
  };
})(sharedIconCache);

export default editor => {
    const domc = editor.DomComponents;
    const defaultType = domc.getType('default');
    const textType = domc.getType('text');
    const defaultModel = defaultType.model;
    const defaultView = defaultType.view;

    editor.Components.addType(type, {
        isComponent: el => el?.tagName?.toLowerCase() === typeelement,
        model: {
            defaults: {
                tagName: typeelement,
                draggable: draggable('*'),
                droppable: `${headerelement}.card-header,${footerelement}.card-footer,${contentelement}.card-content,${imageelement}.card-image`,
                attributes: {
                  class: 'card',
                },
                stylable: [
                  'background-color',

                  // Container
                  'gap',
                  'flex-direction-row',
                  'justify-content',
                  'align-content',
                  'align-items',

                  // border
                  'border-color',
                  'border-radius',
                  'border-width',
                  'border-style',

                  // space
                  'padding',
                  'margin',
                ],
                traits: [],
                components: [{
                  type: header,
                }, {
                  type: image,
                }, {
                  type: content,
                }, {
                  type: footer,
                }, ],
                styles: `
                  [data-mode=block] {
                    display: block;
                  }
                  [data-mode=flex] {
                    display: flex;
                  }
                `,
              }
        },
        view: {}
    });
    editor.Components.addType(header, {
        isComponent: el => el?.tagName?.toLowerCase() === headerelement,
        model: {
            defaults: {
                tagName: headerelement,
                draggable: `${typeelement}.card`,
                droppable: `${titleelement}.card-header-title,${iconelement}.card-header-icon`,
                attributes: {
                  class: 'card-header',
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
                ],
                traits: [],
                components: [{
                  type: title,
                }, {
                  type: icon,
                }],
                styles: ``,
              }
        },
        view: {}
    });
    editor.Components.addType(content, {
      isComponent: el => el?.tagName?.toLowerCase() === contentelement,// only used if we need to parse external html - internal ones already has data-gjs-type-attr
      model: {
          defaults: {
              tagName: contentelement,
              draggable: `${typeelement}.card`,
              droppable: inlineflowelement,
              attributes: {
                class: 'card-content',
              },
              stylable: [
                'padding',
                'margin',
                'background-color',

                'font-size', 'color', 'font-family', /*'font-style',*/ 'font-weight', 
                'text-transform', /*'text-decoration',*/ 'text-shadow', 
                'text-align', 'line-height', 'letter-spacing',
                //'word-spacing', 'text-overflow', 
                //'white-space', 'word-break', 'hyphens', 'line-break', 'writing-mode', 'text-orientation', 'overflow-wrap'
                'border',

                // Item
                'order',
                'flex-grow',
                'flex-shrink',
                'flex-basis',
                'align-self',
                'justify-self',
              ],
              traits: [],
              components: [{
                type: 'text',
                components: lorem(60),
              }],
              styles: ``,
            }
      },
      view: {}
  });
  editor.Components.addType(image, {
    isComponent: el => el?.tagName?.toLowerCase() === imageelement,
    model: {
        defaults: {
            tagName: imageelement,
            draggable: `${typeelement}.card`,
            droppable: `img,icon-l`, // todo
            attributes: {
              class: 'card-image',
            },
            stylable: [
              // Item
              'order',
              'flex-grow',
              'flex-shrink',
              'flex-basis',
              'align-self',
              'justify-self',
            ],
            traits: [],
            components: [{
              type: 'icon-l',
            }],
            styles: ``,
          }
    },
    view: {}
  });
  editor.Components.addType(footer, {
    isComponent: el => el?.tagName?.toLowerCase() === footerelement,// only used if we need to parse external html - internal ones already has data-gjs-type-attr
    model: {
        defaults: {
            tagName: footerelement,
            draggable: `${typeelement}.card`,
            droppable: `${footeritemelement}.card-footer-item`,
            attributes: {
              class: 'card-footer',
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

              // Container
              'gap',
              'flex-direction-column',
              'flex-wrap',
              'justify-content',
              'align-content',
              'align-items',
            ],
            traits: [],
            components: [{
              type: footeritem,
            }, {
              type: footeritem,
            }, {
              type: footeritem,
            }],
            styles: ``,
          }
    },
    view: {}
  });
  editor.Components.addType(title, {
    isComponent: el => el?.tagName?.toLowerCase() === titleelement,
    model: {
        defaults: {
            tagName: titleelement,
            draggable: `${headerelement}.card-header`,
            droppable: `p,h1,h2,h3,h4,h5,h6,[data-gjs-type="text"],icon-l,b,strong,span,i,abbr,cite,code,dfn,em,kbd,mark,q,ruby,s,samp,small,sub,sup,time,data,u,var,wbr,del,ins,math,br,bdo,svg,img:not([usemap]),video:not([controls]),audio:not([controls]),canvas,output,progress`,
            attributes: {
              class: 'card-header-title',
            },
            stylable: [
              'padding',
            ],
            traits: [
              {
                type: 'class_select',
                options: [
                    {value: '', name: 'left'},
                    {value: 'is-centered', name: 'centered'},
                ],
                label: 'Is centered?'
              },
            ],
            components: [{
              type: 'universalheading',
            }],
            styles: ``,
          }
    },
    view: {}
  });
  editor.Components.addType(icon, {
    isComponent: el => el?.tagName?.toLowerCase() === iconelement,
    model: {
        defaults: {
            tagName: iconelement,
            draggable: `${headerelement}.card-header`,
            droppable: false,
            attributes: {
              class: 'card-header-icon',
            },
            stylable: [],
            traits: ['label',
              {
                type: 'icon_select',
                options: {
                  name: `${type}-search`
                },
                label: 'Select an icon'
              },
            ],
            components: [],
            styles: ``,
          },
          async updated() {
            const fname = this.getAttributes().icon;
            if(fname && this?.changed?.attributes?.icon && this?.changed?.attributes?.icon !== this.lastIcon) {
              this.lastIcon = this?.changed?.attributes?.icon;
              const domelement = this.view.el;
              const icondata = await memoFetch(fname);
              const model = this;
              model.components(`<span class="icon">${icondata}</span>`);
              model.get('components').each(model => {
                model.set({
                  locked: true, editable: false, hoverable: false, selectable: false, highlightable: false, draggable: false, droppable: false,
                  propagate: ['editable', 'locked', 'hoverable', 'selectable', 'highlightable', 'draggable', 'droppable'] });
              });
            }
          },
    },
    view: {
      async onRender({model}) {
        const fname = model.getAttributes().icon || "icons/tabler-star.svg";
        const domelement = this.el;
        const icondata = await memoFetch(fname);
        model.components(`<span class="icon">${icondata}</span>`);
        model.get('components').each(model => {
          model.set({
            locked: true, editable: false, hoverable: false, selectable: false, highlightable: false, draggable: false, droppable: false,
            propagate: ['editable', 'locked', 'hoverable', 'selectable', 'highlightable', 'draggable', 'droppable'] });
        });
      }
    }
  });
  editor.Components.addType(footeritem, {
    isComponent: el => el?.tagName?.toLowerCase() === footeritemelement,
    model: {
        defaults: {
            tagName: footeritemelement,
            draggable: `${footerelement}.card-footer`,
            droppable: `*`, // todo
            attributes: {
              class: 'card-footer-item',
            },
            stylable: [
              'width',
                  'padding',
                  'margin',
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
            ],
            traits: [],
            components: [{
              type: 'text',
              components: `I am text!`,
            }],
            styles: ``,
          }
    },
    view: {}
  });
}