import cta, { type as ctatype, grouptype as ctagroup } from "../../components/cta/cta";

export default [
    {
        id: 'Button',
        label: `<figure style="margin: 5px;">
        <svg  viewBox="0 0 15 15"><path fill="currentColor" fill-rule="evenodd" d="M2 5h11a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1ZM0 6a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6Zm4.5.75a.75.75 0 1 0 0 1.5a.75.75 0 0 0 0-1.5Zm2.25.75a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0Zm3.75-.75a.75.75 0 1 0 0 1.5a.75.75 0 0 0 0-1.5Z" clip-rule="evenodd"/></svg>
        <figcaption>Button</figcaption></figure>`,
        content: { type: ctatype },
        category: 'Interactive',
    },
    {
        id: 'Button Group',
        label: `<figure style="margin: 5px;">
        <svg width="32" height="32" viewBox="0 0 1024 1024"><path fill="currentColor" d="M912 820.1V203.9c28-9.9 48-36.6 48-67.9c0-39.8-32.2-72-72-72c-31.3 0-58 20-67.9 48H203.9C194 84 167.3 64 136 64c-39.8 0-72 32.2-72 72c0 31.3 20 58 48 67.9v616.2C84 830 64 856.7 64 888c0 39.8 32.2 72 72 72c31.3 0 58-20 67.9-48h616.2c9.9 28 36.6 48 67.9 48c39.8 0 72-32.2 72-72c0-31.3-20-58-48-67.9zM888 112c13.3 0 24 10.7 24 24s-10.7 24-24 24s-24-10.7-24-24s10.7-24 24-24zM136 912c-13.3 0-24-10.7-24-24s10.7-24 24-24s24 10.7 24 24s-10.7 24-24 24zm0-752c-13.3 0-24-10.7-24-24s10.7-24 24-24s24 10.7 24 24s-10.7 24-24 24zm704 680H184V184h656v656zm48 72c-13.3 0-24-10.7-24-24s10.7-24 24-24s24 10.7 24 24s-10.7 24-24 24z"/><path fill="currentColor" d="M288 474h448c8.8 0 16-7.2 16-16V282c0-8.8-7.2-16-16-16H288c-8.8 0-16 7.2-16 16v176c0 8.8 7.2 16 16 16zm56-136h336v64H344v-64zm-56 420h448c8.8 0 16-7.2 16-16V566c0-8.8-7.2-16-16-16H288c-8.8 0-16 7.2-16 16v176c0 8.8 7.2 16 16 16zm56-136h336v64H344v-64z"/></svg>
        <figcaption>Button Group</figcaption></figure>`,
        content: { type: ctagroup },
        category: 'Interactive',
    },
];