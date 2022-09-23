import sizes from "../../../utils/sizes.js"
import draggable from '../../../helpers/draggable';
import lorem from '../../../helpers/lorem';
import element from "./Icon";
import sharedIconCache, { sharedFetch } from '../../../helpers/sharedItemCache';

export * as icon from './layout-icon_icon.svg';

export const type =  'icon-l';

const memoFetch = ((cache) => {
  return (fname) => {
    if(cache[fname]) {
      return cache[fname];
    }
    const icondata = sharedFetch(`//localhost:3001/${fname}`);
    cache[fname] = icondata;
    return icondata;
  };
})(sharedIconCache);

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
                droppable: false,
                attributes: {},
                stylable: [
                  'font-size',
                  'color',
                  'margin',

                  'order',
                  'flex-grow',
                  'flex-shrink',
                  'flex-basis',
                  'align-self',
                  'justify-self',

                  'vertical-align',
                ],
                traits: [
                  {
                    type: 'select',
                    label: 'Space', // The label you will see in Settings
                    name: 'space',
                    options: [ // Array of options
                      ...sizes.map(size => ({ id: `var(--${size})`, name: `${size}`}))
                    ]
                  },
                  'label',
                  {
                    type: 'icon_select',
                    options: {
                      name: `${type}-search`
                    },
                    label: 'Select an icon'
                  },
                ],
                styles: ``,
              },
              async updated() {
                const fname = this.getAttributes().icon;
                if(fname && this?.changed?.attributes?.icon && this?.changed?.attributes?.icon !== this.lastIcon) {
                  this.lastIcon = this?.changed?.attributes?.icon;
                  const domelement = this.view.el;
                  const icondata = await memoFetch(fname);
                  const model = this;
                  model.components(icondata);
                  model.get('components').each(model => {
                    model.set({
                      locked: true, editable: false, hoverable: false, selectable: false, highlightable: false, draggable: false, droppable: false,
                      propagate: ['editable', 'locked', 'hoverable', 'selectable', 'highlightable', 'draggable', 'droppable'] });
                  });
                }
              },
        },
        view: {
          async onRender({model}) {
            const fname = model.getAttributes().icon;
            if(fname) {
              const domelement = this.el;
              const icondata = await memoFetch(fname);
              model.components(icondata);
              model.get('components').each(model => {
                model.set({
                  locked: true, editable: false, hoverable: false, selectable: false, highlightable: false, draggable: false, droppable: false,
                  propagate: ['editable', 'locked', 'hoverable', 'selectable', 'highlightable', 'draggable', 'droppable'] });
              });
            }
          }
        }
    });
}