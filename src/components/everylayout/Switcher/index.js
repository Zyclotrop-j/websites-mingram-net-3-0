import draggable from '../../../helpers/draggable';
import lorem from '../../../helpers/lorem';
import element from "./Switcher";

export * as icon from './layout-icon_switcher.svg';

export const type =  'switcher-l';

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
                  limit: 4,
                },
                stylable: [],
                traits: [
                  'threshold',
                  'space',
                  {
                    type: 'number',
                    name: 'limit',
                    label: 'Force vertical layout at',
                    placeholder: 'Nr. of children',
                    min: 1,
                    step: 1,
                  },
                ],
                components: [{
                  type: 'box-l',
                  components: [{
                    type: 'text',
                    components: lorem(30),
                  }],
                }, {
                  type: 'box-l',
                  components: [{
                    type: 'text',
                    components: lorem(30),
                  }],
                }],
                styles: ``,
              }
        },
        view: {}
    });
}