import {
    addRxPlugin
} from 'rxdb';
import {
    RxDBReplicationP2PPlugin,
    getConnectionHandlerSimplePeer
} from 'rxdb/plugins/replication-p2p';
import debounce from 'lodash.debounce';
import isEqual from 'lodash.isequal';

import { createCollections, database } from './collection';

addRxPlugin(RxDBReplicationP2PPlugin);

const rerender = debounce(editor => {
    editor.load();
}, 1000);

export default async (editor, topic) => {
    await createCollections();
    const [assets, styles, pages, components] = await Promise.all([
        'assets',
        'styles',
        'pages',
        'components',
    ].map(async collectionName => {
        const replicationPool = await database[collectionName].syncP2P({
            // The topic is like a 'room-name'. All clients with the same topic
            // will replicate with each other. In most cases you want to use
            // a different topic string per user.
            topic: `${topic}-${collectionName}`,
            /**
             * You need a collection handler to be able to create WebRTC connections.
             * Here we use the simple peer handler which uses the 'simple-peer' npm library.
             * To learn how to create a custom connection handler, read the source code,
             * it is pretty simple.
             */
            connectionHandlerCreator: getConnectionHandlerSimplePeer(
                `ws${location.protocol.startsWith('https') ? 's' : ''}://localhost:3003`,
                // only in Node.js, we need the wrtc library
                // because Node.js does not contain the WebRTC API.
                // require('wrtc')
            ),
            pull: {},
            push: {}
        });
        replicationPool.error$.subscribe(err => { console.error(`Replication ${topic}-${collectionName} encountered an error`, err) });
        console.log('replicationPool', replicationPool)
        // todo: on page-change load a fresh copy from the db! await editor.load();

        const getChangedAttributes = (prev, next) => {
            const entr = Object.entries(next).filter(([k, v]) => prev[k] !== v);
            return [!!entr.length, Object.fromEntries(entr)];
        };

        const subscription = database[collectionName].$.subscribe(async changeEvent => {

            if(!changeEvent.isLocal && !isEqual(changeEvent?.previousDocumentData?.data?.data, changeEvent?.documentData?.data?.data)) {
                console.log(changeEvent);
                rerender(editor);
            }
            
            /*switch (`${changeEvent.collectionName}-${changeEvent.operation}`) {
                case "components-INSERT":
                    // TODO
                    break;
                case "components-UPDATE":
                    console.log(editor.Pages, changeEvent.documentData.data.page, changeEvent.documentData, changeEvent.documentData.data.data.content);
                    const root = editor.Pages.get(changeEvent.documentData.data.page).getMainComponent(); // only avail on component updates!!
                    const [component] = root.find(`[c_id="${CSS.escape(changeEvent.documentData.c_id)}"]`);
                    const [hasChangedAttr, changedAttr] = getChangedAttributes(changeEvent.previousDocumentData.data.data.attributes, changeEvent.documentData.data.data.attributes);
                    if(hasChangedAttr) {
                        console.log('rendering changed attrs', changedAttr);
                        component.setAttributes(changedAttr);
                    }
                    if(changeEvent.documentData.data.data.type === 'textnode' && changeEvent.previousDocumentData.data.data.content !== changeEvent.documentData.data.data.content) {
                        console.log('rendering changed text', changeEvent.documentData.data.data.content)
                        content.components(changeEvent.documentData.data.data.content);
                    }
                    /* TODO: Handle change of
                    - changeEvent.documentData.data.data.type
                    - changeEvent.documentData.data.idx
                    - changeEvent.documentData.data.parentId
                    
                    break;
                case "components-DELETE":
                    
                    break;
                default:
                    break;
            }*/
            
            
            // changeEvent.previousDocumentData
            /*
            collectionName: "components"
            documentData: {
                c_id: "5d5b3590-b6d3-4bbd-9bd3-4bef1a772538"
                data: {
                    c_id: "5d5b3590-b6d3-4bbd-9bd3-4bef1a772538"
                    data: {
                        page: '9YBIjLjcXOkve4PG',
                        content: '!!!Copper mug try-hard pitchfork pour-over freegan…c tumeric truffaut hexagon try-hard chambray. !!!',
                        attributes: {…},
                        type: 'textnode'
                    }
                    idx: 0
                    page: "9YBIjLjcXOkve4PG"
                    parentId: "997cfd30-43bb-436d-8a7c-0737cd5bb4e0"
                    type: "textnode"
                }
                idx: 0
                parentId: "997cfd30-43bb-436d-8a7c-0737cd5bb4e0"
                project: "project-1"
                type: "textnode"
                _attachments: {}
                _deleted: false
                _meta: {lwt: 1674968650527.01}
                _rev: "1-vs0vrx"
            }
            documentId: "5d5b3590-b6d3-4bbd-9bd3-4bef1a772538"
            endTime: 1674968650527.02
            eventId: "projectdb|components|5d5b3590-b6d3-4bbd-9bd3-4bef1a772538||000|1-vs0vrx"
            isLocal: false
            operation: "INSERT"
            previousDocumentData: undefined
            startTime: 1674968650527.01
            */
            
        })

        return {
            pool: replicationPool,
            cancel: () => {
                replicationPool.cancel();
                subscription.unsubscribe();
            },
        };
    }));
    return { assets, styles, pages, components };
}


