import query, {
    type as mediaquerytype,
    type2 as jsquerytype,
} from "../../components/query/query";

export default [
    {
        id: `${mediaquerytype}-query`,
        label: `<figure style="margin: 5px;">
        <svg viewBox="0 0 32 32"><path fill="currentColor" d="M10 30H4a2 2 0 0 1-2-2V16a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2ZM4 16v12h6V16Z"/><path fill="currentColor" d="M28 4H6a2 2 0 0 0-2 2v6h2V6h22v14H14v2h2v4h-2v2h9v-2h-5v-4h10a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Z"/></svg>
        <figcaption>Media Query</figcaption></figure>`,
        content: { type: mediaquerytype },
        category: 'Query'
    },
    {
        id: `${jsquerytype}-query`,
        label: `<figure style="margin: 5px;">
        <svg viewBox="0 0 16 16"><path fill="currentColor" d="M5 1a2 2 0 0 0-2 2v3.5a.5.5 0 0 0 1 0V3a1 1 0 0 1 1-1h3v2.5A1.5 1.5 0 0 0 9.5 6H12v7a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-2H3v2a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V5.414a1.5 1.5 0 0 0-.44-1.06L9.647 1.439A1.5 1.5 0 0 0 8.586 1H5Zm6.793 4H9.5a.5.5 0 0 1-.5-.5V2.207L11.793 5ZM6.479 6.356a.5.5 0 0 0-.926-.08L4.19 9H2.5a.5.5 0 0 0 0 1h2a.5.5 0 0 0 .447-.276l.936-1.873l1.138 3.793a.5.5 0 0 0 .879.156L9.25 10h1.25a.5.5 0 0 0 0-1H9a.5.5 0 0 0-.4.2l-.906 1.208L6.48 6.356Z"/></svg>
        <figcaption>Device Query</figcaption></figure>`,
        content: { type: jsquerytype },
        category: 'Query'
    },
];