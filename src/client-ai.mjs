import ProcessConcurrently from 'iterate-async';
import * as Comlink from "comlink";

const logs = [];
globalThis.console.log = (...args) => logs.push(['log', args]);
globalThis.console.warn = (...args) => logs.push(['warn', args]);
globalThis.console.error = (...args) => logs.push(['error', args]);
globalThis.console.info = (...args) => logs.push(['info', args]);

const subscriptions = [];
const fns = {};
const obj = {
    logs,
    ready: false,
    subscribe: async function remoteFunction(cb) {
        subscriptions.push(cb);
    },
    run: function(what, ...args) {
        return fns[what](...args);
    },
    shutdown: () => done.then(() => Promise.all(fns.map(fn => fn.dispose()))),
    status: {
        classify: false,
        textgen: false,
        t2tgen: false,
        fillmask: false,
        qa: false,
        imagetotext: false,
    },
};
const share = (...msgs) => Promise.all(subscriptions.map(fn => fn(...msgs)));
Comlink.expose(obj, Comlink.windowEndpoint(self.parent));

// https://huggingface.co/docs/transformers.js/installation

const load = async ({pipeline, meta}, name, jsname, model) => {
    await share(`LOAD ${name}`, undefined, { idx: meta.idx, done: meta.done, active: meta.active, waiting: meta.waiting, total: meta.total });
    fns[jsname] = await pipeline(name, model);
    obj.status[jsname] = true;
    const {active, waiting} = meta;
    await share(`LOADED ${name} ${model ?? ''}`, `${name} ai is ready`, { idx: meta.idx, done: meta.done + 1, active: waiting > 0 ? active : (active - 1), waiting: waiting > 0 ? (waiting - 1) : waiting, total: meta.total });
}

const main = async () => {
    await share('START');
    const { pipeline } = await import('@xenova/transformers');
    await share('LOADING');

    await ProcessConcurrently((item, { pipeline }, meta) => load({pipeline, meta}, ...item), [
        // see https://github.com/xenova/transformers.js/blob/d279ec3c86882d8330c4027a58428e203a8a2820/src/pipelines.js#L1244

        //['sentiment-analysis', 'classify'],
        ['text-generation', 'textgen'], // uses gtp2 by default
        ['text-generation', 'textgen2', 'Xenova/gpt-neo-125M'],
        ['text2text-generation', 't2tgen'],
        //['fill-mask', 'fillmask'],
        //['question-answering', 'qa'],
        //['image-to-text', 'imagetotext'],
    ], {
        concurrency: 3,
        commonArgs: { pipeline }
    });

    await share('LOADED');
    obj.ready = true;
    await share('DONE');
}

const done = main();