const uuidLength = '00000000-0000-0000-0000-000000000000'.length;
const projectLength = uuidLength * 3 + 3;

export function getSchemas() {
    const assetSchema = {
        title: 'asset schema',
        version: 1,
        primaryKey: 'name',
        type: 'object',
        properties: {
            name: {
                type: 'string',
                maxLength: uuidLength,
            },
            extension: { type: 'string' },
            'meta__original_name': { type: 'string', maxLength: 50 },
            lastModified: { type: 'integer' },
            src: { type: 'string' },
            subtype: { type: 'string', maxLength: 50 },
            type: { type: 'string', maxLength: 50 },
            data: {
                type: 'object',
            },
            project: { type: 'string', maxLength: projectLength },
        },
        indexes: [
            'subtype',
            'type',
            ['subtype', 'type'],
            'meta__original_name',
            'project',
        ],
        required: ['name', 'data', 'project'],
    };
    const styleSchema = {
        title: 'style schema',
        version: 1,
        primaryKey: 'project',
        type: 'object',
        properties: {
            data: {
                type: 'object',
            },
            project: { type: 'string', maxLength: projectLength },
        },
        required: ['data', 'project'],
    };
    const pageSchema = {
        title: 'page schema',
        version: 1,
        primaryKey: 'id',
        type: 'object',
        properties: {
            id: {
                type: 'string',
                maxLength: uuidLength,
            },
            name: { type: 'string', maxLength: 500 },
            path: { type: 'string', maxLength: 2000 },
            title: { type: 'string', maxLength: 500 },
            data: {
                type: 'object',
            },
            project: { type: 'string', maxLength: projectLength },
        },
        indexes: [
            'name',
            'path',
            'title',
            'project',
        ],
        required: ['id', 'data', 'project'],
    };
    const componentSchema = {
        title: 'component schema',
        version: 1,
        primaryKey: 'c_id',
        type: 'object',
        properties: {
            c_id: { type: 'string', maxLength: uuidLength, minLength: uuidLength },
            idx: { type: 'integer' },
            type: { type: 'string', maxLength: 100, minLength: 1 },
            data: {
                type: 'object',
            },
            project: { type: 'string', maxLength: projectLength },
            parentId: { type: 'string', maxLength: uuidLength, minLength: uuidLength },
        },
        indexes: [
            'type',
            'project',
        ],
        required: ['c_id', 'type', 'data', 'project', 'idx'],
    };
    return { assetSchema, styleSchema, pageSchema, componentSchema };
}
