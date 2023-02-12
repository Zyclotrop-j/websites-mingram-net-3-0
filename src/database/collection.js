import { createRxDatabase } from 'rxdb';
import once from 'lodash.once';
import { getRxStorageWorker } from 'rxdb/plugins/worker';
import { RxStorageLokiStatics } from 'rxdb/plugins/lokijs';

import { getSchemas } from './getSchemas';

export const database = await createRxDatabase({
    name: 'projectdb',
    multiInstance: true,
    /*storage: getRxStoragePouch(
      'idb',
      {
          //
           // other pouchdb specific options
           // @link https://pouchdb.com/api.html#create_database
          //
      }
    )*/
    storage: getRxStorageWorker(
        {
            statics: RxStorageLokiStatics,
            workerInput: '/rx-worker.js'
        }
    )
});
export const collection = once((database, schemas) => database.addCollections(schemas));

export function createCollections() {
    const { assetSchema, styleSchema, pageSchema, componentSchema } = getSchemas();
    return collection(database, {
        assets: {
            schema: assetSchema,
            migrationStrategies: {
                1: function (oldDoc) {
                    return oldDoc;
                }
            }
        },
        styles: {
            schema: styleSchema,
            migrationStrategies: {
                1: function (oldDoc) {
                    return oldDoc;
                }
            }
        },
        pages: {
            schema: pageSchema,
            migrationStrategies: {
                1: function (oldDoc) {
                    return oldDoc;
                }
            }
        },
        components: {
            schema: componentSchema,
            migrationStrategies: {
                1: function (oldDoc) {
                    return oldDoc;
                }
            }
        },
    });
}