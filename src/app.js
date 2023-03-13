import 'grapesjs/dist/css/grapes.min.css';
import 'uppy/dist/uppy.min.css';
import "toastify-js/src/toastify.css";
import './editor.scss';

import grapesjs from 'grapesjs';
import Toastify from 'toastify-js';
import swal from 'sweetalert';

//import "grapesjs-preset-webpage/dist/grapesjs-preset-webpage.min.css";
//import grapesjswebpackpreset from 'grapesjs-preset-webpage';

import swClient from './sw-client';

import database from './database/database';

//import upload, { init as initAssets } from './helpers/_DELETE_ME_upload';
import privateClass from './helpers/privateClass';

import classSelectTrait from "./traits/custom_class";
import iconTrait from "./traits/icon";
import coordinateTrait from "./traits/coordinate";

import components from './components/index';

import styles from './styles/index';

import blocks from './blocks/index';

import commands from './commands/index';

import blockManager from './blockmanager/blockmanager';
import assetManager from './assetmanager/assetmanager';
import pagemanager from './pagemanager/pagemanager';
import rte from './rte/rte';

const serviceWorkerRegistration = swClient({
    promptForUpdate: ({ id, title, text }) => swal({
        title,
        text,
        buttons: true,
        dangerMode: id === 'REFRESH',
    }),
    beforeReload: async () => {
        editor.store();
    },
    toast: ({text}) => Toastify({
        text: text,
        duration: 2000,
        close: true,
        gravity: "top", 
        position: "left",
        stopOnFocus: true,
        backgroundColor: 'orange',
    }).showToast(),
});

const div = document.createElement("div");
const editor = grapesjs.init({
    container : div,
    storageManager: {
        type: 'pouchdb',
        options: {
            session: { key: 'documents' }
        }
    },
    canvas: {
        scripts: [{ src: '/website.js', type: 'module', async: true, defer: true }], // anything from a style-framework 
        styles: ['/layer.css'],
    },
    styleManager: {
        sectors: [],
    },
    pageManager: true,
    assetManager: {
        custom: true,
        /*uploadFile: upload({
            get editor() {
                return editor;
            }
        }),*/
    },
    selectorManager: {
        // componentFirst: true, // we mark 'private' classes as private instead
    },
    richTextEditor: {
        stylePrefix: 'rte-',
        adjustToolbar: true,
        actions: [],
    },
    plugins: privateClass([
        database,
        iconTrait,
        classSelectTrait,
        coordinateTrait,
        //initAssets,

        ...styles,

        ...components,

        ...commands,

        //'gjs-preset-webpage',

    ]),
    pluginsOpts: {
      /*'gjs-preset-webpage': {
        blocks: [],
        blocksBasicOpts: false,
        navbarOpts: false,
        countdownOpts: false,
        formsOpts: false,
        exportOpts: {},
        aviaryOpts: false,
        filestackOpts: false,
      }*/
    },
    blockManager: {
        blocks,
        custom: true,
    },
});

document.body.appendChild(div);
rte(editor);
blockManager(editor);
assetManager(editor, serviceWorkerRegistration);
pagemanager(editor, {
    toast: ({text, id}) => Toastify({
        text: text,
        duration: 2000,
        close: true,
        gravity: "top", 
        position: "left",
        stopOnFocus: true,
        backgroundColor: id === "PATH_INVALID_CHAR" ? "hsl(44, 100%, 47%)" : 'white',
    }).showToast(),
    prompt: ({ id, title, text }) => swal({
        title,
        text,
        buttons: true,
        dangerMode: id === 'DELETE_PAGE',
    }),
});


