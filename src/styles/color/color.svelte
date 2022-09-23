<div>
    <label class="sr-hidden" for="{uid}">Select a preset</label>
    <select bind:this={presetselect} name="{uid}" id="{uid}" bind:value={preset} on:change={submitValue} on:change={changeToPreset} class="color-preset-select">
        <option disabled value="">Choose a preset</option>
        {#each presets as {value: v, title, text, fg, bg}}
            <option style="background-color: {bg}; color: {fg};" value="{v}" title="{title}">{text}</option>
        {/each}
    </select>
    <span class='or'>or</span>
    <div class='colorpicker'><ColorPicker label='Custom' aria-label='Pick a color' toRight bind:rgb isDark /></div>
</div>

<style>
   * {
      box-sizing: border-box;
    }
    select {
        background-color: transparent;
        color: rgba(255, 255, 255, .7);
        border: none;
        width: 100%;
    }
    .or {
        text-align: center;
        display: block;
        font-variant: small-caps;
    }
    .colorpicker {
        width: 5em;
    }
</style>

<script>

    import { onMount } from 'svelte';
    import ColorPicker from 'svelte-awesome-color-picker';
    import debounce from 'lodash.debounce';
    import { colorToRGBA } from './toRGB.js';

    export let uid;
    export let change;

    export let preset;
    export let mode;
    export let getComputedStyles;

    function pickTextColorBasedOnBgColorAdvanced(bgColor, lightColor, darkColor, name) {
        if(!bgColor || bgColor.trim() === '-') return 'white';
        const [r, g, b] = colorToRGBA(bgColor, name);
        const uicolors = [r / 255, g / 255, b / 255];
        const c = uicolors.map((col) => {
            if (col <= 0.03928) {
                return col / 12.92;
            }
            return Math.pow((col + 0.055) / 1.055, 2.4);
        });
        const L = (0.2126 * c[0]) + (0.7152 * c[1]) + (0.0722 * c[2]);
        return (L > 0.179) ? darkColor : lightColor;
    }

    const colors = [
        'transparent',
        'primary',
        'info',
        'success',
        'warning',
        'danger',
        'light',
        'dark',
        'orange',
        'yellow',
        'green',
        'turquoise',
        'cyan',
        'blue',
        'purple',
        'red',
        'black',
        'grey',
        'white',
        'text',
        'border',
        'background',
        'code',
        'pre',
        'link',
        'text-invert',
        'text-light',
        'text-strong',
        'border-hover',
        'border-light',
        'black-bis',
        'black-ter',
        'grey-darker',
        'grey-dark',
        'grey-light',
        'grey-lighter',
        'grey-lightest',
        'white-ter',
        'white-bis',
        'color-dark',
        'color-darkish',
        'color-lightish',
        'color-light',
        'inverse-dark',
        'inverse-light',
        'orange-invert',
        'yellow-invert',
        'green-invert',
        'turquoise-invert',
        'cyan-invert',
        'blue-invert',
        'purple-invert',
        'red-invert',
        'primary-invert',
        'primary-light',
        'primary-dark',
        'info-invert',
        'info-light',
        'info-dark',
        'success-invert',
        'success-light',
        'success-dark',
        'warning-invert',
        'warning-light',
        'warning-dark',
        'danger-invert',
        'danger-light',
        'danger-dark',
        'light-invert',
        'dark-invert',
        'scheme-main',
        'scheme-invert',
        'code-background',
        'pre-background',
        'link-invert',
        'link-light',
        'link-dark',
        'link-visited',
        'link-hover',
        'link-focus',
        'link-active',
        'list-color',
        'scheme-main-bis',
        'scheme-main-ter',
        'scheme-invert-bis',
        'scheme-invert-ter',
        'border-light-hover',
        'link-hover-border',
        'link-focus-border',
        'link-active-border',
        'list-item-description-color',
        'list-item-divider-color',
        'list-item-hover-color',
        'list-item-title-color',
    ];

	export let rgb; // or hsv or hex
    $: {
        if(rgb) changeToValue();
    }
    let presets = [];
    let presetselect;

    let changeToPreset = () => {mode = 'preset'};
    let changeToValue = () => {mode = 'value'};

    const submitValue = () => {
        change({ event: { value: finalvalue }, partial: false })
    }
    
    const refreshedPresets = () => {
        const bodyStyles = getComputedStyles();
        const getV = (size) => 
            bodyStyles.getPropertyValue(`--${size}-text`).replaceAll('"', '').trim() ||
            bodyStyles.getPropertyValue(`--${size}`).slice(0, 30) || '-' ;
        const ps = colors.map(clr => ({ value: `var(--${clr})`, text: clr, title: getV(clr), bg: bodyStyles.getPropertyValue(`--${clr}`), fg: pickTextColorBasedOnBgColorAdvanced(bodyStyles.getPropertyValue(`--${clr}`), 'white', 'black', clr) }));
        const hasPresets = ps.some(pre =>  pre.title && pre.title !== '-');
        if(hasPresets) {
            presets = ps;
        }
        return hasPresets;
    }
    onMount(() => {
        // the styles arrive weirdly late and at a unspecified point in time -> we retry until they are there
		let thisInterval = setInterval(() => {
            if(refreshedPresets()) {
                return clearInterval(thisInterval);
            }
        }, 1000);
	});


    
   const calculate = (m, {r,g,b,a} = {}, p) => {
    switch (m) {
        case 'preset':
            return p || '';
        case 'value':
        default:
            return `rgba(${r},${g},${b}${a ? ','+a : ''})`;
    }
   }
   $: finalvalue = calculate(mode, rgb, preset);

   

    $: {
        if(finalvalue) {
            change({ event: { value: finalvalue }, partial: false })
        }
        
	}
</script>