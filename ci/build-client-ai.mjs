import esbuild from "esbuild";
import fs from 'fs/promises';

export default async () => {
    const metafile1 = await esbuild.build({
        entryPoints: ['src/client-ai.mjs'],
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
    const metafile2 = await esbuild.build({
        entryPoints: ['src/client-ai-worker.mjs'],
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

    await fs.copyFile('src/client-ai.html', 'build/client-ai.html');
    const file = await fs.readFile('build/client-ai.html')
    fs.writeFile('build/client-ai.html', `${file}`.replaceAll("<SRC>", '/client-ai.js'));

    return {
        metafile1,
        metafile2,
    };
};
