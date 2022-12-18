import draggable from '../../helpers/draggable';
import inlineflowelement from '../../helpers/inlineflowelement';

export const inlinelinktype =  'link';
export const blocklinktype =  'link-block';

export default editor => {
    const domc = editor.DomComponents;
    const defaultType = domc.getType('default');
    const textType = domc.getType('text');
    const defaultModel = defaultType.model;
    const defaultView = defaultType.view;

    const linkdomcomponent = editor.DomComponents.getType("link");
    //linkdomcomponent.model.prototype.defaults.attributes ?? {},
    editor.Components.addType(inlinelinktype, {
        extend: "link",
        model: {
            defaults: {
                ...(linkdomcomponent.model.prototype.defaults ?? {}),
                tagName: 'a',
                draggable: draggable('*'),
                droppable: inlineflowelement,
                attributes: {
                  ...(linkdomcomponent.model.prototype.defaults.attributes ?? {}),
                  class: '',
                  'data-type': 'inline',
                  href: '#',
                  title: '',
                  target: 'self',
                  rel: '',
                },
                stylable: [],
                traits: [
                    ...(linkdomcomponent.model.prototype.defaults.traits ?? []),
                    {
                        type: 'select',
                        options: [
                            { value: '', name: 'None' },
                            { value: 'author', name: 'Author' },
                            { value: 'bookmark', name: 'Permalink' },
                            { value: 'alternate', name: 'Alternative representation' },
                            { value: 'external', name: 'External endorsed' },
                            { value: 'nofollow', name: 'External non-endorsed' },
                            { value: 'help', name: 'Help' },
                            { value: 'license', name: 'Licence' },
                            { value: 'me', name: 'Me' },
                            { value: 'next', name: 'Next' },
                            { value: 'prev', name: 'Prev' },
                        ],
                        label: 'Type',
                        name: 'rel',
                    },
                ],
                components: [
                    `Link me!`
                ],
                styles: ``,
              }
        },
        view: {
            ...(linkdomcomponent.view ?? {}),
        }
    });
    editor.Components.addType(blocklinktype, {
        extend: "link",
        isComponent: el => el?.tagName?.toLowerCase() === 'a' && el?.dataset?.type === 'block',
        model: {
            defaults: {
                tagName: 'a',
                draggable: draggable('*'),
                droppable: `*`,
                attributes: {
                  class: '',
                  'data-type': 'block',
                  href: '#',
                  title: '',
                  target: 'self',
                  rel: '',
                },
                stylable: [],
                traits: [
                    ...(linkdomcomponent.model.prototype.defaults.traits ?? []).filter(q => q !== 'rel' && q?.name !== 'rel'),
                    {
                        type: 'select',
                        options: [
                            { value: '', name: 'None' },
                            { value: 'external', name: 'External endorsed' },
                            { value: 'nofollow', name: 'External non-endorsed' },
                        ],
                        label: 'Type',
                        name: 'rel',
                    },
                    {
                        type: 'select',
                        options: [
                            { value: '', name: 'None' },
                            { value: 'inline', name: 'Inline' },
                        ],
                        label: 'Force layout',
                        name: 'data-force',
                    },
                ],
                components: [
                  {
                    type: 'card',
                  },
                ],
                styles: ``,
              }
        },
        view: {}
    });

}