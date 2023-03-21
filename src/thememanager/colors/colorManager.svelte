<div class="colors-wrp">

    <div class="step">
        {#if selectedImage}
            <img src={selectedImage?.getSrc()} alt="{selectedImage?.get('alt')}" />
        {/if}
        <button on:click={selectNewImage}>{selectedImage ? 'Select' : 'Reselect'} image</button>
    </div>

    <div class="step">
        {#if selectedImage?.getSrc()}
            <div>
                {#await getPalet(selectedImage.getSrc(), 5, (variant + 1) / 3, saturation)}
                <p>Loading...</p>
                {:then palet}
                    <p>Please select a primary color</p>
                    <div class="color">                
                    {#each palet as [r, g, b]}
                        <div class="color">
                            <div class="dot" style="--color: rgb({r},{g},{b})">
                                <input type="radio" on:change={() => (secondary = ternary = undefined)} bind:group={primary} value={[r,g,b]} />
                            </div>
                        </div>
                    {/each}
                    </div>
                {:catch error}
                    <p>Something went wrong: {error.message}</p>
                {/await}
            </div>
            <div class="col inputs">
                Variant <input type=range bind:value={variant} min=0 max=10>
                Saturation <input type=range bind:value={saturation} min=0 max=10>
            </div>
        {:else}
            <p>Please select an image to proceed</p>
        {/if}
    </div>


    <div class="step third">
    {#if primary}
	    <div class="secondary">
            <p>Please select a secondary color</p>
            {#each makeSplitCompColor(primary) as [r, g, b], idx}
            {#if !idx}<div class="dot" style="--color: rgb({r}, {g}, {b})">
                <input type="radio" class="secondary" bind:group={secondary} value={[r,g,b]} />
            </div>{/if}
            {/each}
            {#each makeTriadicColor(primary) as [r, g, b], idx }
            {#if !idx}<div class="dot" style="--color: rgb({r}, {g}, {b})">
                <input type="radio" class="secondary" bind:group={secondary} value={[r,g,b]} />
            </div>{/if}
            {/each}
        </div>

        <div class="ternary">
            <p>Please select a ternary color</p>
            {#each makeSplitCompColor(primary) as [r, g, b], idx}
            {#if idx}<div class="dot" style="--color: rgb({r}, {g}, {b})">
                <input type="radio" class="ternary" bind:group={ternary} value={[r,g,b]} />
            </div>{/if}
            {/each}
            {#each makeTriadicColor(primary) as [r, g, b], idx }
            {#if idx}<div class="dot" style="--color: rgb({r}, {g}, {b})">
                <input type="radio" class="ternary" bind:group={ternary} value={[r,g,b]} />
            </div>{/if}
            {/each}
        </div>
    {:else}
        <p>Please select a primary color to proceed</p>
    {/if}
        
    </div>

    <div class="summary">
        <div class="dot" style="--color: rgb({primary?.[0]}, {primary?.[1]}, {primary?.[2]})">P</div>
        <div class="dot" style="--color: rgb({secondary?.[0]}, {secondary?.[1]}, {secondary?.[2]})">S</div>
        <div class="dot" style="--color: rgb({ternary?.[0]}, {ternary?.[1]}, {ternary?.[2]})">T</div>
        {#each currentPalet as [r, g, b], idx}
            <div class="dot" style="--color: rgb({r},{g},{b})">{1 + idx}</div>
        {/each}
    </div>
</div>

<style>
    .summary {
        display: inline-flex;
        width: 100%;
        justify-content: space-around;
        flex-direction: row;
        align-items: center;
    }
    .step {
        display: flex;
        flex-direction: column;
        gap: 1em;
    }
    .inputs {
        min-height: 20em;
    }
    .col {
        display: flex;
        flex-direction: column;
    }
    .colors-wrp {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
    }
    .dot {
        background: var(--color);
        width: 50px;
        height: 50px;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        border-radius: 100%;
    }
    .colors-wrp > div > img {
        width: 100px;
        height: 100px;
        object-fit: contain;
    }
    .color {
        display: flex;
        gap: 0.5em;
    }
    .color > .color {
        flex-direction: column;
    }
</style>

<script>
    import { adjustHue, saturate, rgba, parseToRgba } from 'color2k';
    // export let colors;
    export let selectedImage;
    export let ColorThief;
    export let selectNewImage = () => null;

    let variant;
    let saturation = 0.5;
    let primary;
    let secondary;
    let ternary;
    let currentPalet = [];

    function* generateColors ([r, g, b], x1, x2, x3) {
        for (let y = x1; y <= x2; y += x3) {
            yield parseToRgba(saturate(adjustHue(rgba(r, g, b, 1), y), saturation / 10));
        }
    }

    // generates one complementary color
    const makeCompColor = color => {
        return [...generateColors(color, 180, 180, 180)]
    }
    // generates two split complementary colors
    const makeSplitCompColor = color => {
        return [...generateColors(color, 150, 210, 60)]
    }
    // generates two colors to complete triad
    const makeTriadicColor = color => {
        return [...generateColors(color, 120, 240, 120)]
    }
    // generates three colors to complete tetrad
    const makeTetradic = color => {
        return [...generateColors(color, 90, 270, 90)]
    }
    // generates four colors
    const makeAnalogous = color => {
        return [...generateColors(color, 30, 90, 30)]
    }

    const colorDistance = (color1, color2) => color1.reduce((p, v, idx) => p + (v - color2[idx]) * (v - color2[idx]), 0);
    async function getPalet(sI, len, per) {
        if(!sI) return [];
        const img = await new Promise(res => {
            const img = document.createElement('img');
            img.addEventListener('load', function() {
                res(img)
            });
            document.body.appendChild(img);
            img.src = sI;
        });

        const palet = await ColorThief.getPalette(img, len, Math.floor(img.naturalWidth * img.naturalHeight / 100 * per));
        document.body.removeChild(img);
        const r= palet.sort(colorDistance);
        currentPalet = r;
        return r;
    }

</script>