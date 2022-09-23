const type = 'grid-12';
export default type;

class Grid12 extends HTMLElement {
    constructor() {
        super();
    }
}

if ('customElements' in window) {
    customElements.define(type, Grid12);
}
class GridItem extends HTMLElement {
    constructor() {
        super();
    }
}
customElements.define(`grid-item`, GridItem);
