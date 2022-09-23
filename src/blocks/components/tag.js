import { type as tagtype, grouptype as taggroup } from "../../components/tag/tag";

export default [
    {
        id: 'Tag',
        label: `<figure style="margin: 5px;">
        <svg viewBox="0 0 24 24"><path fill="currentColor" d="m21.41 11.58l-9-9A2 2 0 0 0 11 2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 .59 1.42l9 9A2 2 0 0 0 13 22a2 2 0 0 0 1.41-.59l7-7A2 2 0 0 0 22 13a2 2 0 0 0-.59-1.42M13 20l-9-9V4h7l9 9M6.5 5A1.5 1.5 0 1 1 5 6.5A1.5 1.5 0 0 1 6.5 5Z"/></svg>
        <figcaption>Button</figcaption></figure>`,
        content: { type: tagtype },
        category: 'Grouping',
    },
    {
        id: 'Tag Group',
        label: `<figure style="margin: 5px;">
        <svg viewBox="0 0 24 24"><path fill="currentColor" d="M6.5 10C7.3 10 8 9.3 8 8.5S7.3 7 6.5 7S5 7.7 5 8.5S5.7 10 6.5 10M9 6l7 7l-5 5l-7-7V6h5m0-2H4c-1.1 0-2 .9-2 2v5c0 .6.2 1.1.6 1.4l7 7c.3.4.8.6 1.4.6s1.1-.2 1.4-.6l5-5c.4-.4.6-.9.6-1.4c0-.6-.2-1.1-.6-1.4l-7-7C10.1 4.2 9.6 4 9 4m4.5 1.7l1-1l6.9 6.9c.4.4.6.9.6 1.4s-.2 1.1-.6 1.4L16 19.8l-1-1l5.7-5.8l-7.2-7.3Z"/></svg>
        <figcaption>Button Group</figcaption></figure>`,
        content: { type: taggroup },
        category: 'Grouping',
    },
];