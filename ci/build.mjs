import fs from 'node:fs/promises';
import esbuild from "esbuild";
import { sassPlugin } from 'esbuild-sass-plugin'
import sveltePlugin from "esbuild-svelte";

await esbuild.build({
    entryPoints: ['src/app.js'],
    bundle: true,
    loader: {
        ".woff": 'file',
        ".ttf": 'file',
        ".eot": 'file',
        ".svg": 'text',
        ".html": 'file',
    },
    jsx: 'automatic',
    outfile: 'build/index.js',
    plugins: [
      sassPlugin({
        //type: ["css", "bootstrap/**"]
      }),
      sveltePlugin()
    ]
}).catch((e) => {
    console.error(e);
    process.exit(1);
});

await fs.copyFile('src/scss/layer.css', 'build/layer.css');
await fs.copyFile('node_modules/leaflet/dist/leaflet.css', 'build/leaflet.css');
await fs.cp('node_modules/leaflet/dist/images', 'build/images', { recursive: true });


await esbuild.build({
    entryPoints: ['src/website.js'],
    bundle: true,
    jsx: 'automatic',
    outfile: 'build/website.js',
    plugins: [sassPlugin({
        //type: ["css", "bootstrap/**"]
      })]
}).catch((e) => {
    console.error(e);
    process.exit(1);
});
