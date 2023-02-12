import esbuild from "esbuild";
import fs from 'fs/promises';

export default async () => {
    const metadata = await esbuild.build({
        entryPoints: ['src/rx-worker.mjs'],
        bundle: true,
        splitting: true,
        format: 'esm',
        jsx: 'automatic',
        outdir: 'build',
        metafile: true,
    }).catch((e) => {
        console.error(e);
        process.exit(1);
    });
    return metadata;
};
