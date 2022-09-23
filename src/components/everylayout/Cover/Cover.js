/**
 * @module cover-l
 * @description
 * A custom element for covering a block-level element horizontally,
 * with a max-width value representing the typographic measure
 * @property {string} space=var(--s1) The minimum space between and around all of the child elements
 * @property {string} minHeight=100vh The minimum height (block-size) for the **Cover**
 * @property {boolean} noPad=false Whether the spacing is also applied as padding to the container element
 */
export default class Cover extends HTMLElement {
  constructor() {
    super();
    this.render = () => {
      this.i = `Cover-${[this.space, this.minHeight, this.noPad].join('')}`;
      this.dataset.i = this.i;
      if (!(this?.ownerDocument || document).getElementById(this.i)) {
        let styleEl = (this?.ownerDocument || document).createElement('style');
        styleEl.id = this.i;
        styleEl.innerHTML = `
          [data-i="${this.i}"] {
            min-height: ${this.minHeight};
            padding: ${!this.noPad ? this.space : '0'};
          }
      
          [data-i="${this.i}"] > * {
            margin-block: ${this.space};
          }
      
          [data-i="${this.i}"] > :first-child {
            margin-block-start: 0;
            margin-block-end: unset;
          }
      
          [data-i="${this.i}"] > :nth-child(2) ~ :last-child {
            margin-block-end: 0;
          }
      
          [data-i="${this.i}"] > *, [data-i="${this.i}"] > :only-child, [data-i="${this.i}"] > :nth-child(2) {
            margin-block: auto;
          }
        `.replace(/\s\s+/g, ' ').trim();
        (this?.ownerDocument || document).head.appendChild(styleEl);
      }
    }
  }

  get space() {
    return this.getAttribute('space') || 'var(--s1)';
  }

  set space(val) {
    return this.setAttribute('space', val);
  }

  get minHeight() {
    return this.getAttribute('minHeight') || '100vh';
  }

  set minHeight(val) {
    return this.setAttribute('minHeight', val);
  }

  get noPad() {
    return this.hasAttribute('noPad');
  }

  set noPad(val) {
    if (val) {
      return this.setAttribute('noPad', '');
    } else {
      return this.removeAttribute('noPad');
    }
  }

  static get observedAttributes() {
    return ['space', 'minHeight', 'noPad'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }
}

if ('customElements' in window) {
  customElements.define('cover-l', Cover);
}