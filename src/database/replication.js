import {
    addRxPlugin
} from 'rxdb';
import {
    RxDBReplicationP2PPlugin,
} from 'rxdb/plugins/replication-p2p';
import debounce from 'lodash.debounce';
import isEqual from 'lodash.isequal';
import morphdom from 'morphdom';
import {Mutex} from 'async-mutex';

import { getConnectionHandlerSimplePeer } from './replication/connectionhandler';
import { createCollections, database } from './collection';
import { _load } from './load';
import diffAndPatch from './diffAndPatch';
import mutex from './iomutex';

addRxPlugin(RxDBReplicationP2PPlugin);

const currentProject = 'project-1';

const _rerender = async editor => {
    if(editor.getDirtyCount() > 0) {
        await editor.store({ mutex: new Mutex() })
    } 
    console.group("Rerender");
    const change = await _load(new Mutex(), currentProject, {}, { styles: false, assets: false });
    const selectedPage = editor.Pages.getSelected();
    const currentPage = change.pages.find(page => selectedPage.id === page.id);
    const {frames: [plan]} = currentPage;
    const actual = selectedPage.getMainComponent();
    const diff = diffAndPatch(plan, actual);
    console.log(diff, {plan, actual});
    console.group("Apply render");
    (new Set(diff.filter(({render}) => render !== false).map(({actual}) => actual))).forEach(async comp => {
        console.log("COMPONENT", comp);
        await Promise.resolve();
        comp?.view?.render();
    });
    console.groupEnd();
    console.groupEnd();
}
let queued = false;
const rerender = async editor => {
    if(queued) return;
    queued = true;
    await mutex.runExclusive(async () => {
        queued = false; // when we start running, allow a re-queue
        await _rerender(editor);
    });
};

export default async (editor, topic) => {

    const connectionHandlerCreator = getConnectionHandlerSimplePeer(
        `ws${location.protocol.startsWith('https') ? 's' : ''}://localhost:3003`,
        // only in Node.js, we need the wrtc library
        // because Node.js does not contain the WebRTC API.
        // require('wrtc')
    );

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
            connectionHandlerCreator,
            pull: {},
            push: {}
        });
        replicationPool.error$.subscribe(err => { console.error(`Replication ${topic}-${collectionName} encountered an error`, err) });
        console.log('replicationPool', replicationPool)
        // todo: on page-change load a fresh copy from the db! await editor.load();

        const subscription = database[collectionName].$.subscribe(async changeEvent => {
            //console.log(changeEvent);
            switch (changeEvent.collectionName) {
                case 'components':
                case 'pages':
                    if(
                        !changeEvent.isLocal && !isEqual(changeEvent?.previousDocumentData?.data, changeEvent?.documentData?.data) ||
                        changeEvent.operation === "DELETE" // on delete previousDocumentData.data and documentData.data are the same
                    ) {
                        rerender(editor);
                    }
                    break;
                case 'styles':
                    // TODO
                    console.log('hi')
                    //editor.Css.clear();
                    /*
                    changeEvent?.documentData?.data.forEach(({
                        atRuleType,
                        mediaText,
                        selectors,
                        style,
                        //selectorsAdd, // this css is present anyways
                        //group, // this css is present anyways
                        state,
                    }) => {
                        if(!selectors.length) return;
                        const rule = selectors.map(sel => state ? `${sel}:${state}` : sel).join(",");
                        const existingRule = editor.Css.getRule(rule, {
                            atRuleType,
                            atRuleParams: mediaText,
                        });
                        if(!existingRule || existingRule.selectorsToString() !== rule || existingRule.get("atRuleType") !== atRuleType || existingRule.get("mediaText") !== mediaText)
                            editor.Css.setRule(rule, style, {
                                atRuleType,
                                atRuleParams: mediaText,
                            });
                    })
                    
                    const existingRules = editor.Css.getRules();

                    existingRules

                    console.log("STYLECHANGE", editor.Css.getRules(), changeEvent?.documentData?.data)
                    selectorsAdd // ""
                    selectors // []
                    group
                    atRuleType
                    mediaText
                    state
                    singleAtRule
                    important

                    getAtRule
                    selectorsToString

                    //addRules remove setRule
                    */
                default:
                    break;
            }
        });

        // todo: replicate styles, assets and pages

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


