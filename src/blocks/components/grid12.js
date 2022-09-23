import grid12, { type as grid12Type, itemType as grid12ItemType } from "../../components/grid-12/grid-12";

export default [
    {
        id: 'Grid-12',
        label: `<figure style="margin: 5px;">
        <svg width="32" height="32" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><rect width="6" height="6" x="4" y="4" rx="1"/><rect width="6" height="6" x="14" y="4" rx="1"/><rect width="6" height="6" x="4" y="14" rx="1"/><rect width="6" height="6" x="14" y="14" rx="1"/></g></svg>
        <figcaption>Grid 12</figcaption></figure>`,
        content: { type: grid12Type },
        category: 'Grid',
    },
    {
        id: 'Grid-Item',
        label: `<figure style="margin: 5px;">
        <svg width="32" height="32" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><rect width="6" height="6" x="4" y="4" rx="1"/><rect width="6" height="6" x="14" y="4" rx="1"/><rect width="6" height="6" x="4" y="14" rx="1"/><path d="M14 17h6m-3-3v6"/></g></svg>
        <figcaption>Grid 12 Item</figcaption></figure>`,
        content: { type: grid12ItemType },
        category: 'Grid',
    },
];