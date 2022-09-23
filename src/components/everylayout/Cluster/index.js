import sizes from "../../../utils/sizes.js"
import draggable from '../../../helpers/draggable';
import lorem from '../../../helpers/lorem';
import element from "./Cluster";

export * as icon from './layout-icon_cluster.svg';

export const type =  'cluster-l';

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
                  'justify',
                  'align',
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
                      components: lorem(60),
                    }],
                  },
                  {
                    type: 'box-l',
                    components: [{
                      type: 'text',
                      components: lorem(15),
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
                      components: lorem(30),
                    }],
                  }
                ],
                styles: ``,
              }
        },
        view: {}
    });
}