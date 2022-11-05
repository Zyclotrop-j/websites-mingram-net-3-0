<div class="pages-wrapper-wrp">
    <div class="file-tree-wrp">
        <ul class="file-tree folder-root">
        {#each [...tree].sort((a, b) => a.name.localeCompare(b.name)) as page}
            {#if page.children?.size}
                <Folder {...page} select={select} selectAndClose={selectAndClose} />
            {:else}
                <File {...page} select={select} selectAndClose={selectAndClose} />
            {/if}
            
         {/each}
        </ul>
    </div>
    <div class="pages-wrp">
        <div class="pages">
            {#if pages.length > 0}
                {#each pages as page}
                    {#key page.getId()}
                    <div class="page {selected === page.getId() ? 'selected' : ''}" on:click={select(page.getId())} on:dblclick={selectAndClose(page.getId())}>
                        <input class="hiddeninput" type="radio" name="selectpage" value="{page.getId()}" on:change={select(page.getId())} checked={selected === page.getId()} />
                        <div class="page-img" title={page.getName() || page.getId()} >
                            <Screenshot body={body} page={page} />
                        </div>
                        <div class="page-over">
                            <div class="page-name">{page.getName() || ''}</div>
                            <div class="page-name">{page.get('path') || ''}</div>
                        </div>
                        <div class="page-remove" on:click|stopPropagation={removeWithConfirm(page)}>Remove</div>
                        <div class="badges">
                            <div class="badge {page.get('isIndex')}"><svg viewBox="0 0 24 24"><path fill="currentColor" d="m12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z"/></svg></div>
                            <div class="badge {page.get('is404')}"><svg viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v4a1 1 0 0 0 1 1h3m0-5v10m3-9v8a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1zm7-1v4a1 1 0 0 0 1 1h3m0-5v10"/></svg></div>
                            <div class="badge {page.get('isError')}"><svg viewBox="0 0 20 20"><path fill="currentColor" d="M10 6a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0v-5A.5.5 0 0 1 10 6Zm0 8.5a.75.75 0 1 0 0-1.5a.75.75 0 0 0 0 1.5ZM9.723 2.084a.5.5 0 0 1 .554 0a15.05 15.05 0 0 0 6.294 2.421A.5.5 0 0 1 17 5v4.5c0 3.891-2.307 6.73-6.82 8.467a.5.5 0 0 1-.36 0C5.308 16.23 3 13.39 3 9.5V5a.5.5 0 0 1 .43-.495a15.05 15.05 0 0 0 6.293-2.421Zm-.124 1.262A15.969 15.969 0 0 1 4 5.428V9.5c0 3.392 1.968 5.863 6 7.463c4.032-1.6 6-4.071 6-7.463V5.428a15.969 15.969 0 0 1-5.6-2.082l-.4-.249l-.4.249Z"/></svg></div>
                        </div>
                    </div>
                    {/key}
                {/each}
            {:else}
                <div>
                    <h2>No pages in this project</h2>
                    <p>Use the button below to add one!</p>
                </div>
            {/if}
            
        </div>
    </div>
    <div>
        <button class="newpage" on:click={add({
            // todo: allow edit name, descriptions, path, fav-icon, ....
            name: `Page ${pages.length + 1}`,
            path: fixPath(`${selectedPage?.get('path') || ''}/p${pages.length + 1}`),
            id: uuidv4(), // without an explicit ID, a random one will be created
            description: '',
            title: '',
            tags: '',
            // todo: let user choose from templates
            styles: `.my-class { color: red }`, // or a JSON of styles
            component: '<div class="my-class">My element</div>', // or a JSON of components
        })}>Add new page</button>
    </div>
    <div class="form" bind:this={editor}>
        <label>
            Page short name
            <input placeholder="Name" on:change={changeName} class="input-Name" name="{selectedPage?.getId()}-Name" id="{selectedPage?.getId()}-Name" />
        </label>
        <label>
            Url path
            <input placeholder="Path" on:change={changePath} class="input-Path" name="{selectedPage?.getId()}-Path" id="{selectedPage?.getId()}-Path" />
        </label>
        <label>
            Page title
            <input placeholder="Title" on:change={changeTitle} class="input-Title" name="{selectedPage?.getId()}-Title" id="{selectedPage?.getId()}-Title" />
        </label>
        <label>
            Page tags
            <input placeholder="Tags" on:change={changeTags} class="input-Tags" name="{selectedPage?.getId()}-Tags" id="{selectedPage?.getId()}-Tags" />
        </label>
        <label>
            Page excerpt
            <textarea placeholder="Description" on:change={changeDescription} class="input-Description" name="{selectedPage?.getId()}-Description" id="{selectedPage?.getId()}-Description" />
        </label>
        <div>
            <label>
                Home page (index)
                <input type="checkbox" id="{selectedPage?.getId()}-isIndex" name="{selectedPage?.getId()}-isIndex" class="input-isIndex" on:change={changeIndex}>
            </label>
            <label>
                Page not found 404
                <input type="checkbox" id="{selectedPage?.getId()}-is404" name="{selectedPage?.getId()}-is404" class="input-is404" on:change={change404}>
            </label>
            <label>
                Error page
                <input type="checkbox" id="{selectedPage?.getId()}-isError" name="{selectedPage?.getId()}-isError" class="input-isError" on:change={changeError}>
            </label>
        </div>
    </div>
</div>

<style>

    .form {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-auto-rows: 1fr;
    }
    .form > label {
        display: flex;
        gap: 1em;
        align-items: center;
    }
    .newpage {
        width: calc(100% - 3rem);
        height: 100%;
        font-size: 1.5rem;
        font-variant: small-caps;
    }
    .badges {
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
    }
    .badges .badge.false {
        display: none;
    }
    .badges .badge.true {
        display: block;
        width: 20px;
        height: 20px;
        color: black;
        background: rgba(0,0,0,0.1);
        border-radius: 0.5em;
        border-top-left-radius: 0;
        transition: color 0.3s ease-in-out;
    }
    .badges .badge.true ~ .badge.true {
        border-top-left-radius: 0.5em;
        margin-left: 1px;
    }
    .page:hover .badges .badge.true {
        color: #d278c9;
    }

    .hiddeninput {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0,0,0,0);
        border: 0;
    }

    .pages-wrapper-wrp {
        display: grid;
        grid-template-columns: clamp(10vw, 25em, 30vw) 1fr;
    }
    .file-tree {
        list-style-type: none;
        font-size: 1em;
        line-height: 1.8em;
        padding-left: 18px;
        border-left: 1px dotted #aaa;
    }

    .pages-wrp {
        display: flex;
        flex-direction: column;
    }
    .pages-wrp > :nth-child(2) {
        margin-top: auto;
    }
    .pages-wrp {
        margin-top: 15px;
        min-height: 300px;
        min-width: 300px;
    }
    .page-img {
        max-width: 100%;
        display: block;
    }
    .page {
        width: calc(100vmax / 12);
        height: calc(100vmin / 9);
        overflow: hidden;
        border-radius: 5px;
        margin-bottom: 20px;
        cursor: pointer;
        position: relative;
        background-color: white;
        box-sizing: border-box;
    }
    .page.selected {
        border: 3px solid #d278c9;
    }
    .pages {
        display: flex;
        flex-wrap: wrap;
        gap: 4.15%;
    }
    .page-over {
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
    .page-remove {
        position: absolute;
        top: 0;
        right: 0;
        padding: 5px;
        font-size: 12px;
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
    }
    .page-name {
        margin-bottom: 10px;
    }
    .page:hover .page-over,
    .page:hover .page-remove {
        opacity: 1;
    }
</style>

<script>
    import { v4 as uuidv4 } from 'uuid';

    import Screenshot from './screenshot.svelte';
    import Folder from './folder.svelte';
    import File from './file.svelte';

    export let select;
    export let selectAndClose;
    export let add;
    export let remove;
    export let pages;
    export let selected;
    export let body;

    export let toast = ({ text, id }) => console.log(id, text);
    export let prompt;

    let editor;

    const fixPath = (value = '', alert) => {
        if(value[0] !== '/') value = '/'+value;
        const oldValue = value;
        value = value.replace(/[^a-zA-Z0-9-._~\//]/g, '-');
        if(value.length <= 1) value += 'p';
        value.replaceAll('//', '/');
        if(alert && value !== oldValue) {
            toast({ id: "PATH_INVALID_CHAR", text: "Invalid characters in path were replaced with valid ones!" });
        };
        return value;
    }

    const removeWithConfirm = (page) => {
        prompt({
            id: "DELETE_PAGE",
            title: "Delete page?",
            text: `Once deleted, you will not be able to recover page "${page.getName()}" file!`,
        }, page)
        .then((willDelete) => {
            if (willDelete) {
                remove(page.getId());
            }
        });
    }

    function listToTree(olist) {
        const map = {};
        const list = olist.map(page => {
            const obj = {
                id: page.getId(),
                name: page.getName(),
                path: fixPath(page.get('path')),
                children: new Set(),
                isPage: true,
                isDir: false,
            };
            map[obj.path] = obj;
            return obj;
        }).sort((a, b) => a.path.length - b.path.length);
        const roots = new Set();
        while(list.length) {
            const node = list.shift();
            const parentId = node.path.slice(0,  node.path.lastIndexOf('/'));
            if(parentId && !map[parentId]) {
                const parentPath = parentId.slice(0,  node.path.lastIndexOf('/'));
                const obj = {
                    id: uuidv4(),
                    name: parentPath,
                    path: fixPath(parentPath),
                    children: new Set([node]),
                    isPage: false,
                    isDir: true,
                };
                map[obj.path] = obj;
                list.push(obj);
            } else if (parentId) {
                map[parentId].isDir = true;
                map[parentId].children.add(node);
            } else {
                roots.add(node);
            }
        }
        return roots;
    }

    const changeName = (evt) => {
        selectedPage.setName(evt.target.value)
    };
    const changePath = (evt) => {
        let value = evt.target.value;
        selectedPage.set({ path: fixPath(value, true) });
    };
    const changeDescription = (evt) => {
        selectedPage.set({ description: evt.target.value })
    };
    const changeTitle = (evt) => {
        let value = evt.target.value;
        selectedPage.set({ title: value });
    };
    const changeTags = (evt) => {
        let value = evt.target.value;
        selectedPage.set({ tags: value });
    };

    const changeIndex = (evt) => {
        const checked = evt.target.checked;
        pages.forEach(page => {
            page.set({ isIndex: false });
        });
        selectedPage.set({ isIndex: checked });
    };
    const change404 = (evt) => {
        const checked = evt.target.checked;
        pages.forEach(page => {
            page.set({ is404: false });
        });
        selectedPage.set({ is404: checked });
    };
    const changeError = (evt) => {
        const checked = evt.target.checked;
        pages.forEach(page => {
            page.set({ isError: false });
        });
        selectedPage.set({ isError: checked });
    };

    $: selectedPage = pages.find((page) => page.getId() === selected);
    $: if(editor)editor.querySelector('.input-Name').value = selectedPage ? selectedPage.getName() : '';
    $: if(editor)editor.querySelector('.input-Path').value = fixPath(selectedPage ? selectedPage.get('path') : '');
    $: if(editor)editor.querySelector('.input-Description').value = selectedPage ? selectedPage.get('description') : '';
    $: if(editor)editor.querySelector('.input-Title').value = selectedPage ? selectedPage.get('title') : '';
    $: if(editor)editor.querySelector('.input-Tags').value = selectedPage ? selectedPage.get('tags') : '';
    $: if(editor)editor.querySelector('.input-isIndex').checked = selectedPage ? selectedPage.get('isIndex') : false;
    $: if(editor)editor.querySelector('.input-is404').checked = selectedPage ? selectedPage.get('is404') : false;
    $: if(editor)editor.querySelector('.input-isError').checked = selectedPage ? selectedPage.get('isError') : false;
    $: tree = listToTree(pages);

</script>