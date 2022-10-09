import SvelteColorApp from "./color.svelte";

function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }

export default editor => {
    const styleManager = editor.StyleManager;
    styleManager.addSector('backgrounds', {
        name: 'Background',
        open: false,
        properties: [
            //'padding',
            //'color',
        ],
    });

    styleManager.addType('color-preset', {
        // Create UI
        create({ props, change }) {
          const el = document.createElement('div');
          const uid = uuidv4();
          this.app = new SvelteColorApp({ target:el, props: {
            uid,
            change,
            getComputedStyles: () => editor.Canvas.getWindow().getComputedStyle(editor.Canvas.getBody()),
          } });
          return el;
        },
        // Propagate UI changes up to the targets
        emit({ props, updateStyle }, { event, partial }) {
          const { value } = event;
          updateStyle(value, { partial });
        },
        // Update UI (eg. when the target is changed)
        update({ value, el }) {
            // todo: update element max-width to restrict padding!
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
            this.app.$set(changeSet);
        },
        // Clean the memory from side effects if necessary (eg. global event listeners, etc.)
        destroy() {
            el.app.$destroy();
        }
     });
    styleManager.addProperty('backgrounds', {
      label: 'Background-Color',
      property: 'background-color',
      type: 'color-preset',
    }, { at: 1 });

    const addToTypo = () => styleManager.addProperty('typography', {
      label: 'Font-Color',
      property: 'color',
      type: 'color-preset',
    }, { at: 4 });
    const typosector = styleManager.getSector('typography');
    if(typosector) {
      addToTypo();
    } else {
      const addToTypography = (sector) => {
        if(sector.getId() === 'typography') {
          addToTypo();
          editor.off('style:sector:add', addToTypography);
          editor.off('style:sector:update', addToTypography);
        }
      };
      editor.on('style:sector:add', addToTypography);
      editor.on('style:sector:update', addToTypography);
    }

    const addBorderColorToBorder = () => styleManager.addProperty('border',  {
      label: 'Border color',
      property: 'border-color',
      type: 'color-preset',
    }, { at: 1 });
    const bordersector = styleManager.getSector('typborderography');
    if(bordersector) {
      addBorderColorToBorder();
    } else {
      const addToBorder = (sector) => {
        if(sector.getId() === 'border') {
          addBorderColorToBorder();
          editor.off('style:sector:add', addToBorder);
          editor.off('style:sector:update', addToBorder);
        }
      };
      editor.on('style:sector:add', addToBorder);
      editor.on('style:sector:update', addToBorder);
    }

}
