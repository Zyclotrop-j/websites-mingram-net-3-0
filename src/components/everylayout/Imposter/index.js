import draggable from '../../../helpers/draggable';
import lorem from '../../../helpers/lorem';
import element from "./Imposter";

export * as icon from './layout-icon_imposter.svg';

export const type =  'imposter-l';

export default editor => {
    const domc = editor.DomComponents;
    const defaultType = domc.getType('default');
    const textType = domc.getType('text');
    const defaultModel = defaultType.model;
    const defaultView = defaultType.view;

    editor.Components.addType(type, {
        isComponent: el => el?.tagName?.toLowerCase() === type, // only used if we need to parse external html - internal ones already has data-gjs-type-attr
        model: {
            defaults: {
                tagName: type,
                draggable: draggable('*'),
                droppable: '*',
                attributes: {},
                stylable: [],
                traits: [
                  {
                    type: 'checkbox',
                    name: 'breakout',
                    label: 'Allow overflow?',
                  },
                  'margin',
                  {
                    type: 'checkbox',
                    name: 'fixed',
                    label: 'Pin to viewport?',
                  },
                ],
                components: [{
                  type: 'box-l',
                  components: [{
                    type: 'text',
                    components: lorem(10),
                  }],
                }],
                styles: ``,
              }
        },
        view: {}
    });
}