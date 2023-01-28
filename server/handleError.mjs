export default function handleError({ maxFileSize, res, req, err }) {
    req.log.error(err);

    if (err?.message === 'Missing header(s)') {
        res.code(400);
        return ('Missing uploader-* header');
        
    }

    if (err?.message === 'Missing Content-Type') {
        res.code(400);
        return ('Missing Content-Type');
        
    }

    if (err?.message.includes('Unsupported content type')) {
        res.code(400);
        return ('Unsupported content type');
        
    }

    if (err?.message === 'Chunk is out of range') {
        res.code(400);
        return ('Chunk number must be between 0 and total chunks - 1 (0 indexed)');
        
    }

    if (err?.message === 'File is above size limit') {
        res.code(413);
        return (`File is too large. Max fileSize is: ${maxFileSize}MB`);
        
    }

    if (err?.message === 'Chunk is above size limit') {
        res.code(413);
        return (`Chunk is too large. Max chunkSize is: ${maxChunkSize}MB`);
        
    }

    // this error is triggered if a chunk with uploader-chunk-number header != 0
    // is sent and there is no corresponding temp dir.
    // It means that the upload dir has been deleted in the meantime.
    // Although uploads should be resumable, you can't keep partial uploads for days on your server
    if (err && err?.message === 'Upload has expired') {
        res.code(410);
        return (err?.message);
        
    }

    // other FS errors
    res.code(500, 'Internal Server Error'); // potentially saturated disk
    return 'Internal Server Error';
}