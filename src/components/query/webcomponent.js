import Observable from 'zen-observable';

const batteryCharging = new Observable(observer => {
  const unsub = navigator.getBattery().then((battery) => {
    const fn = () => {
      observer.next(battery.charging)
    };
    battery.addEventListener('chargingchange', fn);
    observer.next(battery.charging);
    return () => battery.removeEventListener('chargingchange', fn);
  });
  return () => unsub.then(i => i());
});
const batteryChargingTime = new Observable(observer => {
  const unsub = navigator.getBattery().then((battery) => {
    const fn = () => {
      observer.next(battery.chargingTime)
    };
    battery.addEventListener('chargingtimechange', fn);
    observer.next(battery.chargingTime);
    return () => battery.removeEventListener('chargingtimechange', fn);
  });
  return () => unsub.then(i => i());
});
const batteryDischargingTime = new Observable(observer => {
  const unsub = navigator.getBattery().then((battery) => {
    const fn = () => {
      observer.next(battery.dischargingTime)
    };
    battery.addEventListener('dischargingtimechange', fn);
    observer.next(battery.dischargingTime);
    return () => battery.removeEventListener('dischargingtimechange', fn);
  });
  return () => unsub.then(i => i());
});
const batteryLevel = new Observable(observer => {
  const unsub = navigator.getBattery().then((battery) => {
    const fn = () => {
      observer.next(battery.level)
    };
    battery.addEventListener('levelchange', fn);
    observer.next(battery.level);
    return () => battery.removeEventListener('levelchange', fn);
  });
  return () => unsub.then(i => i());
});

const downlink = new Observable(observer => {
  const updateECTStatus = () => {
    observer.next(navigator.connection.downlink);
  };
  observer.next(navigator.connection.downlink);
  navigator.connection.addEventListener('change', updateECTStatus);
  return () => navigator.connection.removeEventListener('change', updateECTStatus);
});
const downlinkMax = new Observable(observer => {
  const updateECTStatus = () => {
    observer.next(navigator.connection.downlinkMax);
  };
  observer.next(navigator.connection.downlinkMax);
  navigator.connection.addEventListener('change', updateECTStatus);
  return () => navigator.connection.removeEventListener('change', updateECTStatus);
});
const effectiveType = new Observable(observer => {
  const updateECTStatus = () => {
    observer.next(navigator.connection.effectiveType);
  };
  observer.next(navigator.connection.effectiveType);
  navigator.connection.addEventListener('change', updateECTStatus);
  return () => navigator.connection.removeEventListener('change', updateECTStatus);
});
const saveData = new Observable(observer => {
  const updateECTStatus = () => {
    observer.next(navigator.connection.saveData);
  };
  observer.next(navigator.connection.saveData);
  navigator.connection.addEventListener('change', updateECTStatus);
  return () => navigator.connection.removeEventListener('change', updateECTStatus);
});
const connectiontype = new Observable(observer => {
  const updateECTStatus = () => {
    observer.next(navigator.connection.type);
  };
  observer.next(navigator.connection.type);
  navigator.connection.addEventListener('change', updateECTStatus);
  return () => navigator.connection.removeEventListener('change', updateECTStatus);
});

const usedJSHeapSize = new Observable(observer => {
  const timer = setInterval(() => {
    observer.next(window?.performance?.memory?.usedJSHeapSize);
  }, 1000);
  observer.next(window?.performance?.memory?.usedJSHeapSize);
  return () => clearInterval(timer);
});
const usedJSHeapSizePercent = new Observable(observer => {
  const timer = setInterval(() => {
    observer.next(window?.performance?.memory?.usedJSHeapSize / window?.performance?.memory?.jsHeapSizeLimit * 100);
  }, 1000);
  observer.next(window?.performance?.memory?.usedJSHeapSize / window?.performance?.memory?.jsHeapSizeLimit * 100);
  return () => clearInterval(timer);
});

const online = new Observable(observer => {
  const updateOnlineStatus = () => {
    observer.next(navigator.onLine);
  };
  observer.next(navigator.onLine);
  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);
  return () => {
    window.removeEventListener('online', updateOnlineStatus);
    window.removeEventListener('offline', updateOnlineStatus);
  };
});

const __mediaQueryCache = {}; 
const mediaQueryFactory = (query) => {
  if(__mediaQueryCache[query]) return __mediaQueryCache[query];
  const r = new Observable(observer => {
    const mql = window.matchMedia(query);
    const onUpdate = () => observer.next(mql.matches);
    mql.addEventListener('change', onUpdate);
    observer.next(mql.matches);
    return () => mql.removeEventListener('change', onUpdate);;
  });
  __mediaQueryCache[query] = r;
  return __mediaQueryCache[query];
}

const sizes = {
  xxxs: 200,
  xxs: 320,
  xs: 480,
  s: 800,
  sl: 960,
  m: 1024,
  ml: 1280,
  l: 1334,
  xl: 1366,
  xxl: 1600,
  xxxl: 1920,
  xxxxl: 2560,
  xxxxxl: 3840,
  'UltraHD1': 3840,
  '4k': 3840,
  xxxxxxl: 5120,
  '5k': 5120,
  'UXGA ': 6400,
  'HSXGA  ': 6400,
  '8k': 7680,
  'UltraHD2': 7680,
  '10k': 10240,
  '16k': 15360,

  small: 768,
  medium: 1536,
  large: 1537
};

const connectionTypeOptions = [
  'bluetooth',
  'cellular',
  'ethernet',
  'none',
  'wifi',
  'wimax',
  'other',
  'unknown',
];
const saveDataOptions = [
  true,
  false,
];
const effectiveTypeOptions = [
  "slow-2g",
  "2g",
  "3g",
  "4g",
];
// downlink -> number //  in MB, what the observed downlink is
// downlinkMax -> number // in MB, what the network says it can do

const batteryChargingOptions = [
  true,
  false,
];
// batteryChargingTime // number, in s
// batterDisChargingTime // number, in s
// batteryLevel // number, in % between 0.0 and 1.0

const onlineOptions = [
  true,
  false,
];

export const mediaQuery = [
  "(orientation: landscape)",
  "(orientation: portrait)",
  ...Object.values(sizes).map(w => `(max-width: ${w}px)`),
  ...Object.values(sizes).map(w => `(min-width: ${w}px)`),
  ...[
    72,
    96,
    150,
    300,
    2540,
    4000,
  ].reduce((p, i) => p.concat([
    `(resolution: ${i}dpi)`,
    `(min-resolution: ${i}dpi)`,
    `(max-resolution: ${i}dpi)`
  ]), []),
  "all",
  "not all",
  "screen",
  "not screen",
  "print",
  "not print",
  "speech",
  "not speech",
  "(pointer: fine)",
  "(pointer: coarse)",
  "(pointer: none)",
  "(hover: hover)",
  "(hover: none)",
  "(any-pointer: fine)",
  "(any-pointer: coarse)",
  "(any-pointer: none)",
  "(any-hover: hover)",
  "(any-hover: none)",
  "(aspect-ratio: 1/1)",
  "(aspect-ratio: 6/5)",
  "(aspect-ratio: 5/4)",
  "(aspect-ratio: 4/3)",
  "(aspect-ratio: 11/8)",
  "(aspect-ratio: 3/2)",
  "(aspect-ratio: 16/10)",
  "(aspect-ratio: 1618/1000)",
  "(aspect-ratio: 5/3)",
  "(aspect-ratio: 16/9)",
  "(aspect-ratio: 2/1)",
  "(aspect-ratio: 22/10)",
  "(aspect-ratio: 7/3)",
  "(aspect-ratio: 32/9)",
  "(aspect-ratio: 3/1)",
  "(display-mode: fullscreen)",
  "(display-mode: standalone)",
  "(display-mode: minimal-ui)",
  "(display-mode: browser)",
  "(scan: interlace)",
  "(scan: progressive)",
  "(grid: 0)",
  "(grid: 1)",
  "(update: fast)",
  "(update: slow)",
  "(update: none)",
  "(overflow-block: none)",
  "(overflow-block: scroll)",
  "(overflow-block: optional-paged)",
  "(overflow-block: paged)",
  "(overflow-inline: scroll)",
  "(overflow-inline: none)",
  "(color)",
  "(not color)",
  "(min-color: 1)",
  "(min-color: 2)",
  "(min-color: 5)",
  "(min-color: 8)",
  "(min-color: 10)",
  "(min-color: 16)",
  "(max-color: 1)",
  "(max-color: 2)",
  "(max-color: 5)",
  "(max-color: 8)",
  "(max-color: 10)",
  "(max-color: 16)",
  "(color-gamut: srgb)",
  "(color-gamut: p3)",
  "(color-gamut: rec2020)",
  "(monochrome)",
  "(monochrome: 0)",
  "(inverted-colors: inverted)",
  "(inverted-colors: none)",
  "(prefers-reduced-motion: no-preference)",
  "(prefers-reduced-motion: reduce)",
  "(prefers-reduced-transparency: no-preference)",
  "(prefers-reduced-transparency: reduce)",
  "(prefers-color-scheme: dark)",
  "(prefers-color-scheme: light)",
  "(forced-colors: active)",
  "(forced-colors: none)",
  "(scripting: none)",
  "(scripting: initial-only)",
  "(scripting: enabled)",
];

const operators = {
  batteryCharging,
  batteryChargingTime,
  batteryDischargingTime,
  batteryLevel,
  downlink,
  downlinkMax,
  effectiveType,
  saveData,
  connectiontype,
  usedJSHeapSize,
  usedJSHeapSizePercent,
  online,
};

const operatorMatching = {
  '>=': (a, b) => a >= b,
  '<=': (a, b) => a <= b,
  '>': (a, b) => a > b,
  '<': (a, b) => a < b,
  '!=': (a, b) => a != b,
  '==': (a, b) => a == b,
};
export const availableMatchers = Object.keys(operatorMatching);
export const availableOperators = Object.keys(operators);
export const options = {
  connectionTypeOptions,
  saveDataOptions,
  effectiveTypeOptions,
  batteryChargingOptions,
  onlineOptions,
  downlinkOptions: { type: 'number', min: 0, max: 1000 },
  downlinkMaxOptions: { type: 'number', min: 0, max: 1000 },
  batteryChargingTimeOptions: { type: 'number', min: 0, max: 60*60*24 },
  batteryDischargingTimeOptions: { type: 'number', min: 0, max: 60*60*24 },
  batteryLevelOptions: { type: 'number', min: 0, max: 1 },
  usedJSHeapSize: { type: 'number', min: 0, max: 1000 * 1000 * 10, step: 1000 },
  usedJSHeapSizePercent: { type: 'number', min: 0, max: 1 },
  // if none of these, then it's a number
};
const toNumber = i => {
  const t = parseFloat(i);
  return Number.isNaN(t) ? `${i}` : t;
}

export class Query extends HTMLElement {
  constructor() {
    super();
    this.render = () => {
      if(this.unsub) this.unsub.unsubscribe();
      this.lastoperator = this.operator;
      this.unsub = operators[this.query]?.subscribe(nextValue => {
        this.value = nextValue;
        const isTrue = operatorMatching[this.operator](toNumber(this.targetvalue), toNumber(nextValue));
        const tt = `${this.invert}` === 'true' ? !isTrue : isTrue;
        this.dataset.active = tt;
      });
    }
  }

  get query() {
    return this.getAttribute('query') || 'none';
  }

  set query(val) {
    return this.setAttribute('query', val);
  }

  get targetvalue() {
    return this.getAttribute('targetvalue') || 'none';
  }

  set targetvalue(val) {
    return this.setAttribute('targetvalue', val);
  }

  get operator() {
    return this.getAttribute('operator') || '==';
  }

  set operator(val) {
    return this.setAttribute('operator', val);
  }

  get invert() {
    return this.getAttribute('invert') || 'false';
  }

  set invert(val) {
    return this.setAttribute('invert', val);
  }

  static get observedAttributes() {
    return ['query', 'invert', 'operator', 'targetvalue'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }
}

if ('customElements' in window) {
  customElements.define('js-query', Query);
}

export class MediaQuery extends HTMLElement {
  constructor() {
    super();
    this.render = () => {
      this.i = btoa(`Box-${[this.query].join('')}`);
      this.dataset.i = this.i;
      if (!(this?.ownerDocument || document).getElementById(this.i)) {
        const styleEl = (this?.ownerDocument || document).createElement('style');
        styleEl.id = this.i;
        const tquery = this.query.startsWith('not ') ? this.query.replace('not ', '') : `not ${this.query}`;
        styleEl.innerHTML = `
        @media ${tquery} {
          [data-i="${this.i}"] {
            display: none !important;
          }
        }`.replace(/\s\s+/g, ' ').trim();
        (this?.ownerDocument || document).head.appendChild(styleEl);
      }
    }
  }

  get query() {
    return this.getAttribute('query') || 'all';
  }

  set query(val) {
    return this.setAttribute('query', val);
  }

  static get observedAttributes() {
    return ['query'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }
}

if ('customElements' in window) {
  customElements.define('media-query', MediaQuery);
}