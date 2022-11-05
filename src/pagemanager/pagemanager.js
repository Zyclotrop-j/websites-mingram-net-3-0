import PageManagerApp from "./pagemanager.svelte";

export default function(editor, {toast, prompt} = {}) {
    const pm = editor.Pages;
    const dm = editor.Devices;
    const el = document.createElement('div');

    //const currentPage = pm.get(id);
    //currentPage?.set('name', name);

    // page.get('private') ? '' : (page.id || page.get('name'))

    // editor.Panels.getPanel('views-container')?.set('appendContent', "some html string").trigger('change:appendContent');
    
    const app = new PageManagerApp({ target: el, props: {
        toast,
        prompt,
        body: () => editor.Canvas.getBody(),
        select: (id) => {
            pm.select(id);
            dm.select(dm.getDevices()[0]);
        },
        selectAndClose: (id) => {
            pm.select(id);
            dm.select(dm.getDevices()[0]);
            editor.Modal.close();
        },
        add: (opts) => {
            pm.add({
                ...opts
            });
        },
        remove: (id) => {
            pm.remove(id);
        },
        pages: pm.getAll(),
        selected: pm.getSelected().id,
    } });
    editor.on('page', () => {
        app.$set({
            pages: pm.getAll(),
            selected: pm.getSelected().id,
        });
    });

    editor.on('page:update', () => {
        editor.store();
    });
    editor.on('page:add', () => {
        editor.store();
    });
    editor.on('page:remove', () => {
        editor.store();
    });

    const pn = editor.Panels;
    pn.addButton('options', { //  or commands
        id: 'open-pages',
        className: 'fa fa-folder-o',
        attributes: {
            title: 'Open pages'
        },
        command: () => {
            editor.Modal.open({
                title: 'Page Manager',
                content: el,
                attributes: { class:'filemanager-modal-wrt' }
            });
        }
    });

    // editor.PagesApp.editPage(id, name);

    // editor.TemplateManager.handleEdit({ id, thumbnail, name, description, template });

}