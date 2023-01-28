import {injectManifest, copyWorkboxLibraries} from 'workbox-build';
import esbuild from "esbuild";
import fs from 'fs/promises';

export default async () => {
    await esbuild.build({
        entryPoints: ['src/sw.js'],
        bundle: true,
        splitting: true,
        format: 'esm',
        jsx: 'automatic',
        outdir: '.tmp',
        metafile: true,
    }).catch((e) => {
        console.error(e);
        process.exit(1);
    });
    copyWorkboxLibraries('build/');
    const {count, size, warnings} = await injectManifest({
        // dontCacheBustURLsMatching: [new RegExp('...')],
        globDirectory: 'build/',
        globPatterns: [
            '**/*.{html,css,woff2,png,svg,jpg,js}'
        ],
        // maximumFileSizeToCacheInBytes: ...,
        swDest: 'build/sw.js',
        swSrc: '.tmp/sw.js',
    });

    return {count, size, warnings};
};
