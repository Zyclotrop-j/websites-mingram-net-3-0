import draggable from '../../../helpers/draggable';
import element from "./Center";

export * as icon from './layout-icon_center.svg';

export const type =  'center-l';

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
                  'max',
                  {
                    type: 'checkbox',
                    name: 'andText',
                    label: 'Center text, too?',
                  },
                  'gutters',
                  {
                    type: 'checkbox',
                    name: 'intrinsic',
                    label: 'Use intrinsic width?',
                  },
                ],
                components: [{
                  type: 'text',
                  components: `I'm horizontally centered`,
                }],
                styles: ``,
              }
        },
        view: {}
    });
}