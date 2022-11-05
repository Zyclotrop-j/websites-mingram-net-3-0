export default function(editor) {
    const pn = editor.Panels;
    pn.addButton('options', {
        id: 'open-templates',
        className: 'fa fa-folder-o',
        attributes: {
            title: 'Open projects and templates'
        },
        command: 'open-templates', //Open modal 
    });
    pn.addButton('views', {
        id: 'open-pages',
        className: 'fa fa-file-o',
        attributes: {
            title: 'Take Screenshot'
        },
        command: 'open-pages',
        togglable: false
    });
}