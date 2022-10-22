<div class="blocks-wrp">
    <div class="search-block">
        <input type="text" aria-label="search" role="searchbox" placeholder="Filter" bind:value={searchterm} />
        <button class="close-button" aria-label="Reset search" type="button" on:click={resetOpen}>
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
    <div aria-live="polite" role="region" aria-atomic="true">
        {#each Object.entries(collections) as [title, acollection]}
            <div class="collection">{title}</div>
            {#each acollection.sortBy(([cat]) => cat).all() as [category, bcollection]}
                <Accordion anyOpen={anyOpen} forceOpen={searchterm.length > searchmin && filteredItems && filteredItems.length < openitemmin} onOpen={cat => {
                    if(searchterm.length > 2 && filteredItems && !allcategories.includes(searchterm))
                        searchterm = cat;
                }} id={category}>
                    <svelte:fragment slot="title">
                        <span class="title gjs-blocks-t">
                            {category}
                        </span>
                    </svelte:fragment>
                    <svelte:fragment>
                        <div class="blocks gjs-blocks-c">
                        {#each bcollection.all() as block}
                            {#key block.getId()}
                            <div class="block gjs-block gjs-one-bg gjs-four-color-h" on:dragstart={onDragStart(block)} on:dragend={onDragStop()} draggable={true}>
                                <div class="block-media">{@html block.getMedia()}</div>
                                <div class="block-label gjs-block-label">{@html block.getLabel() }</div>
                            </div>
                            {/key}
                        {/each}
                        </div>
                    </svelte:fragment>
                </Accordion>
                
            {/each}
        {/each}
    </div>
</div>

<style>
    .search-block {
        display: flex;
        justify-content: center;
        margin-right: -1px;
    }
    .collection {
        font-size: 1.5em;
        margin-top: 0.5em;
        padding-top: 0.5em;
        text-align: left;
        padding-left: 1.5em;
        border-top: 1px solid silver;
    }
    .collection:first-of-type {
        border-top-style: none;
    }
   .block {
        user-select: none;
        min-width: 45px;
        padding: 1em;
        box-sizing: border-box;
        min-height: 90px;
        cursor: all-scroll;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        border: 1px solid rgba(0,0,0,.2);
        border-radius: 3px;
        margin: 10px 2.5% 5px;
        box-shadow: 0 1px 0 0 rgb(0 0 0 / 15%);
        transition: all .2s ease 0s;
        transition-property: color;
    }

    .block:hover {
        color: #d278c9;
    }
</style>

<script>
import { slide } from "svelte/transition";
import { writable } from 'svelte/store';

import { create, insert, insertBatch, remove, search } from "@lyrasearch/lyra";
import collect from 'collect.js';

import Accordion from "./accordion.svelte";

export let editor;
export let selfdiv;
export let searchmin;
export let openitemmin;

const anyOpen = writable(false);
let searchterm = '';
function resetOpen() {
    searchterm = '';
    anyOpen.set(false);
}

const blockdb = create({
    schema: {
        label: "string",
        category: "string",
        kind: "string",
        _id: "string",
    },
});


let blocks = [];
$: allcategories = blocks.map(block => block.getCategoryLabel());
let dragStart = function() {};
let dragStop = function() {};

editor.on('block:custom', handleBlocks);

$: collections = collect(Object.entries(
    collect(blocks
        .filter(block => !filteredItems || filteredItems.includes(block.getId()))
    ).groupBy(block => block.getCategoryLabel()).all()
)).groupBy(([k, group]) => group.first().attributes.kind || 'Block').all();

const searchDB = (term) => {
    const searchResult = search(blockdb, {
        term,
        properties: "*",
    });
    return searchResult;
}
$: filteredItems = searchterm.length > 1 ? searchDB(searchterm).hits.map(item => item._id) : null;

let lastSearchInsert = Promise.resolve();
const availableSearchIds = new Set();
const htmlStringExtractionDiv = document.createElement('div');
const getTextFromHTML = htmlString => {
    htmlStringExtractionDiv.innerHTML = htmlString;
    return htmlStringExtractionDiv.innerText.trim();
}
const addToSearch = async (blocks) => {
    await lastSearchInsert;
    const remainingBlocks = blocks.filter(block => !availableSearchIds.has(block.getId()));
    remainingBlocks.forEach(block => availableSearchIds.add(block.getId()));
    const preparedBlocks = remainingBlocks.map(block => ({
        label: getTextFromHTML(block.getLabel()),
        category: block.attributes.category || '',
        kind: block.attributes.kind || 'Block',
        _id: block.getId(),
    }));
    await insertBatch(blockdb, preparedBlocks, { batchSize: 100 });
}
function handleBlocks(props) {
    blocks = props.blocks;
    dragStart = props.dragStart;
    dragStop = props.dragStop;
    const cnt = props.container;
    cnt && cnt.appendChild(selfdiv);
    lastSearchInsert = addToSearch(blocks);
}
function onDragStart(block) {
    dragStart(block);
}
function onDragStop() {
    dragStop();
}
</script>