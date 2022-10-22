import { typeForm, typeInput, typeTextarea, typeButton, typeLabel } from "../../components/form/form";

export default [
    {
        id: 'Form',
        label: `<figure style="margin: 5px;">
        <svg viewBox="0 0 1024 1024"><path fill="currentColor" d="M904 512h-56c-4.4 0-8 3.6-8 8v320H184V184h320c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V520c0-4.4-3.6-8-8-8z"/><path fill="currentColor" d="M355.9 534.9L354 653.8c-.1 8.9 7.1 16.2 16 16.2h.4l118-2.9c2-.1 4-.9 5.4-2.3l415.9-415c3.1-3.1 3.1-8.2 0-11.3L785.4 114.3c-1.6-1.6-3.6-2.3-5.7-2.3s-4.1.8-5.7 2.3l-415.8 415a8.3 8.3 0 0 0-2.3 5.6zm63.5 23.6L779.7 199l45.2 45.1l-360.5 359.7l-45.7 1.1l.7-46.4z"/></svg>
        <figcaption>Form</figcaption></figure>`,
        content: { type: typeForm },
        category: 'Form',
    },
    {
        id: 'Input',
        label: `<figure style="margin: 5px;">
        <svg viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 20h-1a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h1M5 4h1a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H5m8.1-12.1h6.8A2.18 2.18 0 0 1 22 10v4a2.11 2.11 0 0 1-2.1 2.1h-6.8m-8.3 0h-.7A2.18 2.18 0 0 1 2 14v-4a2.18 2.18 0 0 1 2.1-2.1h.7"/></svg>
        <figcaption>Input</figcaption></figure>`,
        content: { type: typeInput },
        category: 'Form',
    },
    {
        id: 'Textarea',
        label: `<figure style="margin: 5px;">
        <svg viewBox="0 0 16 16"><path fill="currentColor" d="M0 4.5A2.5 2.5 0 0 1 2.5 2h11A2.5 2.5 0 0 1 16 4.5v7a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 0 11.5v-7zM2.5 3A1.5 1.5 0 0 0 1 4.5v7A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 13.5 3h-11zm10.854 4.646a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708l3-3a.5.5 0 0 1 .708 0zm0 2.5a.5.5 0 0 1 0 .708l-.5.5a.5.5 0 0 1-.708-.708l.5-.5a.5.5 0 0 1 .708 0z"/></svg>
        <figcaption>Textarea</figcaption></figure>`,
        content: { type: typeTextarea },
        category: 'Form',
    },
    {
        id: 'SubmitResetButton',
        label: `<figure style="margin: 5px;">
        <svg viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M20 13V5.749a.6.6 0 0 0-.176-.425l-3.148-3.148A.6.6 0 0 0 16.252 2H4.6a.6.6 0 0 0-.6.6v18.8a.6.6 0 0 0 .6.6H14"/><path d="M16 2v3.4a.6.6 0 0 0 .6.6H20m-4 13h6m0 0l-3-3m3 3l-3 3"/></g></svg>
        <figcaption>Send button</figcaption></figure>`,
        content: { type: typeButton },
        category: 'Form',
    },
    {
        id: 'Label',
        label: `<figure style="margin: 5px;">
        <svg viewBox="0 0 32 32"><path fill="currentColor" d="M23 13h-5v2h5v2h-4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h6v-8a2.002 2.002 0 0 0-2-2zm0 8h-4v-2h4zM13 9H9a2.002 2.002 0 0 0-2 2v12h2v-5h4v5h2V11a2.002 2.002 0 0 0-2-2zm-4 7v-5h4v5z"/><path fill="currentColor" d="M28 28H4a2.002 2.002 0 0 1-2-2V6a2.002 2.002 0 0 1 2-2h24a2.002 2.002 0 0 1 2 2v20a2.002 2.002 0 0 1-2 2ZM4 6v20h24V6Z"/></svg>
        <figcaption>Label</figcaption></figure>`,
        content: { type: typeLabel },
        category: 'Form',
    },
];