import { Uppy, Tus, DropTarget, StatusBar, Informer } from 'uppy';
import { v4 as uuidv4 } from 'uuid';
import AssetManager from './assetmanager.svelte';

const mimeTypeMatcher = /^(.+)\/(.+)$/;

export default function blockManager(editor) {
    const assetManager = editor.AssetManager;

    const div = document.createElement("div");
    div.classList.add('customassetmanager');
    const upload = document.createElement("div");
    const existing = document.createElement("div");
    div.appendChild(upload);
    const statusbar = document.createElement("div");
    const informer = document.createElement("div");
    statusbar.classList.add('statusbar');
    informer.classList.add('informer');
    div.appendChild(statusbar);
    document.body.appendChild(informer);

    let activefilter = [];

    const app = new AssetManager({ target: existing, props: {
        assets: [],
        select: null,
        remove: (arg) => {
            assetManager.remove(arg.id);
            uppy.removeFile(arg.attributes.id || arg.id);
        },
    } });
    editor.on('asset:custom', (props) => {
        props.container.appendChild(div);
        activefilter = props.types || [];
        app.$set({
            assets: props.assets,
            select: props.select,
            filter: props.types || [],
        });
    });
    editor.on('asset:close', () => {
        editor.store();
        app.$set({
            assets: assetManager.getAll(),
            select: null,
            filter: [],
        });
    });
    editor.on('asset:open', () => {
        upload.appendChild(existing);
    });
    editor.on('asset:add', () => {
        editor.store();
    });
    editor.on('asset:remove', () => {
        editor.store();
    });
    editor.on('asset:update', () => {
        editor.store();
    });

    const uppy = new Uppy({
        autoProceed: true,
        onBeforeFileAdded: (currentFile) => {
            const modifiedFile = {
                ...currentFile,
                meta: {
                    ...currentFile.meta,
                    original_name: currentFile.name,
                },
                name: `${uuidv4()}`,
            }
            return modifiedFile
        },
    });
    uppy.use(StatusBar, { target: statusbar });
    uppy.use(Informer, { target: informer });
    //uppy.use(DragDrop, { target: upload });
    uppy.use(Tus, { endpoint: 'http://localhost:1080/files/' });
    //uppy.use(Dashboard, {inline: true, target: upload });
    uppy.use(DropTarget, { target: upload });

    uppy.on('file-added', (file) => {
        // uppy.setFileMeta(file.id, { ... }); // set owner and stuff here

        const data = file.data;
        const url = URL.createObjectURL(data)
        const image = new Image()
        image.src = url;
        image.onload = () => {
            uppy.setFileMeta(file.id, { ...file.meta, width: image.width, height: image.height })
            URL.revokeObjectURL(url)
        };
    })
    uppy.on('upload-success', (file, {uploadURL}) => {
       const asset = {
            extension: file.extension,
            id: file.id,
            meta: file.meta,
            name: file.name,
            size: file.size,
            source: file.source,
            lastModified: file.data.lastModified,
            type: 'image', // fallback / default
            src: uploadURL,
        };
        const match = mimeTypeMatcher.exec(file.type)?.[1] ?? mimeTypeMatcher.exec(file.meta.type)?.[1];
        const match2 = mimeTypeMatcher.exec(file.type)?.[2] ?? mimeTypeMatcher.exec(file.meta.type)?.[2];
        if (match) {
            asset.type = match;
            asset.subtype = match2;
        }
        if(file.height || file.meta.height) asset.height = file.height || file.meta.height;
        if(file.width || file.meta.width) asset.width = file.width || file.meta.width;
        assetManager.add(asset);

    });



    return div;

}


