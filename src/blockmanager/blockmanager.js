
export default function blockManager(editor) {
    const div = document.createElement("div");

    (async () => {
        const {default: BlockManagerApp} = await import('./blockmanager.svelte');
        const app = new BlockManagerApp({ target: div, props: {
            editor,
            selfdiv: div,
            searchmin: 2,
            openitemmin: 10,
        } });
    })();

    return div;

}