import draggable from '../../../helpers/draggable';
import element from "./Frame";

export * as icon from './layout-icon_frame.svg';

export const type =  'frame-l';

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
                attributes: {
                  class: 'onechild'
                },
                stylable: [],
                traits: [
                  'ratio'
                ],
                components: [ {
                  type: 'text',
                  components: `I have a set aspect ratio`,
                }],
                styles: ``,
              }
        },
        view: {}
    });
}