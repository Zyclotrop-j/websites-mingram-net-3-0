<script>
	import { slide } from "svelte/transition";
	let isOpen = false
    export let forceOpen = false;
    export let onOpen = () => null;
    export let id;
    export let anyOpen;
	const toggle = () => {
        isOpen = !isOpen;
        anyOpen.update(any => any || isOpen);
        if(isOpen || forceOpen) onOpen(id);
    }
    anyOpen.subscribe(value => {
        if(value === false) {
            isOpen = false;
        }
    });
    
</script>
<style>
	button {border: none; background: none; display:block; color: inherit; cursor: pointer; font-size: 1.2em;}

	.icon { transition: transform 0.2s ease-in; height: 0.75em; }
	
	button[aria-expanded=true] .icon { transform: rotate(0.25turn); }
</style>
<button on:click={toggle} aria-expanded={isOpen || forceOpen}>
    <svg  class="icon" width="20" height="20" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 5l7 7-7 7"></path></svg>
    <slot name="title">Category name missing</slot>
</button>
{#if (isOpen || forceOpen)}
<div transition:slide={{ duration: 300 }}>
	<slot>
        No blocks in this category
    </slot>
</div>
{/if}