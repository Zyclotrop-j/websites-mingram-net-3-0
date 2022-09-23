import draggable from '../../../helpers/draggable';
import "./Box";

export * as icon from './layout-icon_box.svg';

export const type =  'box-l';

export default editor => {
    const domc = editor.DomComponents;
    const defaultType = domc.getType('default');

    editor.Components.addType(type, {
        isComponent: el => (el?.tagName?.toLowerCase() === type || el?.tagName?.toLowerCase().startsWith(`${type}-`)), // only used if we need to parse external html - internal ones already has data-gjs-type-attr
        model: {
            defaults: {
                tagName: type,
                draggable: draggable('*'),
                droppable: '*',
                attributes: {},
                stylable: [
                  'width',
                  'padding',
                  'margin',
                  'color',
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

                  // Border
                  'border-radius',
                ],
                traits: [
                  'padding',
                  'borderWidth',
                  {
                    type: 'checkbox',
                    name: 'data-force-fullwidth',
                    label: 'Force full-width?',
                  },
                  {
                    type: 'checkbox',
                    name: 'invert',
                    label: 'Invert colors?',
                  },
                  {
                    type: 'select',
                    options: [
                      { value: 'box-l', name: 'generic' },
                      { value: 'box-l-section', name: 'section' },
                      { value: 'box-l-article', name: 'article' },
                      { value: 'box-l-header', name: 'header' },
                      { value: 'box-l-footer', name: 'footer' },
                      { value: 'box-l-main', name: 'main' },
                      { value: 'box-l-navigation', name: 'navigation' },
                      { value: 'box-l-aside', name: 'aside' },
                    ],
                    label: 'Level',
                    name: 'tagName',
                    changeProp: 1,
                  },
                ],
                components: [{
                  type: 'text',
                  components: `I'm a box`,
                }],
                styles: ``,
              },
        },
        view: {}
    });
}