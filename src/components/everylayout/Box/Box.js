import debounce from 'lodash.debounce';

const waves = () => import('vanta/dist/vanta.waves.min').then(i => i.default);
const fog = () => import('vanta/dist/vanta.fog.min').then(i => i.default);
const clouds = () => import('vanta/dist/vanta.clouds.min').then(i => i.default);
const clouds2 = () => import('vanta/dist/vanta.clouds2.min').then(i => i.default);
const globe = () => import('vanta/dist/vanta.globe.min').then(i => i.default);
const net = () => import('vanta/dist/vanta.net.min').then(i => i.default);
const cells = () => import('vanta/dist/vanta.cells.min').then(i => i.default);
const dots = () => import('vanta/dist/vanta.dots.min').then(i => i.default);
const rings = () => import('vanta/dist/vanta.rings.min').then(i => i.default);
const halo = () => import('vanta/dist/vanta.halo.min').then(i => i.default);
const three = () => import('./three.js').three();

const roleMap = {
  section: "region",
  article: "article",
  header: "banner",
  footer: "contentinfo",
  main: "main",
  nav: "navigation",
  aside: "complementary",
};
export const effects = {
  waves,
  fog,
  clouds,
  clouds2,
  globe,
  net,
  cells,
  dots,
  rings,
  halo,
};

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

    this.div = document.createElement("div");
    this.div2 = document.createElement("div");
    this.slotelement = document.createElement("slot");
    this.settings = {};
    window.addEventListener("devicemotion", function(event){
      if(event.rotationRate.alpha || event.rotationRate.beta || event.rotationRate.gamma)
          this.settings.gyroControls = true;
    }, { once: true });
    this.settings.mouseControls = window.matchMedia("(any-hover: hover)").matches;
    this.settings.touchControls = !window.matchMedia("(any-hover: none)").matches;

    this.render = () => {
      const role = roleMap[ext?.extends];
      role ? this.setAttribute('role', role) : this.removeAttribute('role');
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

  async renderVanta(div, slot) {
    if(!this.shadowRoot) {
      this.attachShadow({ mode: "open" })
    }
    if(!this.styleSheetElement) {
      this.styleSheetElement = document.createElement("style");
      this.styleSheetElement.textContent = `
      ${Object.keys(effects).map(k => `:host([type=${k}])`).join(',')} {
        position: relative;
      }
      div:first-child {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        overflow: hidden;
        display: none;
      }
      ${Object.keys(effects).map(k => `:host([type=${k}]) div:first-child`).join(',')}  {
        display: unset;
      }
      div > canvas {
        position: absolute !important;
        z-index: 0 !important;
        top: 0px !important;
        left: 0px !important;
        width: 100% !important;
        height: 100% !important;
      }
      div + div {
        z-index: 1;
      }
      `;
    }
    const shadow = this.shadowRoot;
    shadow.appendChild(div);
    this.div2.appendChild(slot);
    shadow.appendChild(this.div2);
    shadow.appendChild(this.styleSheetElement);

    
    const eff = effects[this.type];
    if(!eff) {
      return;
    }
    window.THREE = await three();
    const vantaeffect = await eff();

    const settings = {
      ...this.settings,
    };
    /**
     * // OVERALL
    background HEX
    highlight color HEX
    base color HEX
    secondary color HEX
    size 0..10
    motion 0..5
    zoom 0.1..5
    special 0..200
    details boolean
    */

    switch (this.type) {
      case 'fog':
        settings.highlightColor = this.getAttribute('highlight');
        settings.midtoneColor = this.getAttribute("background");
        settings.lowlightColor = this.getAttribute("secondary")
        settings.baseColor = this.getAttribute("base")
        settings.blurFactor = parseFloat(this.getAttribute("special")) / 100
        settings.zoom =  parseFloat(this.getAttribute("zoom"));
      break;
      case 'waves':
        settings.color = this.getAttribute("background");
        settings.shininess = parseFloat(this.getAttribute("special"));
        settings.waveHeight = parseFloat(this.getAttribute("size")) * 10;
        settings.waveSpeed = parseFloat(this.getAttribute("motion"));
        settings.zoom = parseFloat(this.getAttribute("zoom"));
      break;
    case 'clouds':
        settings.backgroundColor = this.getAttribute("background");
        settings.skyColor = this.getAttribute("base");
        settings.cloudColor = this.getAttribute("secondary");
        settings.cloudShadowColor = this.getAttribute("secondary");
        settings.sunGlareColor = this.getAttribute("highlight");
        settings.sunlightColor = this.getAttribute("highlight");
        settings.speed = parseFloat(this.getAttribute("motion"));
      break;
    case 'clouds2':
        settings.backgroundColor = this.getAttribute("background");
        settings.skyColor = this.getAttribute("base");
        settings.cloudColor = this.getAttribute("secondary");
        settings.lightColor = this.getAttribute("highlight");
        settings.speed = parseFloat(this.getAttribute("motion"));
      break;
    case 'globe':
        settings.color = this.getAttribute("highlight");
        settings.color2 = this.getAttribute("base");
        settings.size = parseFloat(this.getAttribute("size"));
        settings.backgroundColor = this.getAttribute("background");
      break;
    case 'net':
        settings.color = this.getAttribute("base");
        settings.backgroundColor = this.getAttribute("background");
        settings.points = parseFloat(this.getAttribute("size")) * 10;
        settings.spacing = parseFloat(this.getAttribute("motion")) * 10;
        settings.showDots = !!this.getAttribute("details");
      break;
    case 'cells':
        settings.color1 = this.getAttribute("background");
        settings.color2 = this.getAttribute("base");
        settings.size = parseFloat(this.getAttribute("size"));
        settings.speed = parseFloat(this.getAttribute("motion"));
      break;
    case 'dots':
        settings.color = this.getAttribute("base");
        settings.color2 = this.getAttribute("secondary");
        settings.backgroundColor = this.getAttribute("background");
        settings.size = parseFloat(this.getAttribute("size"));
        settings.spacing = parseFloat(this.getAttribute("motion")) * 10;
        settings.showLines = !!this.getAttribute("details");
      break;
    case 'rings':
        settings.backgroundColor = this.getAttribute("background");
        settings.color = this.getAttribute("base");
      break;
    case 'halo':
        settings.baseColor = this.getAttribute("base");
        settings.backgroundColor = this.getAttribute("background");
        settings.amplitudeFactor = parseFloat(this.getAttribute("motion"));
        //settings.xOffset: -0.44,
        //settings.yOffset: -0.25,
        settings.size = parseFloat(this.getAttribute("size"));
      break;
    }
    Object.keys(settings).forEach(k => {
      if(settings[k]?.trim?.().startsWith('var(')) {
        const col = settings[k].trim().slice('var('.length, -1);
        settings[k] = window.getComputedStyle((this?.ownerDocument || document).body).getPropertyValue(`${col}`)?.trim();
      }
      if(settings[k]?.trim?.() === '') {
        delete settings[k];
      }
      if(Number.isNaN(settings[k])) {
        delete settings[k];
      }
    })

    if(this.getAttribute('minHeight'))
      settings.minHeight = 200.00;
    if(this.getAttribute('minWidth'))
      settings.minWidth = 200.00;
    if(this.getAttribute('scale'))
      settings.scale = 1.00;
    if(this.getAttribute('scaleMobile'))
      settings.scaleMobile = 1.00;
    if(this.effect) {
      this.effect.destroy();
    }
    while(div.firstChild) {
      div.removeChild(div.firstChild);
    }
    this.effect = vantaeffect.default({
      el: div,
      ...settings,
    });
  }

  get padding() {
    return this.getAttribute('padding') || 'var(--s-3)';
  }

  set padding(val) {
    return this.setAttribute('padding', val);
  }

  get type() {
    return this.getAttribute('type') || 'none';
  }

  set type(val) {
    return this.setAttribute('type', val);
  }

  get borderWidth() {
    return this.getAttribute('borderWidth') || 'var(--border-thin)';
  }

  set borderWidth(val) {
    return this.setAttribute('borderWidth', val);
  }

  static get observedAttributes() {
    return ['borderWidth', 'padding', 'invert', 'type',
      "background",
      "highlight",
      "base",
      "secondary",
      "size",
      "motion",
      "zoom",
      "special",
      "details",
      "scale",
      "scaleMobile",
    ];
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
    this.renderVanta(this.div, this.slotelement);
  }

  disconnectedCallback() {
    if(this.effect) {
      this.effect.destroy();
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if(name === 'type' && oldValue !== newValue && this.div && this.slotelement) {
      this.renderVanta(this.div, this.slotelement).then(() => {
        if(this.effect) {
          this.effect.resize();
        }
      });
    }
    if(this.effect) {
      this.effect.resize();
    }
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