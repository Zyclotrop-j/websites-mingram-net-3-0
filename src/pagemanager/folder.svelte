<script>
    import File from './file.svelte';

	export let name = "";
    export let path = "";
	export let children = new Set();
	export let indent = 0;
    export let select;
    export let selectAndClose;
    export let isPage = false;
    export let id;
	
	let open = false;
	
	function toggleOpen() {
		open = !open;
	}
</script>

<style>
	.folder-root {
		cursor: pointer;
		user-select: none;
	}
    ul {
        list-style-type: none;
        font-size: 1em;
        line-height: 1.8em;
        padding-left: 18px;
        border-left: 1px dotted #aaa;
    }
    li {
        position: relative;
        padding-left: 15px;
    }

    li span {
        text-decoration: none;
        cursor: pointer;
        padding-left: 2em;
        margin-left: -2em
    }

    li span:before {
        display: block;
        content: ' ';
        width: 10px;
        height: 1px;
        position: absolute;
        border-bottom: 1px dotted #aaa;
        top: 0.6em;
        left: -14px;
    }
    li:before {
        list-style-type: none;
        font-family: FontAwesome;
        display: block;
        content: "F";
        position: absolute;
        top: 0;
        left: 0;
        width: 20px;
        height: 20px;
        font-size: 1.3em;
        color: #d278c9;
        pointer-events: none;
    }
    .folder-root {
        list-style-type: none;
        display: flex;
        flex-direction: column;
    }

    .folder-root:before {
        content: ">";
        transform: rotate(90deg) translateX(7px);
    }
    .folder-root.closed:before {
        transform: rotate(00deg);
    }
    li.folder-root > ul {
        transition: all 0.2s ease-in-out;
        overflow: hidden;
    }
    li.folder-root > ul {
        opacity: 1;
        display: block;
        max-height: 1000px;
    }
    li.folder-root.closed > ul {
        opacity: 0;
        max-height: 0;
    }
</style>

{#if isPage}
    <File id={id} name={name} path={path} children={children} indent={indent} select={select} selectAndClose={selectAndClose} />
{/if}
<li class="folder-root {open ? '' : 'closed'}" data-level={indent}>
    <span title={name} class="folder-name" on:click|stopPropagation={toggleOpen}>{path}</span>
    {#if open}
        <ul>
        {#each [...children].sort((a, b) => a.name > b.name) as child}
            {#if child.children?.size}
                <svelte:self {...child} indent={indent + 1} select={select} selectAndClose={selectAndClose}/>
            {:else}
                <File {...child} select={select} selectAndClose={selectAndClose} />
            {/if}
        {/each}
        </ul>
    {/if}
</li>