import { type as maptype } from "../../components/map/index";

export default [
    {
        id: 'Map',
        label: `<figure style="margin: 5px;">
            <svg viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M18 6v.01M18 13l-3.5-5a4 4 0 1 1 7 0L18 13"/><path d="M10.5 4.75L9 4L3 7v13l6-3l6 3l6-3v-2M9 4v13m6-2v5"/></g></svg>
        <figcaption>Map</figcaption></figure>`,
        content: { type: maptype },
        category: 'Media',
    },
];