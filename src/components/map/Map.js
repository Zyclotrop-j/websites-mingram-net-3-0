import L from "leaflet";
import debounce from "lodash.debounce";
import { roundToDigits } from "../../helpers/roundToDigits";

const Map = class extends HTMLElement {
  constructor() {
    super();
  }

  render(map) {
    if(this.mode === 'edit') {
      map.touchZoom.enable();
      map.doubleClickZoom.enable();
      map.scrollWheelZoom.enable();
      map.boxZoom.enable();
      map.keyboard.enable();
    } else {
      map.touchZoom.disable();
      map.doubleClickZoom.disable();
      map.scrollWheelZoom.disable();
      map.boxZoom.disable();
      map.keyboard.disable();
    }
    try {
      const {lat, lng} = this.leafletmap.getCenter();
      const coords = JSON.parse(this.coordinate);
      if(roundToDigits(lat, 4) !== coords[0] || roundToDigits(lng, 4) !== coords[1]) 
        this.leafletmap.setView(coords);
    } catch(e) {}
    this.updateZoom(map);
  }

  updateZoom = debounce((map) => {
    try {
      if(this.zoom?.trim() && parseInt(this.zoom) !== this.leafletmap.getZoom())
        this.leafletmap.setZoom(parseInt(this.zoom));
    } catch(e) {}
  }, 2000)

  connectedCallback() {
    const root = document.createElement('div');
    const div = document.createElement('div');
    const div2 = document.createElement('div');
    div.classList.add('l-container');
    root.classList.add('root');
    const style = document.createElement('style');
    style.textContent = `
      .root {
        position: relative;
      }
      .l-container {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
      }
      .leaflet-container {
        height: 100%;
      }
      .slot {
        z-index: 999;
        position: relative;
      }
      .leaflet-control-zoom {
        display: none;
      }
      .leaflet-control-zoom {
        display: none;
      }

      :host([mode=edit]) .slot {
        z-index: -1;
        pointer-events: none;
      }
      :host([mode=edit]) .leaflet-control-zoom {
        display: initial;
      }
      :host([mode=edit]) root {
        
      }
    `;
    const link = document.createElement('link');
    link.href = '/leaflet.css';
    link.rel = "stylesheet";
    link.type = "text/css";
    div.appendChild(div2);
    const shadow = this.attachShadow({mode: 'open'});
    shadow.appendChild(root);
    root.appendChild(div);
    const div3 = document.createElement('div');
    div3.appendChild(document.createElement('slot'));
    div3.classList.add('slot');
    root.appendChild(div3);
    shadow.appendChild(style);
    shadow.appendChild(link);
    const map = L.map(div2, {}).setView([-27.4498, -232.9102], this.zoom || 3);
    map.attributionControl.setPrefix('Leaflet');
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 20,
        attribution: '© OpenStreetMap'
    }).addTo(map);
    this.leafletmap = map;
    this.resizeObserver = new ResizeObserver(debounce(() => 
      map.invalidateSize()
    ), 500);
    this.resizeObserver.observe(root);
    this.render(map);
    const processChange = () => {
      const { lat, lng } = map.getCenter();
      this.coordinate = JSON.stringify([roundToDigits(lat, 4), roundToDigits(lng, 4)]);
      this.zoom = this.leafletmap.getZoom();
    };
    map.addEventListener('moveend', processChange);
    map.addEventListener('zoomend', processChange);
  }

  centerOnSelf() {
    const map = this.leafletmap;
    return new Promise((res, rej) => {
      function onLocationFound(e) {
        map.off('locationfound', onLocationFound);
        map.off('locationerror', onLocationError);
        res([e.latlng.lat, e.latlng.lng]);
      }
      function onLocationError(e) {
        map.off('locationfound', onLocationFound);
        map.off('locationerror', onLocationError);
        rej(e);
      }
      map.on('locationfound', onLocationFound);
      map.on('locationerror', onLocationError);
      map.locate({ setView: true, maxZoom: 16 });
    });
  }

  disconnectedCallback() {
    this.resizeObserver.disconnect();
  }

  get mode() {
    return this.getAttribute('mode') || 'lock)';
  }

  set mode(val) {
    return this.setAttribute('mode', val);
  }

  get coordinate() {
    return this.getAttribute('coordinate');
  }

  set coordinate(val) {
    return this.setAttribute('coordinate', val);
  }

  get zoom() {
    return this.getAttribute('zoom');
  }

  set zoom(val) {
    return this.setAttribute('zoom', val);
  }

  static get observedAttributes() {
    return ['mode', 'coordinate', 'zoom'];
  }

  attributeChangedCallback() {
    this.leafletmap && this.render(this.leafletmap);
  }
}

export default Map;

if ('customElements' in window) {
  customElements.define('map-l', Map);
}