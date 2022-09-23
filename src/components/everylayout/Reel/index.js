import draggable from '../../../helpers/draggable';
import lorem from '../../../helpers/lorem';
import element from "./Reel";

export * as icon from './layout-icon_reel.svg';

export const type =  'reel-l';

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
                  'itemWidth',
                  'space',
                  'height',
                  {
                    type: 'checkbox',
                    name: 'noBar',
                    label: 'Hide scrollbar?',
                  },
                ],
                components: [{
                  type: 'box-l',
                  components: [{
                    type: 'text',
                    components: lorem(20),
                  }],
                }, {
                  type: 'box-l',
                  components: [{
                    type: 'text',
                    components: lorem(30),
                  }],
                }, {
                  type: 'box-l',
                  components: [{
                    type: 'text',
                    components: lorem(20),
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