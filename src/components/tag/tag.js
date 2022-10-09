import draggable from '../../helpers/draggable';
import inlineflowelement from '../../helpers/inlineflowelement';

export const type =  'tag';
export const grouptype = 'taggroup';

export default editor => {
    const domc = editor.DomComponents;
    const defaultType = domc.getType('default');
    const textType = domc.getType('text');
    const defaultModel = defaultType.model;
    const defaultView = defaultType.view;

    editor.Components.addType(type, {
        isComponent: el => el?.tagName?.toLowerCase() === 'span' && el?.classList?.contains('tag'), // only used if we need to parse external html - internal ones already has data-gjs-type-attr
        model: {
            defaults: {
                tagName: 'span',
                draggable: draggable('*'),
                droppable: 'text',
                attributes: {
                  class: 'tag is-default-size not-light not-round',
                  name: 'default-name',
                },
                stylable: [
                  'background-color',
                  'font-size', 'color', 'font-family', /*'font-style',*/ 'font-weight', 
                  'text-transform', /*'text-decoration',*/ 'text-shadow', 
                  'text-align', 'line-height', 'letter-spacing',
                  //'word-spacing', 'text-overflow', 
                  //'white-space', 'word-break', 'hyphens', 'line-break', 'writing-mode', 'text-orientation', 'overflow-wrap'
                  'border',

                  'margin',
                  'padding',

                  // Item
                  'order',
                  'flex-grow',
                  'flex-shrink',
                  'flex-basis',
                  'align-self',
                  'justify-self',
                ],
                traits: [
                  'name', 
                  {
                    type: 'class_select',
                    options: [
                        {value: 'is-default', name: 'none'},
                        {value: 'is-black', name: 'black'},
                        {value: 'is-dark', name: 'dark'},
                        {value: 'is-white', name: 'white'},
                        {value: 'is-primary', name: 'primary'},
                        {value: 'is-link', name: 'link'},
                        {value: 'is-info', name: 'info'},
                        {value: 'is-success', name: 'success'},
                        {value: 'is-warning', name: 'warning'},
                        {value: 'is-danger', name: 'danger'},

                    ],
                    label: 'Variant'
                  },
                  {
                    type: 'class_select',
                    options: [
                        {value: 'not-light', name: 'none'},
                        {value: 'is-light', name: 'light'},
                    ],
                    label: 'Type'
                  },
                  {
                    type: 'class_select',
                    options: [
                        {value: 'is-default-size', name: 'default'},
                        {value: 'is-normal', name: 'normal'},
                        {value: 'is-medium', name: 'medium'},
                        {value: 'is-large', name: 'large'},
                    ],
                    label: 'Size'
                  },
                  {
                    type: 'class_select',
                    options: [
                        {value: 'not-round', name: 'none'},
                        {value: 'is-rounded', name: 'round'},
                    ],
                    label: 'Round'
                  },
                ],
                components: [
                  {
                    type: 'text',
                    content: `Tag`,
                  },
                ],
                styles: ``,
              },
        },
        view: {}
    });

    editor.Components.addType(grouptype, {
      isComponent: el => el?.classList?.contains('tags'), // only used if we need to parse external html - internal ones already has data-gjs-type-attr
      model: {
          defaults: {
              tagName: 'div',
              draggable: draggable('*'),
              droppable: `span.tag`,
              attributes: {
                class: 'tags',
              },
              stylable: [],
              traits: [
                {
                  type: 'class_select',
                  options: [
                      {value: '', name: 'with gaps'},
                      {value: 'has-addons', name: 'normal'},
                  ],
                  label: 'Gaps'
                },
                {
                  type: 'class_select',
                  options: [
                      {value: 'are-normal', name: 'normal'},
                      {value: 'are-medium', name: 'medium'},
                      {value: 'are-large', name: 'large'},
                  ],
                  label: 'Size'
                },
              ],
              components: [
                {
                  type: type,
                  components: [{
                    type: 'text',
                    components: `Tag 1`,
                  }],
                },
                {
                  type: type,
                  components: [{
                    type: 'text',
                    components: `Tag 2`,
                  }],
                },
                {
                  type: type,
                  components:[ {
                    type: 'text',
                    components: `Tag 3`,
                  }],
                },
              ],
              styles: ``,
            }
      },
      view: {
          
      }
      // view: -> this defines editor-only stuff
  });
}