import draggable from '../../../helpers/draggable';
import lorem from '../../../helpers/lorem';
import element from "./Stack";

export * as icon from './layout-icon_stack.svg';

export const type =  'stack-l';

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
                  {
                    type: 'checkbox',
                    name: 'recursive',
                    label: 'Apply deeply?',
                  },
                  {
                    type: 'number',
                    name: 'splitAfter',
                    label: 'Apply footer at',
                    placeholder: '0-100',
                    min: 1,
                    step: 1,
                  },
                ],
                components: [{
                  type: 'box-l',
                  components: [{
                    type: 'text',
                    components: lorem(10),
                  }],
                }, {
                  type: 'box-l',
                  components: [{
                    type: 'text',
                    components: lorem(10),
                  }],
                }, {
                  type: 'box-l',
                  components: [{
                    type: 'text',
                    components: lorem(10),
                  }],
                }, {
                  type: 'box-l',
                  components: [{
                    type: 'text',
                    components: lorem(10),
                  }],
                }, ],
                styles: ``,
              }
        },
        view: {}
    });
}