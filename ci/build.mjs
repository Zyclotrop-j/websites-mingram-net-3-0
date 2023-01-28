import fs from 'node:fs/promises';
import esbuild from "esbuild";
import { sassPlugin } from 'esbuild-sass-plugin'
import sveltePlugin from "esbuild-svelte";
import buildSW from "./build-sw.mjs";

const meta1 = await esbuild.build({
    entryPoints: ['src/index.js'],
    bundle: true,
    loader: {
        ".woff": 'file',
        ".ttf": 'file',
        ".eot": 'file',
        ".svg": 'text',
        ".html": 'file',
    },
    splitting: true,
    format: 'esm',
    jsx: 'automatic',
    outdir: 'build',
    //outfile: 'build/index.js',
    plugins: [
      sassPlugin({
        //type: ["css", "bootstrap/**"]
      }),
      sveltePlugin()
    ],
    metafile: true,
}).catch((e) => {
    console.error(e);
    process.exit(1);
});

await fs.copyFile('src/scss/layer.css', 'build/layer.css');
await fs.copyFile('node_modules/leaflet/dist/leaflet.css', 'build/leaflet.css');
await fs.cp('node_modules/leaflet/dist/images', 'build/images', { recursive: true });


const meta2 = await esbuild.build({
    entryPoints: ['src/website.js'],
    bundle: true,
    jsx: 'automatic',
    splitting: true,
    format: 'esm',
    outdir: 'build',
    // outfile: 'build/website.js',
    plugins: [sassPlugin({
        //type: ["css", "bootstrap/**"]
      })],
      metafile: true,
}).catch((e) => {
    console.error(e);
    process.exit(1);
});

await fs.writeFile('build/meta.index.json', JSON.stringify(meta1.metafile));
await fs.writeFile('build/meta.website.json', JSON.stringify(meta2.metafile));

await buildSW({
  index: meta1,
  website: meta2,
});
