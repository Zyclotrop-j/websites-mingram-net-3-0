import 'grapesjs/dist/css/grapes.min.css';
import './editor.scss';
import grapesjs from 'grapesjs';

//import "grapesjs-preset-webpage/dist/grapesjs-preset-webpage.min.css";
//import grapesjswebpackpreset from 'grapesjs-preset-webpage';

import upload, { init as initAssets } from './helpers/upload';
import privateClass from './helpers/privateClass';

import classSelectTrait from "./traits/custom_class";
import iconTrait from "./traits/icon";
import coordinateTrait from "./traits/coordinate";

import components from './components/index';

import styles from './styles/index';

import blocks from './blocks/index';

import commands from './commands/index';

const div = document.createElement("div");
const editor = grapesjs.init({
    container : div,
    canvas: {
        scripts: ['/website.js'], // anything from a style-framework 
        styles: ['/layer.css'],
    },
    styleManager: {
        sectors: [],
    },
    assetManager: {
        uploadFile: upload({
            get editor() {
                return editor;
            }
        }),
    },
    selectorManager: {
        // componentFirst: true, // we mark 'private' classes as private instead
    },
    plugins: privateClass([
        iconTrait,
        classSelectTrait,
        coordinateTrait,
        initAssets,

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
        blocks
    },
});



document.body.appendChild(div);
