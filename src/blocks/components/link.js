import link, {
    inlinelinktype,
    blocklinktype,
} from "../../components/link/link";

export default [
    {
        id: `${inlinelinktype}-link`,
        label: `<figure style="margin: 5px;">
        <svg viewBox="0 0 32 32"><path fill="currentColor" d="M29.25 6.76a6 6 0 0 0-8.5 0l1.42 1.42a4 4 0 1 1 5.67 5.67l-8 8a4 4 0 1 1-5.67-5.66l1.41-1.42l-1.41-1.42l-1.42 1.42a6 6 0 0 0 0 8.5A6 6 0 0 0 17 25a6 6 0 0 0 4.27-1.76l8-8a6 6 0 0 0-.02-8.48Z"/><path fill="currentColor" d="M4.19 24.82a4 4 0 0 1 0-5.67l8-8a4 4 0 0 1 5.67 0A3.94 3.94 0 0 1 19 14a4 4 0 0 1-1.17 2.85L15.71 19l1.42 1.42l2.12-2.12a6 6 0 0 0-8.51-8.51l-8 8a6 6 0 0 0 0 8.51A6 6 0 0 0 7 28a6.07 6.07 0 0 0 4.28-1.76l-1.42-1.42a4 4 0 0 1-5.67 0Z"/></svg>
        <figcaption>Inline link</figcaption></figure>`,
        content: { type: inlinelinktype },
        category: 'Link'
    },
    {
        id: `${blocklinktype}-link`,
        label: `<figure style="margin: 5px;">
        <svg viewBox="0 0 32 32"><path fill="currentColor" d="M18.706 27.585a5.261 5.261 0 0 1-3.723-8.983l1.415 1.414a3.264 3.264 0 1 0 4.616 4.616l6.03-6.03a3.264 3.264 0 0 0-4.616-4.616l-1.414-1.414a5.264 5.264 0 0 1 7.444 7.444l-6.03 6.03a5.246 5.246 0 0 1-3.722 1.539Z"/><path fill="currentColor" d="M10.264 29.997a5.262 5.262 0 0 1-3.722-8.983l6.03-6.03a5.264 5.264 0 1 1 7.444 7.443l-1.414-1.414a3.264 3.264 0 1 0-4.616-4.615l-6.03 6.03a3.264 3.264 0 0 0 4.616 4.616l1.414 1.414a5.245 5.245 0 0 1-3.722 1.54zM2 10h8v2H2zm0-4h12v2H2zm0-4h12v2H2z"/></svg>
        <figcaption>Block link</figcaption></figure>`,
        content: { type: blocklinktype },
        category: 'Link'
    },
];