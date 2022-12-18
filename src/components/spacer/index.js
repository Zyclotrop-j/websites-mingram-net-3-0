import draggable from '../../helpers/draggable';
export const typevertical = 'vertical-spacer';
export const typehorizontal = 'horizontal-spacer';

export default editor => {
    
editor.Components.addType(typevertical, {
    isComponent: el => el?.dataset?.spacer === 'vertical', // only used if we need to parse external html - internal ones already has data-gjs-type-attr
    model: {
        defaults: {
            tagName: 'hr',
            draggable: draggable(`*`),
            droppable: "[data-spacer=horizontal]",
            attributes: {
              'data-spacer': 'vertical',
            },
            resizable: {
              tl: 0, // Top left
              tc: 0, // Top center
              tr: 0, // Top right
              cl: 0, // Center left
              cr: 0, // Center right
              bl: 0, // Bottom left
              bc: 1, // Bottom center
              br: 0, // Bottom right
            },
            stylable: [
              'vertical-space',
              'color',
            ],
            traits: [
              'name',
              {
                type: 'select',
                options: [
                    { value: 'hr', name: 'Space <b>between</b> content' },
                    { value: 'div', name: 'Space <b>within</b> content' },
                ],
                label: 'Kind',
                name: 'tagName',
                changeProp: 1,
              }
            ],
            components: [],
            styles: `
                [data-spacer=vertical] {
                    --w2: 8%;
                    --c2: currentColor;
                    display: inline-block;
                    margin: 0;
                }
            `,
          }
    },
    view: {
        
    }
    // view: -> this defines editor-only stuff
  });
  editor.Components.addType(typehorizontal, {
    isComponent: el => el?.dataset?.spacer === 'horizontal', // only used if we need to parse external html - internal ones already has data-gjs-type-attr
    model: {
        defaults: {
            tagName: 'span',
            draggable: draggable(`*`),
            droppable: false,
            attributes: {
                'data-spacer': 'horizontal',
            },
            resizable: {
              tl: 0, // Top left
              tc: 0, // Top center
              tr: 0, // Top right
              cl: 0, // Center left
              cr: 1, // Center right
              bl: 0, // Bottom left
              bc: 0, // Bottom center
              br: 0, // Bottom right
            },
            stylable: [
              'horizontal-space',
              'color',
            ],
            traits: [
              'name',
              {
                type: 'select',
                options: [
                    { value: 'hr', name: 'Space <b>between</b> content' },
                    { value: 'span', name: 'Space <b>within</b> content' },
                ],
                label: 'Kind',
                name: 'tagName',
                changeProp: 1,
              }
            ],
            components: [],
            styles: `
                [data-spacer=horizontal] {
                    --w: 8%;
                    --c: currentColor;
                    display: inline-block;
                    height: 1em;
                    min-height: 5px;
                    margin: 0;
                }
            `,
          }
    },
    view: {
        
    }
    // view: -> this defines editor-only stuff
  });
}


