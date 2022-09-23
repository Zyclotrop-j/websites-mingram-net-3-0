export const type =  'c-card';
export const header = `${type}-header`;
export const content = `${type}-content`;
export const image = `${type}-image`;
export const footer = `${type}-footer`;
export const title = `${header}-title`;
export const icon = `${header}-icon`;
export const footeritem = `${footer}-item`;

class Type extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        if(this.getAttribute('aria-label') || this.getAttribute('aria-labelledby') || this.textContent) {
            this.setAttribute('aria-role', 'region')
        }
        this.dataset.role = 'section';
    }
}
customElements.define(type, Type);

class Header extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        if(!this.closest('article,aside,main,nav,section,[role=article],[role=complementary],[role=main],[role=navigation],[role=region]')) {
            this.setAttribute('aria-role', 'banner')
        }
        this.dataset.role = 'header';
    }
}
customElements.define(header, Header);

class Content extends HTMLElement {
    constructor() {
        super();
    }
    
}
customElements.define(content, Content);

class Image extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.setAttribute('aria-role', 'figure')
        this.dataset.role = 'figure';
    }
}
customElements.define(image, Image);

class Footer extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        if(!this.closest('article,aside,main,nav,section,[role=article],[role=complementary],[role=main],[role=navigation],[role=region]')) {
            this.setAttribute('aria-role', 'contentinfo')
        }
        this.dataset.role = 'footer';
    }
}
customElements.define(footer, Footer);

class Title extends HTMLElement {
    constructor() {
        super();
    }
}
customElements.define(title, Title);

const defaultIcon = `<svg data-gjs-type="svg" data-gjs-editable="false" data-gjs-propagate="['editable']" width="32" height="32" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="6.5" cy="6.5" r="3.5"/><path d="M2.5 21h8l-4-7zM14 3l7 7m-7 0l7-7m-7 11h7v7h-7z"/></g></svg>`;
class Icon extends HTMLElement {
    constructor() {
        super();
        this.render = () => {
            if (this.label) {
                this.setAttribute('role', 'img');
                this.setAttribute('aria-label', this.label)
            }
        }
    }

    get label() {
        return this.getAttribute('label') || null;
    }

    set label(val) {
        return this.setAttribute('label', val);
    }

    static get observedAttributes() {
        return ['label'];
    }

    connectedCallback() {
        if(!this.innerHTML.trim()) {
            this.innerHTML = defaultIcon;
        }
        this.render();
    }

    attributeChangedCallback() {
        this.render();
    }
}
customElements.define(icon, Icon);

class Footeritem extends HTMLElement {
    constructor() {
        super();
    }
}
customElements.define(footeritem, Footeritem);


