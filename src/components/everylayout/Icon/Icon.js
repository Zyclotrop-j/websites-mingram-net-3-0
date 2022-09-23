/**
 * @module icon-l
 * @description
 * A custom element for inline icon insertion
 * @property {string} space=null The space between the text and the icon. If null, natural word spacing is preserved
 * @property {string} label=null Turns the element into an image in assistive technologies and adds an aria-label of the value
 */
const defaultIcon = `<svg data-gjs-type="svg" data-gjs-editable="false" data-gjs-propagate="['editable']" width="32" height="32" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="6.5" cy="6.5" r="3.5"/><path d="M2.5 21h8l-4-7zM14 3l7 7m-7 0l7-7m-7 11h7v7h-7z"/></g></svg>`;
export default class Icon extends HTMLElement {
  constructor() {
    super();
    this.render = () => {
      if (this.label) {
        this.setAttribute('role', 'img');
        this.setAttribute('aria-label', this.label)
      }
      if (this.space) {
        this.i = `Icon-${this.space}`;
        this.dataset.i = this.i;
        if (!(this?.ownerDocument || document).getElementById(this.i)) {
          let styleEl = (this?.ownerDocument || document).createElement('style');
          styleEl.id = this.i;
          styleEl.innerHTML = `
            [data-i="${this.i}"] > svg {
              margin-inline-end: ${this.space};
            }
          `.replace(/\s\s+/g, ' ').trim();
          (this?.ownerDocument || document).head.appendChild(styleEl);
        }
      }
    }
  }

  get space() {
    return this.getAttribute('space') || null;
  }

  set space(val) {
    return this.setAttribute('space', val);
  }

  get label() {
    return this.getAttribute('label') || null;
  }

  set label(val) {
    return this.setAttribute('label', val);
  }

  static get observedAttributes() {
    return ['space', 'label'];
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

if ('customElements' in window) {
  customElements.define('icon-l', Icon);
}