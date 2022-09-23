import draggable from '../../helpers/draggable';
import lorem from '../../helpers/lorem';
import inlineflowelement from '../../helpers/inlineflowelement';
import {
  type as typeelement,
  listitem as listitemelement,
  title as titleelement,
  content as contentelement,
  description as descriptionelement,
  image as imageelement,
} from './webcomponent';

export const type =  'prettylist';
export const listitem = `${type}-item`;
export const title = `${listitem}-title`;
export const content = `${listitem}-content`;
export const description = `${listitem}-description`;
export const image = `${listitem}-image`;


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
                droppable: `${listitemelement}.list-item`,
                attributes: {
                  class: 'list',
                },
                stylable: [],
                traits: [],
                components: [{
                  type: listitem
                }, {
                  type: listitem
                }, {
                  type: listitem
                }],
                styles: ``,
              }
        },
        view: {}
    });
    editor.Components.addType(listitem, {
      isComponent: el => el?.tagName?.toLowerCase() === listitemelement,
      model: {
          defaults: {
              tagName: listitemelement,
              draggable: `${typeelement}.list`,
              droppable: `${titleelement}.list-item-title`,
              attributes: {
                class: 'list-item',
              },
              stylable: [],
              traits: [],
              components: [{
                type: image,
              }, {
                type: content
              }],
              styles: ``,
              // support link here?
            }
      },
      view: {}
    });
    editor.Components.addType(title, {
      isComponent: el => el?.tagName?.toLowerCase() === titleelement,
      model: {
          defaults: {
              tagName: titleelement,
              draggable: `${listitemelement}.list-item,${contentelement}.list-item-content`,
              droppable: inlineflowelement,
              attributes: {
                class: 'list-item-title',
              },
              stylable: [],
              traits: [],
              components: [{
                type: 'text',
                components: lorem(5),
              }],
              styles: ``,
            }
      },
      view: {}
    });
    editor.Components.addType(content, {
      isComponent: el => el?.tagName?.toLowerCase() === contentelement,
      model: {
          defaults: {
              tagName: contentelement,
              draggable: `${listitemelement}.list-item`,
              droppable: `${titleelement}.list-item-title,${descriptionelement}.list-item-description`,
              attributes: {
                class: 'list-item-content',
              },
              stylable: [],
              traits: [],
              components: [{
                type: title
              }, {
                type: description
              }],
              styles: ``,
            }
      },
      view: {}
    });
    editor.Components.addType(description, {
      isComponent: el => el?.tagName?.toLowerCase() === descriptionelement,
      model: {
          defaults: {
              tagName: descriptionelement,
              draggable: `${contentelement}.list-item-content`,
              droppable: `*`,
              attributes: {
                class: 'list-item-description',
              },
              stylable: [],
              traits: [],
              components: [{
                type: 'text',
                components: lorem(20),
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
              draggable: `${listitemelement}.list-item`,
              droppable: `img.image,icon-l`,
              attributes: {
                class: 'list-item-image',
              },
              stylable: [],
              traits: [],
              components: [{
                type: 'icon-l',
              }],
              styles: ``,
            }
      },
      view: {}
    });
}