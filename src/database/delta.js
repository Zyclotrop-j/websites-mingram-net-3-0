const genDiff = (path, first, second) => ({
    path, firstType: getType(first), secondType: getType(second), firstValue: first, secondValue: second,
});

const isTypeNull = o => o === null ? 'null' : undefined;
const isTypePrimitive = o => [
    "number",
    "bigint",
    "string",
    "symbol",
    "boolean",
    "undefined",
].includes(typeof o) ? typeof o : undefined;
const isTypeArray = o => Array.isArray(o) ? 'Array': undefined;
const hasEnumerableProperties = o => {
    try {
        const keys = Object.keys(o);
        return Array.isArray(keys) && keys.length >= 0 ? 'Object' : undefined;
    } catch(e) {
        return undefined;
    }
}

const getType = o => isTypeNull(o) ?? isTypePrimitive(o) ?? isTypeArray(o) ?? hasEnumerableProperties(o) ?? 'Other';

function* diffOnPath(firstObj, secondObj, path = []) {
    if (getType(firstObj) === getType(secondObj)) {
        switch (getType(firstObj)) {
            case 'Array':
                for (let idx = 0; idx < Math.max(firstObj.length, secondObj.length); idx++) {
                    yield* diffOnPath(firstObj[idx], secondObj[idx], [...path, idx]);
                }
                break;
            case 'Object':
                for(let key of new Set([
                    ...Object.getOwnPropertyNames(firstObj),
                    ...Object.getOwnPropertyNames(secondObj),
                    ...Object.getOwnPropertySymbols(firstObj),
                    ...Object.getOwnPropertySymbols(secondObj),
                ])) {
                    yield* diffOnPath(firstObj[key], secondObj[key], [...path, key]);  
                }
                break;
            default:
                if(firstObj !== secondObj) yield genDiff(path, firstObj, secondObj);
                break;
        }
    } else {
        yield genDiff(path, firstObj, secondObj);
    }
}
  
export default (first, second) => {
    return [...diffOnPath(first, second)];
};