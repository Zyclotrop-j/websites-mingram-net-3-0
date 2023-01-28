import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'node:fs/promises';
import syncfs from 'node:fs';

import Fastify from 'fastify';
import cors from '@fastify/cors'
import uploader from 'huge-uploader-nodejs';
import files from '@fastify/static';
import mime from 'mime-types';
import { ExifTool } from 'exiftool-vendored';
import LRU from 'lru-cache';

import handleError from './handleError.mjs';
import { whitelisted } from './whitelisted.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
async function processExif({ targetPath, headers, meta }) {
    const exiftool = new ExifTool({ taskTimeoutMillis: 6000 });
    const tags = await exiftool.read(targetPath);
    const xmeta = {
        ...tags,
        ...meta,
    };
    await fs.writeFile(`${targetPath}.info.json`, JSON.stringify(Object.fromEntries(Object.entries(xmeta).filter(([key, value]) => whitelisted.includes(key) && typeof value === 'string').map(([key, value]) => [key, value]))))
    await exiftool.end()
}

const cache = new LRU({
    max: 500,
})

const fastify = Fastify({ logger: true });

fastify.register(files, {
    root: join(__dirname, 'files'),
    prefix: '/assets/',
    prefixAvoidTrailingSlash: true,
    schemaHide: false,
    index: false,
    list: true,
    extensions: Object.values(mime.extensions).flat(),
    setHeaders: (res, path, stats) => {
        let c = cache.get(path);
        if(!c) {
            c = JSON.parse(syncfs.readFileSync(`${path}.info.json`));
            cache.set(path, c);
        }
        Object.entries(c).forEach(([k, v]) => {
            if(k.startsWith('meta-') || [
                'uploader-file-id',
                'imagesize',
                ...`filename,filetype,original_name,name,meta-name,meta-original_name,meta-relativepath,meta-type,meta-width,meta-height`.split(',')
            ].includes(k)) {
                res.setHeader(k, encodeURIComponent(`${v}`.trim()));
            }
        })
        res.setHeader('atimeMs', `${stats.atimeMs}`);
        res.setHeader('mtimeMs', `${stats.mtimeMs}`);
        res.setHeader('ctimeMs', `${stats.ctimeMs}`);
        res.setHeader('birthtime', `${stats.birthtime}`);
    }
  });
fastify.register(cors, { 
    allowedHeaders: `accept,content-type,uploader-chunk-number,uploader-chunks-total,uploader-file-id,filename,filetype,original_name,name,meta-name,meta-original_name,meta-relativepath,meta-type,meta-width,meta-height`,
    exposedHeaders: `filename,filetype,original_name,name,meta-name,meta-original_name,meta-relativepath,meta-type,meta-width,meta-height,imagesize,uploader-file-id,atimeMs,mtimeMs,ctimeMs,birthtime`,
    // put your options here
});

const noop = (_, __, done) => done(null);

fastify.addSchema({
    $id: 'headers',
    type: 'object',
    additionalProperties: true,
    properties: {
        filename: { type: 'string', format: 'uuid' },
        'meta-name': { type: 'string', format: 'uuid' },
        name: { type: 'string', format: 'uuid' },
        'meta-original_name': { type: 'string' },
        filetype: { type: 'string' },
        'meta-type': { type: 'string' },
    }
  })
fastify.all('/upload/', {
    schema: {
        headers: { $ref: 'headers#' }
    }
}, async (req, res) => {
    req.log.info(`initiating upload`);
    try {
        const assembleChunks = await uploader(req.raw, join(__dirname, 'tmp'), 100, 10);
        if (assembleChunks) {
            req.log.info(`assembling chunks`);
            const { filePath } = await assembleChunks();
            const extension = mime.extension(req.headers['filetype']) || mime.extension(req.headers['meta-original_name']);
            const target = `${req.headers['filename']}${extension ? `.${extension}` : ''}`;
            const targetPath = join(__dirname, 'files', target);
            await fs.rename(filePath, targetPath);
            req.log.info(`chunks written`);
            const headers = req.headers;
            const xmeta = {
                ...headers,
                extension: extension,
                mime: mime.lookup(headers['filetype']) || mime.lookup(headers['meta-original_name']) || '',
                charset: mime.charset(headers['filetype']) || mime.charset(headers['meta-original_name']) || '',
            }
            const metadata = Object.fromEntries(Object.entries(xmeta).filter(([key, value]) => whitelisted.includes(key) && typeof value === 'string').map(([key, value]) => [key, value]));
            await fs.writeFile(`${targetPath}.info.json`, JSON.stringify(metadata));
            cache.set(targetPath, metadata)
            req.log.info(`meta written`);
            processExif({
                targetPath,
                headers: req.headers,
                meta: xmeta
            });
            res.header('Location', `/assets/${target}`);
        }
        req.log.info(`upload finished`);
        res.code(204);
        return '';
    } catch(err) {
        return handleError({ maxFileSize: 100, res, req, err })
    }
});
// cleanup: find /var/www/tmp -type d -mtime +1 -delete
fastify.listen(3003, (err) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
});