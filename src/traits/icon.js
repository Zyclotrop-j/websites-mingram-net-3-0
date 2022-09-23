import Fuse from 'fuse.js'
import autoComplete from "@tarekraafat/autocomplete.js";
import "@tarekraafat/autocomplete.js/dist/css/autoComplete.css"

import './icon.css';
import sharedIconCache, { sharedFetch } from '../helpers/sharedItemCache';

const _icons = fetch('/icons.json').then(i => i.json());
const fusePromise = async () => {
    const iconpack = await _icons;
    const fuse = new Fuse(iconpack, {
        keys: ['name', 'collection']
    });
    return fuse;
}

const memoFetch = ((cache) => {
    return (fname) => {
      if(cache[fname]) {
        return cache[fname];
      }
      const icondata = sharedFetch(`//localhost:3001/${fname}`);
      cache[fname] = icondata;
      return icondata;
    };
  })(sharedIconCache);


export default (editor, config = {}) => {
    const tm = editor.TraitManager;

    tm.addType('icon_select', {
        createInput(d) {
          const { trait, component } = d;
          const traitOpts = trait.get('options') || {};
          const max = 50;
      
          // Create a new element container and add some content
          const el = document.createElement('div');
          el.innerHTML = `
            <input type="text"></input>
          `;
          const autoCompleteJS = new autoComplete({
            name: traitOpts.name || component.ccid || "icon-search-trait",
            selector: () => el.querySelector('input'),
            placeHolder: "Search icons...",
            debounce: 800,
            threshold: 3,
            data: {
                src: async (query) => {
                    const fuse = await fusePromise();
                    const results = fuse.search(query, {limit: max * 2});
                    return results.map(i => i.item);
                },
                keys: ['name', 'collection'],
            },
            resultItem: {
                highlight: true,
                class: "icon-select-list-wrapper",
                element: (item, data) => {
                    memoFetch(data.value.file).then(svg => {
                        if(!item.querySelector('.icon-select-list'))
                            item.innerHTML = `<div class='icon-select-list' >${svg}</div>`;
                    });
                },
            },
            resultsList: {
                class: "icon-select-wrapper",
                maxResults: max
            },
          });
          el.querySelector("input").addEventListener("selection", async function (event) {
            if(!event.detail.selection.value.file) {
                return;
            }
            el.querySelector("input").value = event.detail.selection.value.name;
            component.addAttributes({ icon: event.detail.selection.value.file, iconname: event.detail.selection.value.name });
          });
          return el;
        },
        async onUpdate({ elInput, component }) {
            const icon = component.getAttributes().iconname || '';
            if(!component.getAttributes().icon) {
                return;
            }
            const input = elInput.querySelector('input');
            input.value = icon;
            input.dispatchEvent(new CustomEvent('change'));
        }
      });
}