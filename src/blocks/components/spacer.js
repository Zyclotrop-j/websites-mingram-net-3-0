import spacer, { typevertical as spacertypevertical, typehorizontal as spacertypehorizontal } from "../../components/spacer/index";

export default [
    {
        id: `spacer-block-vertical`,
        label: `<figure style="margin: 5px;">
        <svg viewBox="0 0 256 256"><path fill="currentColor" d="M165.7 194.3a8.1 8.1 0 0 1 0 11.4l-32 32a8.2 8.2 0 0 1-11.4 0l-32-32a8.1 8.1 0 0 1 11.4-11.4l18.3 18.4V43.3l-18.3 18.4a8.1 8.1 0 0 1-11.4-11.4l32-32a8.1 8.1 0 0 1 11.4 0l32 32a8.1 8.1 0 0 1 0 11.4a8.2 8.2 0 0 1-11.4 0L136 43.3v169.4l18.3-18.4a8.1 8.1 0 0 1 11.4 0Z"/></svg>
        <figcaption>Vertical space</figcaption></figure>`,
        content: { type: spacertypevertical },
        category: 'Basic'
    },
    {
        id: `spacer-block-horizontal`,
        label: `<figure style="margin: 5px;">
        <svg width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 8l-4 4l4 4m10-8l4 4l-4 4M3 12h18"/></svg>
        <figcaption>Horizontal space</figcaption></figure>`,
        content: { type: spacertypehorizontal },
        category: 'Basic'
    },
];