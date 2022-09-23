export const type =  'c-list';
export const listitem = `${type}-item`;
export const title = `${listitem}-title`;
export const content = `${listitem}-content`;
export const description = `${listitem}-description`;
export const image = `${listitem}-image`;


class Type extends HTMLElement {
    constructor() {
        super();
    }
}
customElements.define(type, Type);
class Item extends HTMLElement {
    constructor() {
        super();
    }
    // support link here?
}
customElements.define(listitem, Item);
class Title extends HTMLElement {
    constructor() {
        super();
    }
}
customElements.define(title, Title);
class Content extends HTMLElement {
    constructor() {
        super();
    }
}
customElements.define(content, Content);
class Description extends HTMLElement {
    constructor() {
        super();
    }
}
customElements.define(description, Description);
class Image extends HTMLElement {
    constructor() {
        super();
    }
}
customElements.define(image, Image);
