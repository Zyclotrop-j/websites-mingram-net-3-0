import sizes from "../../../utils/sizes.js"
import draggable from '../../../helpers/draggable';
import lorem from '../../../helpers/lorem';
import element from "./Sidebar";

export * as icon from './layout-icon_sidebar.svg';

export const type =  'sidebar-l';

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
                  'background-color'
                ],
                traits: [
                  {
                    type: 'checkbox',
                    name: 'side',
                    label: 'Right-side sidebar?',
                    valueTrue: 'right',
                    valueFalse: 'left',
                  },
                  {
                    type: 'select',
                    label: 'Side width', // The label you will see in Settings
                    name: 'sidewidth',
                    options: [ // Array of options
                      ...sizes.map(size => ({ id: `var(--${size})`, name: `${size}`}))
                    ]
                  },
                  {
                    type: 'select',
                    label: 'Content minimum width', // The label you will see in Settings
                    name: 'contentmin',
                    options: [ // Array of options
                      ...Array.from({length: 20}).map((_, idx) => ({ id: `${idx * 5 + 5}%`, name: `${idx * 5 + 5}%`}))
                    ]
                  },
                  {
                    type: 'select',
                    label: 'Space between', // The label you will see in Settings
                    name: 'space',
                    options: [ // Array of options
                      ...sizes.map(size => ({ id: `var(--${size})`, name: `${size}`}))
                    ]
                  },
                  {
                    type: 'checkbox',
                    name: 'noStretch',
                    label: 'Use natural height',
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
                    components: lorem(40),
                  }],
                }],
                styles: ``,
              }
        },
        view: {}
    });
}