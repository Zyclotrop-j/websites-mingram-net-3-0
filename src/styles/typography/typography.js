import FontPicker from "./font-picker";

const element = document.createElement('div');
element.classList.add('font-picker')
const fontPicker = new FontPicker(
	'AIzaSyCUAdaH1s4UdLk-xAZN5zsJZykVWxAcNng', // Google API key
	"Open Sans", // Default font
	{ limit: 500, element, sort: "popularity" }, // Additional options
  (data) => {
    const event = new Event('font', data);
    element.dispatchEvent(event);
  },
);

export default editor => {
    const css = editor.Css;

    const styleManager = editor.StyleManager;
    styleManager.addSector('typography', {
        name: 'Typography',
        open: false,
        properties: [
            /*{
                label: 'Font-family',
                property: 'font-family',
                type: 'select',
                default: 'Arial, Helvetica, sans-serif',
                options: [
                 { id: 'Arial, Helvetica, sans-serif', label: 'Arial' },
                 { id: 'Arial Black, Gadget, sans-serif', label: 'Arial Black' },
                ],
            },*/
            'font-size',
            'font-weight',
            'letter-spacing',
            // 'color',
            'line-height',
            'text-align',
            'text-shadow',
        ],
    });
    styleManager.addType('font-lookup', {
        create({ props, change }) {
          const el = document.createElement('div');
          el.appendChild(element);
          element.evthandler = event => {
            change({ event });
          };
          element.addEventListener('font', element.evthandler, false);
          
          return el;
        },
        emit({ props, updateStyle }, { event, partial }) {
          const {
            family,
            id,
          } = fontPicker.getActiveFont();
          
          updateStyle(`${family}`, { partial: false });
          
          if(!css.getRules().some(rule => rule.attributes.atRuleType === "font-face" &&
            rule.attributes?.style?.['font-family']?.toLowerCase().replaceAll('"', '') === family?.toLowerCase())) {
            
            css.addRules(document.querySelector(`#font-${id}`).innerHTML)
            editor.store(); // save the css rule (doesn't auto-save)
          }
        },
        update({ value }) {
          const avail = fontPicker.getFonts();
          if(avail.has(value)) {
            fontPicker.setActiveFont(value);
            const { id, family } = fontPicker.getActiveFont();
            if(!css.getRules().some(rule => rule.attributes.atRuleType === "font-face" &&
              rule.attributes?.style?.['font-family']?.toLowerCase().replaceAll('"', '') === family?.toLowerCase())) {

              css.addRules(document.querySelector(`#font-${id}`).innerHTML)
              editor.store(); // save the css rule (doesn't auto-save)
            }
          }
        },
        destroy() {
          element.removeEventListener('font', element.evthandler, false);
        }
     });
    styleManager.addProperty('typography', {
        label: 'Font-family',
        property: 'font-family',
        type: 'font-lookup',
        //default: 'Open Sans', // if there is a default, we can't unset it!!!
      }, { at: 0 });
    styleManager.addProperty('typography', {
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
    }, { at: 4 });
    styleManager.addProperty('typography', {
      type: 'select',
      label: 'Caps',
      property: 'text-transform',
      options: [
          { id: 'none', label: 'none' },
          { id: 'capitalize', label: 'capitalize' },
          { id: 'uppercase', label: 'uppercase' },
          { id: 'lowercase', label: 'lowercase' },
          { id: 'full-width', label: 'full-width' },
          { id: 'full-size-kana', label: 'full-size-kana' },
      ]
    }, { at: 5 });

      
}
