import { v4 as uuidv4 } from 'uuid';
import draggable from '../../../helpers/draggable';
import SvelteColorApp from "../../../styles/color/color.svelte";
import "./Box";

export * as icon from './layout-icon_box.svg';

export const type =  'box-l';

function parseColorToChangeSet(value) {
  const [rgbv, preset, mode] = value.startsWith('var') ? [undefined, value, 'preset'] : [value, undefined, 'value'];
  const rgbRegex = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
  const changeSet = {};
  if(value?.trim()) { changeSet.mode = mode; }
  if(rgbv) {
      const [__, r, g, b, a] = rgbv.match(rgbRegex) || [];
      changeSet.rgb = {
          r: parseInt(r),
          g: parseInt(g),
          b: parseInt(b),
          a: parseFloat(a ?? 1)
      };
  }
  if(preset) { changeSet.preset = preset; }
  return changeSet;
}



export default editor => {
    const domc = editor.DomComponents;
    const defaultType = domc.getType('default');

    editor.TraitManager.addType('background-animation', {
      // Expects as return a simple HTML string or an HTML element
      createInput({ trait, component }) {
        // Here we can decide to use properties from the trait
        const options = trait.get('options') || [];
    
        // Create a new element container and add some content
        const el = document.createElement('div');
        const attrs = component.getAttributes();
        const toSet = {};
        const divs = [
          "background",
          "highlight",
          "base",
          "secondary",
        ].map(name => {
          const inputel = document.createElement('div');
          const t = document.createElement('div');
          const value = attrs[name] || '';
          const changeSet = parseColorToChangeSet(value);
          toSet[name] = value;
          this[`app${name}`] = new SvelteColorApp({ target: t, props: {
              uid: uuidv4(),
              change: ({ event: { value } }) => {
                component.addAttributes({ [name]: value });
              },
              getComputedStyles: () => editor.Canvas.getWindow().getComputedStyle(editor.Canvas.getBody()),
              ...changeSet,
          } });
          inputel.classList.add(`background-animation-input-${name}-color`, 'color-inputs', 'background-animation-input-group');
          inputel.innerHTML = `<div class="color-label">${name}</div>`;
          inputel.appendChild(t);
          return inputel;
        });
        setTimeout(() => { // clear init values of color-picker
          component.addAttributes(toSet);
        }, 5);

        el.innerHTML = `
          <label class="background-animation-input-group">Background<select name="type" class="background-animation__type">
            ${options.map(opt => `<option value="${opt.value}">${opt.name}</option>`).join('')}
          </select></label>
          <label class="background-animation-input-group">size<input name="size" type="number" min="0" max="10" placeholder="0..10" step="0.5"/></label>
          <label class="background-animation-input-group">motion<input name="motion" type="number" min="0" max="5" placeholder="0..5" step="0.2"/></label>
          <label class="background-animation-input-group">zoom<input name="zoom" type="number" min="0" max="5" placeholder="0..5" step="0.2"/></label>
          <label class="background-animation-input-group">special<input name="special" type="number" min="0" max="200" placeholder="0..200" step="10"/></label>
          <label class="background-animation-input-group">scale<input name="scale" type="number" min="0" max="5" placeholder="0..5" step="0.2"/></label>
          <label class="background-animation-input-group">scale mobile<input name="scaleMobile" type="number" min="0" max="5" placeholder="0..5" step="0.2"/></label>
        `;
        divs.forEach(child => el.appendChild(child));
        const inputType = el.querySelector('[name=type]');
        inputType.addEventListener('change', ev => {
          el.setAttribute('type', ev.target.value);
          component.addAttributes({ type: ev.target.value });
        });
        el.setAttribute('type', attrs.type || 'none');
        [
          "size",
          "motion",
          "zoom",
          "special",
          "details",
          "scale",
          "scaleMobile",
        ].forEach(name => {
          const inputType = el.querySelector(`[name=${name}]`);
          inputType.addEventListener('change', ev => {
            component.addAttributes({ [name]: ev.target.value });
          });
        });
        return el;
      },

      onUpdate({ elInput, component }) {
        const attrs = component.getAttributes();
        [
          "background",
          "highlight",
          "base",
          "secondary",
        ].forEach(name => {
          const value = attrs[name] || '';
          const changeSet = parseColorToChangeSet(value);
          this[`app${name}`].$set(changeSet);
        });
        [
          "type",
          "size",
          "motion",
          "zoom",
          "special",
          "details",
          "scale",
          "scaleMobile",
        ].forEach(name => {
          const attr = attrs[name] || '';
          const el = elInput.querySelector(`[name=${name}]`);
          el.value = attr;
          el.dispatchEvent(new CustomEvent('change'));
        });
      },

      // eventCapture: ['input'],
    });

    editor.Components.addType(type, {
        isComponent: el => (el?.tagName?.toLowerCase() === type || el?.tagName?.toLowerCase().startsWith(`${type}-`)), // only used if we need to parse external html - internal ones already has data-gjs-type-attr
        model: {
            defaults: {
                tagName: type,
                draggable: draggable('*'),
                droppable: '*',
                attributes: {},
                stylable: [
                  'width',
                  'padding',
                  'margin',
                  'color',
                  'background-color',

                  // Container
                  'gap',
                  'flex-direction-column',
                  'flex-wrap',
                  'justify-content',
                  'align-content',
                  'align-items',
                  // Item
                  'order',
                  'flex-grow',
                  'flex-shrink',
                  'flex-basis',
                  'align-self',
                  'justify-self',

                  // Border
                  'border-radius',
                  'border-color',
                  'border-width',
                  'border-style',
                ],
                traits: [
                  'padding',
                  'borderWidth',
                  {
                    type: 'checkbox',
                    name: 'data-force-fullwidth',
                    label: 'Force full-width?',
                  },
                  {
                    type: 'checkbox',
                    name: 'invert',
                    label: 'Invert colors?',
                  },
                  {
                    type: 'select',
                    options: [
                      { value: 'box-l', name: 'generic' },
                      { value: 'box-l-section', name: 'section' },
                      { value: 'box-l-article', name: 'article' },
                      { value: 'box-l-header', name: 'header' },
                      { value: 'box-l-footer', name: 'footer' },
                      { value: 'box-l-main', name: 'main' },
                      { value: 'box-l-navigation', name: 'navigation' },
                      { value: 'box-l-aside', name: 'aside' },
                    ],
                    label: 'Level',
                    name: 'tagName',
                    changeProp: 1,
                  },
                  {
                    type: 'background-animation',
                    name: 'type',
                    label: 'Background animation',
                    options: [
                      { value: 'none', name: 'none' },
                      { value: 'waves', name: 'waves' },
                      { value: 'fog', name: 'fog' },
                      { value: 'clouds', name: 'clouds' },
                      { value: 'clouds2', name: 'clouds2' },
                      { value: 'globe', name: 'globe' },
                      { value: 'net', name: 'net' },
                      { value: 'cells', name: 'cells' },
                      { value: 'dots', name: 'dots' },
                      { value: 'rings', name: 'rings' },
                      { value: 'halo', name: 'halo' },
                    ]
                  },
                ],
                components: [{
                  type: 'text',
                  components: `I'm a box`,
                }],
                styles: ``,
              },
        },
        view: {}
    });
}