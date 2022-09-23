import typography, {
    htype,
    pType,
} from "../../components/typography/typography";

export default [
    {
        id: 'Text',
        label: `<figure style="margin: 5px;">
        <svg  viewBox="0 0 24 24"><path fill="currentColor" d="M2.5 5.5C2.5 6.33 3.17 7 4 7h3.5v10.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V7H14c.83 0 1.5-.67 1.5-1.5S14.83 4 14 4H4c-.83 0-1.5.67-1.5 1.5zM20 9h-6c-.83 0-1.5.67-1.5 1.5S13.17 12 14 12h1.5v5.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V12H20c.83 0 1.5-.67 1.5-1.5S20.83 9 20 9z"/></svg>
        <figcaption>Text</figcaption></figure>`,
        content: { type: 'text', content: 'Lorem Ipsum' },
        category: 'Typography',
    },
    {
        id: `Typography-${htype}`,
        label: `<figure style="margin: 5px;">
        <svg  viewBox="0 0 24 24"><path fill="currentColor" d="M18 20V4h-3v6H9V4H6v16h3v-7h6v7z"/></svg>
        <figcaption>Heading</figcaption></figure>
        `,
        content: { type: htype },
        category: 'Typography',
    },
    {
        id: `Typography-${pType}`,
        label: `<figure style="margin: 5px;">
        <svg  viewBox="0 0 24 24"><path fill="currentColor" d="M13 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4h-2v6H9V4h4m0 6a2 2 0 0 0 2-2a2 2 0 0 0-2-2h-2v4h2Z"/></svg>
        <figcaption>Paragraph</figcaption></figure>`,
        content: { type: pType },
        category: 'Typography',
    },
];