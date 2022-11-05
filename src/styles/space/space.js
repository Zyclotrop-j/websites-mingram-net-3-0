import { v4 as uuidv4 } from 'uuid';
import { minifyIconSet } from "@iconify/utils";
import SvelteSpaceApp from "./space.svelte";

const extractUnit = (v) => {
    const n = parseFloat(v);
    const u = v.replace(`${n}`, '');
    return [u, n];
}

export default editor => {
    const styleManager = editor.StyleManager;
    styleManager.addSector('space', {
        name: 'Space',
        open: false,
        properties: [
            //'padding',
            //'margin',
        ],
    });

    styleManager.addType('size-preset', {
        // Create UI
        create({ props, change }) {
          const el = document.createElement('div');
          el.classList.add('gjs-sm-field')
          const uid = uuidv4();
          this.app = new SvelteSpaceApp({ target:el, props: {
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
        update({ value, el, property }) {
            const [unit, nrange, preset, mode] = value.startsWith('var') ? [undefined, undefined, value, 'preset'] : 
                (value?.trim() === 'auto' ? [undefined, undefined, undefined, 'auto'] : [...extractUnit(value), undefined, 'value']);
            const changeSet = {};
            if(value?.trim()) { changeSet.mode = mode; }
            if(unit) { changeSet.unit = unit; }
            if(nrange) { changeSet.nrange = nrange; }
            if(preset) { changeSet.preset = preset; }
            const selectedElement = editor.getSelected()?.view.el;
            if(selectedElement) { changeSet.el = selectedElement; }
            if(property.attributes.property) { changeSet.property = property.attributes.property; }
            if(mode === 'auto') { changeSet.isAuto = value; }
            this.app.$set(changeSet);
        },
        // Clean the memory from side effects if necessary (eg. global event listeners, etc.)
        destroy() {
            el.app.$destroy();
        }
     });

    styleManager.addProperty('space', {
        label: 'Distance to content within (Padding)',
        property: 'padding',
        type: 'composite',
        properties: [
            {
                label: 'Padding top',
                property: 'padding-top',
                type: 'size-preset',
            },
            {
                label: 'Padding left',
                property: 'padding-left',
                type: 'size-preset',
            },
            {
                label: 'Padding bottom',
                property: 'padding-bottom',
                type: 'size-preset',
            },
            {
                label: 'Padding right',
                property: 'padding-right',
                type: 'size-preset',
            }

        ],
        detached: true,
    }, { at: 0 });
    styleManager.addProperty('space', {
        label: 'Distance to surounding elements (Margin)',
        property: 'margin',
        type: 'composite',
        properties: [
            {
                label: 'Margin top',
                property: 'margin-top',
                type: 'size-preset',
            },
            {
                label: 'Margin left',
                property: 'margin-left',
                type: 'size-preset',
            },
            {
                label: 'Margin bottom',
                property: 'margin-bottom',
                type: 'size-preset',
            },
            {
                label: 'Margin right',
                property: 'margin-right',
                type: 'size-preset',
            }

        ],
        detached: true,
    }, { at: 0 });

    styleManager.addSector('width-height', {
        name: 'Width and height',
        open: false,
        properties: [
          {
            label: 'Width and height',
            property: 'size',
            type: 'composite',
            detached: true,
            properties: [
              {
                label: 'Width',
                property: 'width',
                type: 'size-preset',
              },
              {
                label: 'Height',
                property: 'height',
                type: 'size-preset',
              }
            ]
          },
        ],
    });

    styleManager.addSector('horizontal-space', {
        name: 'Horizontal',
        open: false,
        properties: [
          {
            label: 'Width',
            property: 'horizontal-space',
            type: 'composite',
            detached: true,
            properties: [
              {
                label: 'Overall width',
                property: 'width',
                type: 'size-preset',
              },
              {
                property: '--w',
                type: 'number',
                label: 'Divider width',
                units: ['%'],
                min: 0,
                max: 100,
              },
              {
                type: 'select',
                label: 'Align',
                property: 'vertical-align',
                options: [
                    { id: 'baseline', label: 'baseline' },
                    { id: 'sub', label: 'sub' },
                    { id: 'super', label: 'super' },
                    { id: 'text-top', label: 'text-top' },
                    { id: 'text-bottom', label: 'text-bottom' },
                    { id: 'middle', label: 'middle' },
                    { id: 'top', label: 'top' },
                    { id: 'bottom', label: 'bottom' },
                ]
              }
            ]
          },
        ],
    });
    styleManager.addSector('vertical-space', {
      name: 'Vertical',
      open: false,
      properties: [
        {
          label: 'Height',
          property: 'vertical-space',
          type: 'composite',
          detached: true,
          properties: [
            {
              label: 'Overall height',
              property: 'height',
              type: 'size-preset',
            },
            {
              property: '--w2',
              type: 'number',
              label: 'Divider width',
              units: ['%'],
              min: 0,
              max: 100,
            },
            /*{
              type: 'select',
              label: 'Align',
              property: 'vertical-align',
              options: [
                  { id: 'baseline', label: 'baseline' },
                  { id: 'sub', label: 'sub' },
                  { id: 'super', label: 'super' },
                  { id: 'text-top', label: 'text-top' },
                  { id: 'text-bottom', label: 'text-bottom' },
                  { id: 'middle', label: 'middle' },
                  { id: 'top', label: 'top' },
                  { id: 'bottom', label: 'bottom' },
              ]
            }*/
          ]
        },
      ],
    });
    styleManager.addSector('sidebar-width', {
      name: 'Sidebar width overwrite',
      property: 'side-width',
      open: false,
      properties: [
        {
          id: 'sidebar-sideWidth',
          label: 'Width (overwrite)',
          property: '--sideWidth',
          type: 'size-preset',
        },
      ]
    });
}
