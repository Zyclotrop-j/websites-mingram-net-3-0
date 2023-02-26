import { addRxPlugin } from 'rxdb';
//import { getRxStoragePouch /*, addPouchPlugin*/ } from 'rxdb/plugins/pouchdb';
//import PouchDBAdapterIDB from 'pouchdb-adapter-idb';
//import { RxDBAttachmentsPlugin } from 'rxdb/plugins/attachments';
import { v4 as uuidv4 } from 'uuid';

import { RxDBMigrationPlugin } from 'rxdb/plugins/migration';

import setupReplication from './replication';

import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode'; // remove for prod!
import { _load } from './load';
import { _store } from './store';
import mutex from './iomutex';

addRxPlugin(RxDBDevModePlugin);

//addRxPlugin(RxDBAttachmentsPlugin);
//addPouchPlugin(PouchDBAdapterIDB);
addRxPlugin(RxDBMigrationPlugin);

export default async function (editor) {

    const wrapper = editor.Components.getWrapper();

    if(!wrapper?.get('c_id'))
        wrapper?.set('c_id', uuidv4());

    editor.on('component:create', function(model) {
        try {
            if(!model.get('c_id'))
                model.set('c_id', uuidv4());
        } catch(e) {
            console.warn(model);
            console.warn(e);
        }
    });
    editor.on('component:clone', function(model) {
       try {
            model.set('c_id', uuidv4());
       } catch(e) {
        console.warn(e);
       }
    });


    const currentProject = 'project-1';

    editor.Storage.add('pouchdb', {
        async load(options) {
            return _load(mutex, currentProject, options);
        },
    
        async store(data, options = {}) {
            await _store(options.mutex || mutex, data, currentProject);
        }
    });
    
    await setupReplication(editor, currentProject);
    
}
