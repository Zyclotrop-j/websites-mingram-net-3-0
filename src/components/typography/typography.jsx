import draggable from '../../helpers/draggable';
import inlineflowelement from '../../helpers/inlineflowelement';
export const pType = 'p';
export const htype = 'universalheading';


export default editor => {
    const domc = editor.DomComponents;
    const defaultType = domc.getType('default');
    const defaultModel = defaultType.model;
    const defaultView = defaultType.view;

    editor.Components.addType(pType, {
        isComponent: el => el?.tagName?.toLowerCase() === pType, // only used if we need to parse external html - internal ones already has data-gjs-type-attr
        model: {
            defaults: {
                tagName: pType,
                draggable: draggable('*'),
                droppable: inlineflowelement,
                attributes: {
                  // permanent dom-attributes
                  class: 'content',
                  // defaults for traits
                  name: 'default-name',
                },
                stylable: [
                    'font-size', 'color', 'font-family', /*'font-style',*/ 'font-weight', 
                    /*'text-transform', 'text-decoration',*/ 'text-shadow', 
                    'text-align', 'line-height', 'letter-spacing',
                    //'word-spacing', 'text-overflow', 
                    //'white-space', 'word-break', 'hyphens', 'line-break', 'writing-mode', 'text-orientation', 'overflow-wrap'
                    'padding', 'margin', 'border'
                ],
                traits: [
                  'name',
                ],
                components: [
                    {
                        type: 'text',
                        content: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...'
                    }
                ],
                styles: ``,
              }
        },
        view: {
            
        }
        // view: -> this defines editor-only stuff
    });

    editor.Components.addType(htype, {
        isComponent: el => ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(el?.tagName?.toLowerCase()) || el?.classList?.contains('h-tag'), // only used if we need to parse external html - internal ones already has data-gjs-type-attr
        model: {
            defaults: {
                tagName: 'h2',
                draggable: draggable('*'),
                droppable: inlineflowelement,
                attributes: {
                  class: 'is-2 h-tag',
                  name: 'default-name',
                },
                stylable: [
                    'font-size', 'color', 'font-family', /*'font-style',*/ 'font-weight', 
                    /*'text-transform', 'text-decoration',*/ 'text-shadow', 
                    'text-align', 'line-height', 'letter-spacing',
                    //'word-spacing', 'text-overflow', 
                    //'white-space', 'word-break', 'hyphens', 'line-break', 'writing-mode', 'text-orientation', 'overflow-wrap'
                    'padding', 'margin', 'border'
                ],
                traits: [
                  'name',
                  {
                    type: 'class_select',
                    options: [
                        {value: '', name: 'normal'},
                        {value: 'title', name: 'title'},
                        {value: 'subtitle', name: 'subtitle'},
                    ],
                    label: 'Title'
                  },
                  {
                    type: 'class_select',
                    options: [
                        {value: 'is-1', name: 'Size 1'},
                        {value: 'is-2', name: 'Size 2'},
                        {value: 'is-3', name: 'Size 3'},
                        {value: 'is-4', name: 'Size 4'},
                        {value: 'is-5', name: 'Size 5'},
                        {value: 'is-6', name: 'Size 6'},
                    ],
                    label: 'Title Size'
                  },
                  {
                    type: 'select',
                    options: [
                        { value: 'h1', name: 'Heading 1' },
                        { value: 'h2', name: 'Heading 2' },
                        { value: 'h3', name: 'Heading 3' },
                        { value: 'h4', name: 'Heading 4' },
                        { value: 'h5', name: 'Heading 5' },
                        { value: 'h6', name: 'Heading 6' },
                        { value: 'span', name: 'Text' },
                    ],
                    label: 'Level',
                    name: 'tagName',
                    changeProp: 1,
                  },
                ],
                components: [
                    {
                        type: 'text',
                        content: 'majestic title'
                    }
                ],
                styles: ``,
              }
        },
        view: {
            
        }
        // view: -> this defines editor-only stuff
    });
}