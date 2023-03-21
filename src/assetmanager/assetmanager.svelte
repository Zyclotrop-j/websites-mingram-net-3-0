<div class="assets-wrp">
    <div class="assets">
        {#each filterassets as asset}
            {#key asset.getSrc()}
            <div class="asset" on:click={select(asset)} on:dblclick={select(asset, true)}>
                {#if asset.getType() === 'image'}
                    {#await getSrc(asset.getSrc())}
                        <svg class="asset-img" aria-label="Loading image" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="2" r="0" fill="currentColor"><animate attributeName="r" begin="0" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/></circle><circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(45 12 12)"><animate attributeName="r" begin="0.125s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/></circle><circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(90 12 12)"><animate attributeName="r" begin="0.25s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/></circle><circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(135 12 12)"><animate attributeName="r" begin="0.375s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/></circle><circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(180 12 12)"><animate attributeName="r" begin="0.5s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/></circle><circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(225 12 12)"><animate attributeName="r" begin="0.625s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/></circle><circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(270 12 12)"><animate attributeName="r" begin="0.75s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/></circle><circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(315 12 12)"><animate attributeName="r" begin="0.875s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/></circle></svg>
                    {:then src}
                        <img class="asset-img" alt={asset.attributes.alt || asset.getFilename()} src={src} />
                    {:catch error}
                        <svg class="asset-img" aria-label="Error {error.message}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M21.71 14.54L19.21 12a1 1 0 0 0-1.42 0L15 14.84L12.21 12a1 1 0 0 0-1.42 0L8.5 14.34L6.21 12a1 1 0 0 0-1.42 0l-2.5 2.5a1 1 0 0 0-.21.33a1 1 0 0 0-.08.38V19a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-3.75a1 1 0 0 0-.08-.38a1 1 0 0 0-.21-.33ZM20 19a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3.34l1.5-1.5l2.29 2.3a1 1 0 0 0 1.42 0l2.29-2.3L14.29 17a1 1 0 0 0 1.42 0l2.79-2.8l1.5 1.5ZM19 2H5a3 3 0 0 0-3 3v5.26a1.17 1.17 0 0 0 0 .27v.1a1 1 0 0 0 1.66.31L5.5 9.16l2.29 2.3a1 1 0 0 0 1.42 0l2.29-2.3L14.29 12a1 1 0 0 0 1.42 0l2.79-2.8l1.77 1.78a1 1 0 0 0 1.66-.31a.28.28 0 0 0 0-.09a.88.88 0 0 0 .06-.28V5A3 3 0 0 0 19 2Zm1 5.84L19.21 7a1 1 0 0 0-1.42 0L15 9.84L12.21 7a1 1 0 0 0-1.42 0L8.5 9.34L6.21 7a1 1 0 0 0-1.42 0L4 7.84V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1Z"/></svg>
                    {/await}
                {:else}
	                <div class="otherasset {(asset.attributes.subtype || asset.getType())?.split('.')?.[0].replaceAll('+', '-')}">{(asset.attributes.subtype || asset.getType())?.split('.')?.[0].replaceAll('+', '-') || "Unknown type"}</div>
                    <div class="otherassetname">{asset.attributes?.meta?.original_name || "no name"}</div>
                {/if}
                
                <div class="asset-over">
                    <div>Select</div>
                    <div class="asset-name">{asset.attributes?.meta?.original_name || asset.getFilename()}</div>
                </div>
                <div class="asset-remove" on:click|stopPropagation={remove(asset)}>Remove</div>
            </div>
            {/key}
        {/each}
    </div>
     {#if notshowncount > 0}
        <div>Only showing asset of type {formatter.format(filter)}.</div>
        <div>Showing <em>{filterassets.length}</em> of <em>{assets.length}</em> assets!</div>
    {/if}
</div>

<style>
    .assets-wrp {
        display: flex;
        flex-direction: column;
    }
    .assets-wrp > :nth-child(2) {
        margin-top: auto;
    }
    .otherasset {
        font-size: 2rem;
        position: absolute;
        display: flex;
        justify-content: end;
        align-items: start;
        padding-right: 10px;
        padding-top: 15px;
        margin-left: -10px;
        margin-top: -5px;
        width: 100%;
        height: 100%;
        text-transform: uppercase;
        background: rgb(0,212,255);
        --col: rgba(0,212,255,1);
        --col2: rgb(16, 17, 19);
        background: linear-gradient(25deg, var(--col) 0%, var(--col2) 15%, var(--col) 30%, var(--col2) 45%, var(--col) 60%, var(--col2) 75%, var(--col) 90%, var(--col2) 100%);
    }
    .otherasset.pdf {
        --col: rgba(0,212,255,1);
        --col2: rgb(57, 19, 146);
    }
    .otherasset.octet-stream {
        --col: rgb(240, 128, 221);
        --col2: rgb(87, 6, 66);
    }
    .otherasset.css {
        --col: rgba(50,212,255,1);
        --col2: rgb(137, 19, 146);
    }
    .otherasset.csv {
        --col: rgb(166, 195, 201);
        --col2: rgb(74, 214, 46);
    }
    .otherasset.rtf {
        --col: rgb(168, 77, 61);
        --col2: rgb(219, 115, 67);
    }
    .otherasset.x-sh {
        --col: rgb(90, 11, 11);
        --col2: rgb(129, 88, 88);
    }
    .otherasset.epub-zip {
        --col: rgba(0,112,255,1);
        --col2: rgb(57, 19, 46);
    }
    .otherasset.gzip, .otherasset.x-tar, .otherasset.zip, .otherasset.x-7z-compressed, .otherasset.x-bzip, .otherasset.x-bzip2 {
        --col: rgba(0,112,155,1);
        --col2: rgb(57, 19, 146);
    }
    .otherasset.html {
        --col: rgb(73, 33, 33);
        --col2: rgb(231, 116, 135);
    }
    .otherasset.calendar {
        --col: rgb(219, 120, 120);
        --col2: rgb(170, 5, 24);
    }
    .otherasset.java-archive {
        --col: rgba(0,212,255,1);
        --col2: rgb(57, 19, 146);
    }
    .otherasset.javascript {
        --col: rgb(206, 210, 211);
        --col2: rgb(57, 19, 146);
    }
    .otherasset.json {
        --col: rgb(33, 64, 77);
        --col2: rgb(41, 199, 247);
    }
    .otherasset.ld-json {
        --col: rgb(65, 68, 41);
        --col2: rgb(160, 167, 129);
    }
    .otherasset.midi, .otherasset.x-midi, .otherasset.ogg, .otherasset.opus, .otherasset.wav, .otherasset.webm {
        --col: rgb(247, 241, 247);
        --col2: rgb(57, 19, 146);
    }
    .otherasset.mpeg {
        --col: rgb(74, 83, 85);
        --col2: rgb(57, 19, 146);
    }
    .otherasset.vnd, .otherasset.msword {
        --col: rgb(37, 170, 10);
        --col2: rgb(70, 221, 138);
    }
    .otherasset.otf, .otherasset.ttf, .otherasset.woff, .otherasset.woff2 {
        --col: rgb(80, 173, 25);
        --col2: rgb(3, 56, 10);
    }
    .otherasset.x-httpd-php {
        --col: rgb(0, 255, 98);
        --col2: rgb(19, 146, 57);
    }
    .otherasset.plain {
        --col: rgb(255, 230, 0);
        --col2: rgb(189, 190, 131);
    }
    .otherasset.xml {
        --col: rgb(255, 153, 0);
        --col2: rgb(73, 52, 13);
    }

    .otherassetname {
        position: absolute;
        bottom: 5px;
        left: 5px;
        background: rgba(0,0,0,.5);
        border-radius: 10px;
        padding: 5px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        max-width: calc(100% - 2 * 10px);
        font-size: 0.75em;
        letter-spacing: 0.1px;
        transition: opacity 0.3s ease-in-out;
    }
    .asset:hover .otherassetname {
        opacity: 0;
    }
    .assets-wrp {
        margin-top: 15px;
        min-height: 300px;
        min-width: 300px;
    }
    .asset-img {
        display: block;
        object-fit: cover;
        height: 100%;
        aspect-ratio: 1.5;
        margin-left: auto;
        margin-right: auto;
    }
    .asset:hover .asset-img, .asset:focus-within .asset-img {
        object-fit: contain;
    }
    .asset {
        height: 90px;
        border-radius: 5px;
        margin-bottom: 20px;
        cursor: pointer;
        position: relative;
    }
    .assets {
        display: flex;
        flex-wrap: wrap;
        gap: 4.15%;
    }
    .asset-over {
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0;
        top: 0;
        left: 0;
        background-color: rgb(0 0 0 / 70%);
        transition: opacity 0.3s ease-in-out;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        font-size: 12px;
        flex-direction: column;
    }
    .asset-remove {
        position: absolute;
        top: 0;
        right: 0;
        padding: 5px;
        font-size: 12px;
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
    }
    .asset-name {
        margin-bottom: 10px;
    }
    .asset:hover .asset-over,
    .asset:hover .asset-remove {
        opacity: 1;
    }
</style>

<script>
    import { onDestroy } from 'svelte';
    import { Mutex } from 'async-mutex';
    import ExpiryMap from 'expiry-map';

    export let select;
    export let remove;
    export let assets;
    export let filter;
    export let picapromise;

    const mutex = new Mutex();
    const canvasCache = new ExpiryMap(1000 * 60, []);
    const cache = new Map();
    const toCancel = [];
    onDestroy(() => toCancel.forEach(i => i()));

    async function loadImage(url, elem) {
        return new Promise((resolve, reject) => {
            elem.onload = () => resolve(elem);
            elem.onerror = reject;
            elem.src = url;
            if(elem.complete) {
                resolve(elem);
            }
        });
    }

     function getSrc(src) {
        if(cache.has(src)) {
            return cache.get(src);
        }
        const taskMaker = async () => {
            const pica = await picapromise;
            const mimg = await loadImage(src, new Image());
            const ratio = mimg.naturalHeight / mimg.naturalWidth;
            const w = 200;
            const h = w * ratio;
            const r = await mutex.runExclusive(async () => {
                const cancelToken = new Promise((_, rej) => {
                    toCancel.push(rej);
                });
                let canvas = canvasCache.get(`${w}-${h}`);
                if(!canvas) {
                    canvas = new OffscreenCanvas(w, h);
                    canvasCache.set(`${w}-${h}`, canvas);
                }
                const t = await pica.resize(mimg, canvas, { cancelToken });
                const blob = await pica.toBlob(t, 'image/jpeg');
                toCancel.pop();
                return URL.createObjectURL(blob);
            });
            return r;
        }
        const task = taskMaker();
        cache.set(src, task);
        return task;
    }

    $: filterassets = assets.filter(asset => !filter.length || filter.some(type => (asset.attributes.subtype || '').includes(type) || asset.getType().includes(type)));
    $: notshowncount = assets.length - filterassets.length;

    const formatter = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' });
</script>