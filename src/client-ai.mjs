import * as Comlink from "comlink";

const logs = [];
globalThis.console.log = (...args) => logs.push(['log', args]);
globalThis.console.warn = (...args) => logs.push(['warn', args]);
globalThis.console.error = (...args) => logs.push(['error', args]);
globalThis.console.info = (...args) => logs.push(['info', args]);

const worker = new Worker("client-ai-worker.js", {
    type: 'module'
});
const remoteobj = Comlink.wrap(worker);
const obj = {
    get logs() {
        return remoteobj.logs.then(rlogs => [...rlogs, ...logs])
    },
    get ready() {
        return remoteobj.ready;
    },
    subscribe: async function remoteFunction(cb) {
        console.log('SUBSCRIBE REQUESTED in iFrame', worker)
        await remoteobj.subscribe(Comlink.proxy((...args) => cb(...args)));
    },
    run: function(...args) {
        return remoteobj.run(...args);
    },
    shutdown: () => remoteobj.shutdown(),
    status: {
        get classify() {
            return remoteobj.status.classify;
        },
        get textgen() {
            return remoteobj.status.textgen;
        },
        get t2tgen() {
            return remoteobj.status.t2tgen;
        },
        get fillmask() {
            return remoteobj.status.fillmask;
        },
        get qa() {
            return remoteobj.status.qa;
        },
        get imagetotext() {
            return remoteobj.status.imagetotext;
        },
    },
};
Comlink.expose(obj, Comlink.windowEndpoint(self.parent));