import draggable from '../../helpers/draggable';
import {
    mediaQuery,
    availableMatchers,
    availableOperators,
    options,
} from './webcomponent';

export const type =  'media-query';
export const type2 =  'js-query';

export default editor => {
    const domc = editor.DomComponents;
    const defaultType = domc.getType('default');
    const textType = domc.getType('text');
    const defaultModel = defaultType.model;
    const defaultView = defaultType.view;

    editor.Components.addType(type, {
        isComponent: el => el?.tagName?.toLowerCase() === type,
        model: {
            defaults: {
                tagName: type,
                draggable: draggable('*'),
                droppable: '*',
                attributes: {
                    query: 'all'
                },
                stylable: [],
                traits: [
                    {
                        type: 'select',
                        options: mediaQuery.map(u => ({ value: u, name: u.replaceAll(/^\(|\)$/g, '') })),
                        label: 'Media Query',
                        name: 'query',
                    },
                ],
                components: [{
                  type: 'text',
                  components: `I'm a box`,
                }],
                styles: ``,
              }
        },
        view: {}
    });
    editor.Components.addType(type2, {
        isComponent: el => el?.tagName?.toLowerCase() === type2,
        model: {
            init() {
                this.listenTo(this, 'change', (e) => {
                    const newValue = this.attributes.attributes.query;
                    if(this.prevQuery === newValue) return;
                    this.prevQuery = newValue;
                    const newOptions = options[`${newValue}Options`] || { type: 'number', min: 0 };
                    if(Array.isArray(newOptions) && newOptions.includes(true) && newOptions.includes(false) && newOptions.length === 2) {
                        this.removeTrait('targetvalue');
                        this.addTrait({
                            name: 'targetvalue',
                            type: 'checkbox',
                        });
                        this.addAttributes({ 'targetvalue': 'true' });
                    } else if(Array.isArray(newOptions)) {
                        this.removeTrait('targetvalue');
                        this.addTrait({
                            name: 'targetvalue',
                            type: 'select',
                            options: newOptions,
                        });
                        this.addAttributes({ 'targetvalue': newOptions[0] });
                    } else {
                        const { type: ttype, ...rest } = newOptions;
                        this.removeTrait('targetvalue');
                        this.addTrait({
                            name: 'targetvalue',
                            type: ttype,
                            ...rest,
                        });
                        this.addAttributes({ 'targetvalue': 1 });
                    }
                });
            },
            defaults: {
                tagName: type2,
                draggable: draggable('*'),
                droppable: '*',
                attributes: {
                    query: 'all'
                },
                stylable: [],
                traits: [
                    {
                        type: 'select',
                        options: availableOperators.map(u => ({ value: u, name: u })),
                        label: 'Type',
                        name: 'query',
                    },
                    {
                        type: 'checkbox',
                        label: 'Negate',
                        name: 'invert',
                    },
                    {
                        type: 'select',
                        options: availableMatchers.map(u => ({ value: u, name: u })),
                        label: 'Compare mode',
                        name: 'operator',
                    },
                    {
                        type: 'text',
                        label: 'Target value',
                        name: 'targetvalue',
                    },
                ],
                components: [{
                  type: 'text',
                  components: `I'm a box`,
                }],
                styles: `
                    ${type2}[data-active=false] {
                        display: none !important;
                    }
                `,
              }
        },
        view: {}
    });
}
