<div>
    <label class="sr-hidden" for="{uid}">Select a preset</label>
    <select bind:this={presetselect} name="{uid}" id="{uid}" bind:value={preset} on:change={submitValue} on:change={changeToPreset} class="size-preset-select">
        <option value="">Choose a preset</option>
        {#each presets as {value: v, title, text}}
            <option value="{v}" title="{title}">{text}</option>
        {/each}
    </select>
    <span class='or'>or</span>
    {#if property && property.startsWith('margin')}
        <label for="{uid}-auto" title="Take remaing space">Auto</label><input  name="{uid}-auto" id="{uid}-auto" type="checkbox" bind:checked={isAuto} on:input={changeToAuto} on:change={submitValue}>
        <span class='or'>or</span>
    {/if}
    <input type="range" bind:value={nrange} on:change={submitValue} on:input={changeToValue} class="sliderinput" min="{minrange}" max="{maxrange}"/>
    <input type="number" bind:value={nrange} on:change={submitValue} on:input={changeToValue} class="numberinput" min="{minrange}" max="{maxrange}"/>
    <select bind:value={unit} name="{uid}-unit" id="{uid}-unit" class="unit-input"  on:change={changeToValue} >
        <option value="em" title="Parent font width">em</option>
        <option value="rem" title="Global font width">rem</option>
        <option value="%" title="Percent">%</option>
        <option value="px" title="Pixel">px</option>
        <option value="vw" title="Percent of view width">vw</option>
        <option value="vh" title="Percent of view height">vh</option>
        <option value="vmin" title="Percent of smaller of vw and vh">vmin</option>
        <option value="vmax" title="Percent of larger of vw, vh">vmax</option>
        <option value="ex" title="x-height of the element's font">ex</option>
        <option value="ch" title="Width of glyph 0">ch</option>
        <option value="cm" title="Centimeters">cm</option>
        <option value="mm" title="Milimeters">mm</option>
        <option value="Q" title="Quarter-millimeters">Q</option>
        <option value="in" title="Inches">in</option>
        <option value="pc" title="Picas">pc</option>
        <option value="pt" title="Points">pt</option>
    </select>
</div>

<style>
   * {
      box-sizing: border-box;
    }
    .unit-input {
        width: 3ch;
    }
    .numberinput {
        width: 6ch;
        text-align: right;
    }
    .unit-input, .numberinput {
        display: inline-block;
    }
    input[type=number].numberinput::-webkit-inner-spin-button, 
    input[type=number].numberinput::-webkit-outer-spin-button { 
        -webkit-appearance: none; 
        margin: 0; 
    }
    .or {
        text-align: center;
        display: block;
        font-variant: small-caps;
    }
</style>

<script>
    import sizes from "../../utils/sizes.js";

    import { onMount } from 'svelte';

    export let uid;
    export let change;

    export let unit;
    export let nrange;
    export let preset;
    export let mode;
    export let getComputedStyles;
    export let el;
    export let property;
    export let isAuto;

    let presets = [];
    let presetselect;
    
    
    const refreshPresets = () => {
        const bodyStyles = getComputedStyles();
        const getV = (size) => 
            bodyStyles.getPropertyValue(`--${size}-text`).replaceAll('"', '').trim() ||
            bodyStyles.getPropertyValue(`--${size}`).slice(0, 14) || '-' ;
        presets = sizes.map(size => ({ value: `var(--${size})`, text: size, title: getV(size) }));
        return presets.some(pre =>  pre.title && pre.title !== '-')
    }
    onMount(() => {
        // the styles arrive weirdly late and at a unspecified point in time -> we retry until they are there
		let thisInterval = setInterval(() => {
            if(refreshPresets()) {
                clearInterval(thisInterval);
            }
        }, 1000);
	});

    let changeToPreset = () => {mode = 'preset'};
    let changeToValue = () => {mode = 'value'};
    let changeToAuto = () => {mode = 'auto'};
    
    $: minrange = (() => {
        switch (unit) {
            case 'em':
            case 'rem':
            case '%':
            case 'px':
            case 'vw':
            case 'vh':
            case 'vmin':
            case 'vmax':
            case 'ex':
            case 'ch':
            case 'cm':
            case 'mm':
            case 'Q':
            case 'in':
            case 'pc':
            case 'pt':
            default:
                return property && property.startsWith('margin') ? -maxrange : 0;
        }
    })();
    $: maxrange = (() => {
        const comSty = el && window.getComputedStyle(el);
        let { width = 0, height = 0 } = { 
            width: el && el.clientWidth - parseFloat(comSty.getPropertyValue('padding-left')) - parseFloat(comSty.getPropertyValue('padding-right')), 
            height: el && el.clientHeight - parseFloat(comSty.getPropertyValue('padding-top')) - parseFloat(comSty.getPropertyValue('padding-bottom'))
        };
        const isGap = comSty && property && property.endsWith('gap');
        const isHeightOrWidth = comSty && property && ['width', 'height'].includes(property);
        if(isGap) { 
            const rgv = parseFloat(comSty.getPropertyValue('row-gap') || '1')
            const cgv = parseFloat(comSty.getPropertyValue('column-gap') || '1')
            height -= (isNaN(rgv) ? 0 : rgv) * (el.childElementCount - 1);
            width -= (isNaN(cgv) ? 0 : cgv) * (el.childElementCount - 1);
        }
        const em = el && parseFloat(comSty.getPropertyValue('font-size'));
        const gSty = el && window.getComputedStyle(el.ownerDocument.documentElement);
        const rem = el && parseFloat(gSty.getPropertyValue('font-size'));
        if(isHeightOrWidth) {
            height = el ? parseFloat(gSty.getPropertyValue('height')) : 10000;
            width = el ? parseFloat(gSty.getPropertyValue('width')) : 10000;
        }
        const maxdim = Math.min(Math.max(width, height),  Math.max(el ? parseFloat(gSty.getPropertyValue('height')) : 10000, el ? parseFloat(gSty.getPropertyValue('width')): 10000));
        switch (unit) {
            case 'em':
                return Math.ceil(maxdim/em);
            case 'rem':
                return Math.ceil(maxdim/rem);
            case '%':
                return 100;
            case 'px':
                return Math.ceil(maxdim);
            case 'vw':
            case 'vh':
            case 'vmin':
            case 'vmax':
                return 100;
            case 'ex':
            case 'ch':
                return 30;
            case 'cm':
                return Math.ceil(maxdim/37.8);
            case 'mm':
                return Math.ceil(maxdim/37.8*10);
            case 'Q':
                return Math.ceil(maxdim/37.8*10*4);
            case 'in':
                return Math.ceil(maxdim/96);
            case 'pc':
                return Math.ceil(maxdim/96*6);
            case 'pt':
                return Math.ceil(maxdim/96*72);
            default:
                return 100;
        }
    })();
   const calculate = (m, u, r, p, a) => {
    switch (m) {
        case 'preset':
            return p || '';
        case 'auto':
            return a ? 'auto' : undefined;
        case 'value':
        default:
            return `${r||''}${u||'rem'}`;
    }
   }
   $: finalvalue = calculate(mode, unit, nrange, preset, isAuto);
   $: {
    if(!unit && nrange) {
        unit = 'rem';
    }
   }

   const submitValue = () => {
    change({ event: { value: finalvalue }, partial: false })
   }

    $: {
        if(finalvalue) {
            change({ event: { value: finalvalue }, partial: true })
        }
        
	}
</script>