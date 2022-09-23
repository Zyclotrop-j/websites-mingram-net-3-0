/**
 * @module box-l
 * @description
 * A custom element for generic boxes/containers
 * @property {string} padding=var(--s-3) A CSS `padding` value
 * @property {string} borderWidth=var(--border-thin) A CSS `border-width` value
 * @property {boolean} invert=false Whether to apply an inverted theme. Only recommended for greyscale designs.
 */
const Box = (ext) => class extends HTMLElement {
  constructor() {
    super();
    this.render = () => {
      this.i = `Box-${[this.padding, this.borderWidth, this.invert].join('')}`;
      this.dataset.i = this.i;
      if (!(this?.ownerDocument || document).getElementById(this.i)) {
        let styleEl = (this?.ownerDocument || document).createElement('style');
        styleEl.id = this.i;
        styleEl.innerHTML = `
          [data-i="${this.i}"] {
            padding: ${this.padding};
            border: ${this.borderWidth} solid;
            ${this.invert ?
            `background-color: var(--color-light);
              filter: invert(100%);`
            : ''}
          }
      
          [data-i="${this.i}"] {
            background-color: inherit;
          }
        `.replace(/\s\s+/g, ' ').trim();
        (this?.ownerDocument || document).head.appendChild(styleEl);
      }
    }
  }

  get padding() {
    return this.getAttribute('padding') || 'var(--s-3)';
  }

  set padding(val) {
    return this.setAttribute('padding', val);
  }

  get borderWidth() {
    return this.getAttribute('borderWidth') || 'var(--border-thin)';
  }

  set borderWidth(val) {
    return this.setAttribute('borderWidth', val);
  }

  static get observedAttributes() {
    return ['borderWidth', 'padding', 'invert'];
  }

  get invert() {
    return this.hasAttribute('invert');
  }

  set invert(val) {
    if (val) {
      return this.setAttribute('invert', '');
    } else {
      return this.removeAttribute('invert');
    }
  }

  connectedCallback() {
    this.dataset.ext = ext?.extends || '';
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }
}

export default Box;

if ('customElements' in window) {
  customElements.define('box-l', Box());
  customElements.define('box-l-section', Box({ extends: 'section' }));
  customElements.define('box-l-article', Box({ extends: 'article' }));
  customElements.define('box-l-header', Box({ extends: 'header' }));
  customElements.define('box-l-footer', Box({ extends: 'footer' }));
  customElements.define('box-l-main', Box({ extends: 'main' }));
  customElements.define('box-l-navigation', Box({ extends: 'nav' }));
  customElements.define('box-l-aside', Box({ extends: 'aside' }));
}