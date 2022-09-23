import sizes from "../../../utils/sizes.js"
import draggable from '../../../helpers/draggable';
import lorem from '../../../helpers/lorem';
import element from "./Grid";

export * as icon from './layout-icon_grid.svg';

export const type =  'grid-l';

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

                ],
                traits: [
                  {
                    type: 'select',
                    label: 'Min', // The label you will see in Settings
                    name: 'min',
                    options: [ // Array of options
                      ...sizes.map(size => ({ id: `var(--${size})`, name: `${size}`}))
                    ]
                  },
                  {
                    type: 'select',
                    label: 'Space', // The label you will see in Settings
                    name: 'space',
                    options: [ // Array of options
                      ...sizes.map(size => ({ id: `var(--${size})`, name: `${size}`}))
                    ]
                  }
                ],
                components: [
                  {
                    type: 'box-l',
                    components: [{
                      type: 'text',
                      components: lorem(20),
                    }],
                  },
                  {
                    type: 'box-l',
                    components: [{
                      type: 'text',
                      components: lorem(30),
                    }],
                  },
                  {
                    type: 'box-l',
                    components: [{
                      type: 'text',
                      components: lorem(20),
                    }],
                  },
                  {
                    type: 'box-l',
                    components: [{
                      type: 'text',
                      components: lorem(60),
                    }],
                  },
                  {
                    type: 'box-l',
                    components: [{
                      type: 'text',
                      components: lorem(30),
                    }],
                  },
                  {
                    type: 'box-l',
                    components: [{
                      type: 'text',
                      components: lorem(40),
                    }],
                  },
                  {
                    type: 'box-l',
                    components: [{
                      type: 'text',
                      components: lorem(10),
                    }],
                  },
                  {
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