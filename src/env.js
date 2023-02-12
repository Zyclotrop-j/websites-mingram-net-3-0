window.global = window;
window.process = {
    env: { DEBUG: undefined },
    // polyfill, because streams is using this and crashes otherwise
    nextTick: (cb, ...args) => Promise.resolve().then(() => cb(...args))
};

