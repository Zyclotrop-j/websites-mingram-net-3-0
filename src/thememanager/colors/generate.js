import ColorThief from 'colorthief';

import ColorManager from './colorManager.svelte';

const colors = [
    /*
    --primary: var(--turquoise);
    --info: var(--cyan);
    --success: var(--green);
    --warning: var(--yellow);
    --danger: var(--red);

    --orange: hsl(14, 100%, 53%);
    --yellow: hsl(44, 100%, 77%);
    --green: hsl(153, 53%, 53%);
    --turquoise: hsl(171, 100%, 41%);
    --cyan: hsl(207, 61%, 53%);
    --blue: hsl(229, 53%, 53%);
    --purple: hsl(271, 100%, 71%);
    --red: hsl(348, 86%, 61%);

    --measure: 60ch;
    --ratio: 1.5;
    --s0: 1rem;
    */
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
    'orange-light',
    'yellow-light',
    'green-light',
    'turquoise-light',
    'cyan-light',
    'blue-light',
    'purple-light',
    'red-light',
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

    "black-transparent-50",
    "black-bis-transparent-50",
    "black-ter-transparent-50",
    "grey-darker-transparent-50",
    "grey-dark-transparent-50",
    "grey-transparent-50",
    "grey-light-transparent-50",
    "grey-lighter-transparent-50",
    "grey-lightest-transparent-50",
    "white-ter-transparent-50",
    "white-bis-transparent-50",
    "white-transparent-50",
    "black-transparent-20",
    "black-bis-transparent-20",
    "black-ter-transparent-20",
    "grey-darker-transparent-20",
    "grey-dark-transparent-20",
    "grey-transparent-20",
    "grey-light-transparent-20",
    "grey-lighter-transparent-20",
    "grey-lightest-transparent-20",
    "white-ter-transparent-20",
    "white-bis-transparent-20",
    "white-transparent-20",
    "black-transparent-80",
    "black-bis-transparent-80",
    "black-ter-transparent-80",
    "grey-darker-transparent-80",
    "grey-dark-transparent-80",
    "grey-transparent-80",
    "grey-light-transparent-80",
    "grey-lighter-transparent-80",
    "grey-lightest-transparent-80",
    "white-ter-transparent-80",
    "white-bis-transparent-80",
    "white-transparent-80",
];



export default (editor, { close, open }) => {

    const div = document.createElement("div");
    let selectedImage = null;

    const selectNewImage = async () => {
        close();
        await Promise.resolve();
        const asset = await new Promise((res, rej) => editor.AssetManager.open({
            types: ['image'],
            select(asset) {
                editor.AssetManager.close();
                res(asset);
            }
          }));
        selectedImage = asset;
        app.$set({
            selectedImage: asset,
        })
        await Promise.resolve();
        open();
    };

    const app = new ColorManager({ target: div, props: {
        colors,
        selectedImage,
        selectNewImage,
        ColorThief: new ColorThief(),
    } });

    const onClose = () => {
        console.log("onClose")
    };   
    const onOpen = async () => {
        if(selectedImage) return;
        await selectNewImage();
    };    

    return {
        div,
        onClose,
        onOpen,
    };
}

