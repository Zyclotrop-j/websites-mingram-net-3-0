<div class="screenshot" bind:this={container}>
    
</div>

<style>
</style>

<script>
    import html2canvas from 'html2canvas';

    export let page;
    //export let body;
    let container;

    const wait = (ms) => new Promise(res => setTimeout(res, ms));

    const cache = [];

    $: (async () => {
        if(!page) return;
        const html = page.getMainComponent().toHTML()

        if(cache[0] === html) return;
        cache[0] = html;

        const iframe = document.createElement('iframe');
        iframe.src = 'about:blank';
        

        await new Promise((resolve, reject) => {
            iframe.onload = async () => {
                try {
                    iframe.contentDocument.body.classList.add('top');
                    iframe.contentDocument.head.innerHTML = `<link rel="stylesheet" href="/website.css" />
                    <style>${
                        page.getMainFrame().getStyles().map(q => q.toCSS()).join('\n')
                    }</style>`;
                    await Promise.all([...iframe.contentDocument.head.querySelectorAll('link[rel=stylesheet]')].map(dom => {
                        return new Promise((res, rej) => {
                            dom.onload = () => {
                                dom.onload = null;
                                dom.onerror = null;
                                res();
                            };
                            dom.onerror = (e) => {
                                dom.onload = null;
                                dom.onerror = null;
                                rej(e);
                            };
                        });
                    }));
                    const script = iframe.contentDocument.createElement('script');
                    await new Promise((res, rej) => {
                        script.onload = () => {
                            script.onload = null;
                            script.onerror = null;
                            res();
                        }
                        script.onerror = (e) => {
                            script.onload = null;
                            script.onerror = null;
                            rej(e);
                        }
                        script.src = "/website.js";
                        script.type = "module";
                        iframe.contentDocument.body.appendChild(script);
                        iframe.contentDocument.body.innerHTML = html;
                    });
                    resolve();
                } catch(e) {
                    reject(e);
                }
            }
            document.body.appendChild(iframe);
        });
        iframe.classList.add('previewframe');
        const canvas = await html2canvas(iframe.contentDocument.body);
        document.body.removeChild(iframe);
        if(!container) return;
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        container.appendChild(canvas)
    })()
    
</script>