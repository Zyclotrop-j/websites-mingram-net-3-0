import { createRxDatabase, addRxPlugin } from 'rxdb';
import { getRxStoragePouch, addPouchPlugin } from 'rxdb/plugins/pouchdb';
import PuchDBAdapterIDB from 'pouchdb-adapter-idb';
import { RxDBAttachmentsPlugin } from 'rxdb/plugins/attachments';
import once from 'lodash.once';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode'; // remove for prod!
addRxPlugin(RxDBDevModePlugin);

addRxPlugin(RxDBAttachmentsPlugin);
addPouchPlugin(PuchDBAdapterIDB);

const database = await createRxDatabase({
  name: 'projectdb',
  storage: getRxStoragePouch(
    'idb',
    {
        /**
         * other pouchdb specific options
         * @link https://pouchdb.com/api.html#create_database
         */
    }
  )
});
const collection = once((database, mySchema) => database.addCollections({
    documents: {
      schema: mySchema
    },
}));
export default async function (editor) {

    const mySchema = {
        title: 'document schema',
        version: 0,
        primaryKey: 'key',
        type: 'object',
        properties: {
            key: {
                type: 'string',
                maxLength: 100 // <- the primary key must have set maxLength
            },
            data: {
                type: 'object',
            },
        },
        required: ['key', 'data'],
        attachments: {
            encrypted: false // if true, the attachment-data will be encrypted with the db-password
        }
    }

    const currentDocument = 'document-1';

    editor.Storage.add('pouchdb', {
        async load(options = {}) {
            await collection(database, mySchema);
            const doc = await database.documents.findOne({
                selector: {
                    key: currentDocument
                }
            }).exec();
            return doc?.data;
        },
    
        async store(data, options = {}) {
            await collection(database, mySchema);
            const myDocument = await database.documents.upsert({
                key: currentDocument,
                data: data,
            });
        }
    });
    
    
    
    /*
    myDocument.lastName$.subscribe(lastName => {
        console.log('lastName is now ' + lastName);
    });
    const foundDocuments = await database.documents.find({
        selector: {
            age: {
                $gt: 21
            }
        }
    }).exec();
    await myDocument.atomicPatch({
        lastName: 'Carol'
    });
    await myDocument.remove();
    */
    
}