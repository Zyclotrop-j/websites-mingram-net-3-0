const memoize = function(factory, ctx) {
    const cache = {};
    return function(key) {
        if (!(key in cache)) {
            cache[key] = factory.call(ctx, key);
        }
        return cache[key];
    };
};

export const colorToRGBA = (function() {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 1;
    const ctx = canvas.getContext('2d');

    return memoize(function(col, name) {
        ctx.clearRect(0, 0, 1, 1);
        ctx.fillStyle = '#000';
        ctx.fillStyle = col;
        const computed = ctx.fillStyle;
        ctx.fillStyle = '#fff';
        ctx.fillStyle = col;
        if (computed !== ctx.fillStyle) {
            console.error(`Invalid color ${col} (${name})`); // invalid color
        }
        ctx.fillRect(0, 0, 1, 1);
        return [ ...ctx.getImageData(0, 0, 1, 1).data ];
    });
})();