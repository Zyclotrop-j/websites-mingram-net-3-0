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
import aimanager from './aimanager/aimanager';
import statusmanager from './statusmanager/statusmanager';
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

const swv = 'sw-visibility';
const expt = 'export-template';
const osm = 'open-sm';
const otm = 'open-tm';
const ola = 'open-layers';
const obl = 'open-blocks';
const ful = 'fullscreen';
const prv = 'preview';

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
    panels: {
        stylePrefix: 'pn-',
        defaults: [
          {
            id: 'commands',
            buttons: [{}],
          },
          {
            id: 'options',
            buttons: [
              {
                active: true,
                id: swv,
                className: 'fa fa-square-o',
                command: 'core:component-outline',
                context: swv,
                attributes: { title: 'View components' },
              },
              {
                id: prv,
                className: 'fa fa-eye',
                command: prv,
                context: prv,
                attributes: { title: 'Preview' },
              },
              {
                id: ful,
                className: 'fa fa-arrows-alt',
                command: ful,
                context: ful,
                attributes: { title: 'Fullscreen' },
              },
              {
                id: expt,
                className: 'fa fa-code',
                command: expt,
                attributes: { title: 'View code' },
              },
            ],
          },
          {
            id: 'views',
            buttons: [
              {
                id: osm,
                className: 'fa fa-paint-brush',
                command: osm,
                active: true,
                togglable: false,
                attributes: { title: 'Open Style Manager' },
              },
              {
                id: otm,
                className: 'fa fa-cog',
                command: otm,
                togglable: false,
                attributes: { title: 'Settings' },
              },
              {
                id: ola,
                className: 'fa fa-bars',
                command: ola,
                togglable: false,
                attributes: { title: 'Open Layer Manager' },
              },
              {
                id: obl,
                className: 'fa fa-th-large',
                command: obl,
                togglable: false,
                attributes: { title: 'Open Blocks' },
              },
            ],
          },
          {
            id: 'status',
            buttons: [],
          },
        ],
    },
});

document.body.appendChild(div);
statusmanager(editor);
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
aimanager(editor, {
    toast: ({ text }) => Toastify({
        text: text,
        duration: 2000,
        close: true,
        gravity: "top", 
        position: "left",
        stopOnFocus: true,
    }).showToast()
});


