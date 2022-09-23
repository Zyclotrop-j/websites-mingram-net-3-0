import draggable from '../../helpers/draggable';

export default editor => {
    const domc = editor.DomComponents;
    const defaultType = domc.getType('default');

    // add bulma .content class to the root to render headings, paragraphs and lists accordingly
    editor.DomComponents.addType("wrapper", {
        extend: "wrapper",
        model: {
            defaults: {
                stylable: [],
                attributes: {
                    ...(editor.DomComponents.getType("wrapper").model.prototype.defaults.attributes ?? {}),
                    class: `content ${editor.DomComponents.getType("wrapper").model.prototype.defaults.attributes?.class ?? ''}`,
                }
            },
        }
    });
    editor.DomComponents.addType("text", {
        extend: "text",
        model: {
            defaults: {
                draggable: draggable('*'),
                tagName: 'span',
                stylable: [
                    'font-family'
                ],
            },
        }
    });

};
