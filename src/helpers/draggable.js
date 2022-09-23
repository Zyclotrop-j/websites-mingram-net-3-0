
export default (query) => {
    if(query?.trim?.() === '*') {
        return '.onechild:empty,*:not(.onechild)';
    }
    return query;
}
