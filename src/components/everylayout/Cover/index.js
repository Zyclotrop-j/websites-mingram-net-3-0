import draggable from '../../../helpers/draggable';
import element from "./Cover";

export * as icon from './layout-icon_cover.svg';

export const type =  'cover-l';

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
                  'space',
                  'minHeight',
                  {
                    type: 'checkbox',
                    name: 'noPad',
                    label: 'Remove padding',
                  },
                ],
                components: [{
                  type: 'box-l',
                  components: [{
                    type: 'text',
                    components: `Header`,
                  }],
                }, {
                  type: 'center-l',
                  components: [{
                    type: 'universalheading',
                    tagName: 'h1',
                    components: {
                      type: 'text',
                      components: `Big, centered Cover!!`,
                    },
                  }],
                }, {
                  type: 'box-l',
                  components: [{
                    type: 'text',
                    components: `Footer`,
                  }],
                }],
                styles: ``,
              }
        },
        view: {}
    });
}