import * as Comlink from "comlink";

async function main(editor, toast) {
    editor.runCommand('status:start', { component: 'ai-loader', msg: `Assistent initialising` });
    const readyProm = new Promise(async res => {
        const ifr = document.createElement("iframe");
        await new Promise((resolve) => {
            const q = new URL(window.location);
            q.port = '3002';
            ifr['allow-scripts'] = true;
            //ifr['allow-same-origin'] = true;
            //ifr['allow-scripts'] = true;
            ifr.onload = resolve;
            ifr.src = `${q.origin}/client-ai.html`;
            ifr.style.display = 'none';
            ifr.hidden = true;
            ifr.ariaHidden = true;
            document.body.appendChild(ifr);
        });
        const obj = Comlink.wrap(Comlink.windowEndpoint(ifr.contentWindow));
        await obj.subscribe(Comlink.proxy(async (msg, usermsg, stats) => {
            console.info(msg, stats);
            if(stats && (stats.waiting > 0 || stats.active > 0)) {
                editor.runCommand('status:start', { component: 'ai-loader', msg: `Assistent initialising (${stats.waiting} / ${stats.active} / ${stats.done})` });
            }
            if(usermsg) {
                toast({ text: `Companion: ${usermsg}` });
            }
            if(msg === "DONE") {
                res(obj);
                editor.runCommand('status:end', { component: 'ai-loader' });
            }
        }));
    });
    const commands = editor.Commands;
    commands.add('ai:classify', async (editor, sender, options = { args: [] }) => {
        const res = await (await readyProm).run('classify', ...(options?.args ?? []));
        return res;
    });
    commands.add('ai:textgen', async (editor, sender, options = { args: [] }) => {
        await readyProm;
        const res = await (await readyProm).run('textgen', ...(options?.args ?? []));
        return res;
    });
    commands.add('ai:t2tgen', async (editor, sender, options = { args: [] }) => {
        await readyProm;
        const res = await (await readyProm).run('t2tgen', ...(options?.args ?? []));
        return res;
    });
    commands.add('ai:textgen2', async (editor, sender, options = { args: [] }) => {
        await readyProm;
        const res = await (await readyProm).run('textgen2', ...(options?.args ?? []));
        return res;
    });
    commands.add('ai:fillmask', async (editor, sender, options = { args: [] }) => {
        await readyProm;
        const res = await (await readyProm).run('fillmask', ...(options?.args ?? []));
        return res;
    });
    commands.add('ai:qa', async (editor, sender, options = { args: [] }) => {
        await readyProm;
        const res = await (await readyProm).run('qa', ...(options?.args ?? []));
        return res;
    });
    commands.add('ai:imagetotext', async (editor, sender, options = { args: [] }) => {
        await readyProm;
        const res = await (await readyProm).run('imagetotext', ...(options?.args ?? []));
        return res;
    });
    commands.add('ai:chat', async (editor, sender, options = { args: [] }) => {
        await readyProm;
        const res = await (await readyProm).run('chat', ...(options?.args ?? []));
        return res;
    });
    
}


export default (editor, { toast }) => {
    main(editor, toast);
}