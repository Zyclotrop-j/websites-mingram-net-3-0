import draggable from '../../helpers/draggable';
import inlineflowelement from '../../helpers/inlineflowelement';

export const typeForm = 'form-form';
export const typeInput = 'form-input';
export const typeTextarea = 'form-textarea';
export const typeSelect = 'form-select';
export const typeCheckbox = 'form-checkbox';
export const typeRadio = 'form-radio';
export const typeButton = 'form-button';
export const typeLabel = 'form-label';
export const typeOption = 'form-option';

const classPrefix = 'ctrl-'

export default editor => {
  const { Components } = editor;


  const forTrait = { // todo: make this actually userfriendly
    name: 'for',
  };

  const checkIfInPreview = (ev) => {
    if (!editor.Commands.isActive('preview')) {
      ev.preventDefault();
    }
  };
  const llockattr = {
      locked: true, editable: false, hoverable: false, selectable: true, highlightable: true, draggable: false, droppable: false,
      propagate: ['editable', 'locked', 'hoverable', 'selectable', 'highlightable', 'draggable', 'droppable']
  };
  const locked = (child) => ({
    async updated() {
      const model = this;
      const attr = model.getAttributes();
      if(JSON.stringify(attr) === this.oldAttr) return;
      this.oldAttr = JSON.stringify(attr);
      child(attr, model.components().toArray(), model);
      model.get('components').each(model => {
        model.set(llockattr);
      });
    },
    async init() {
      const model = this;
      const attr = model.getAttributes();
      if(JSON.stringify(attr) === this.oldAttr) return;
      this.oldAttr = JSON.stringify(attr);
      child(attr, model.components().toArray(), model);
      model.get('components').each(model => {
        model.set(llockattr);
      });
    },
  });

  Components.addType(typeForm, {
    isComponent: el => el.tagName?.toLowerCase() == 'form',

    model: {
      defaults: {
        tagName: 'form',
        droppable: ':not(form)',
        draggable: ':not(form)',
        attributes: { method: 'get' },
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
          'border-width',
          'border-style',
        ],
        traits: [{
          type: 'select',
          name: 'method',
          options: [
            {value: 'get', name: 'GET'},
            {value: 'post', name: 'POST'},
          ],
        }, {
          name: 'action',
        }],
        components: [{
          type: typeInput,
        }, {
          type: typeButton,
        }],
        styles: `min-height: 20px`,
        /*script: function() {
          const ts = new Promise(res => {
            if(!window.onloadTurnstileCallback) {
              const script = document.createElement("script");
              script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback";
              script.setAttribute("async", "");
              script.setAttribute("defer", "");
              document.head.appendChild(script); 
              return window.onloadTurnstileCallback = function () {
                res(turnstile);
              };
            }
            return res(turnstile);
          });
          ts.then(async i => {
            let div;
            if(document.querySelector('#turnstilediv')) {
              div = document.querySelector('#turnstilediv')
            } else {
              div = document.createElement("div");
              div.id = 'turnstilediv';
              document.body.appendChild(div);
            }
            i.render('#turnstilediv', {
              sitekey: '0x4AAAAAAAAwbRyk026xfllC', // this is the public client-key
              callback: function(token) {
                  console.log(`Challenge Success ${token}`);
              },
            })

          });
          
        },*/
      },
    },

    view: {
      events: {
        submit: (e) => {
            e.preventDefault();
        },
      }
    },
  });

  Components.addType(typeInput, {
    isComponent: el => el.tagName?.toLowerCase() == 'p' && el.classList?.contains(`${classPrefix}${typeInput}`),

    model: {
      defaults: {
        tagName: 'p',
        droppable: false,
        highlightable: false,
        privateClass: ['normal', 'input'],
        attributes: { type: 'text', class: `control ${classPrefix}${typeInput} is-not-rounded is-normal`, name: '', placeholder: 'Placeholder', required: false, size: 'normal', round: 'is-not-rounded' },
        stylable: [],
        draggable: 'form, form *',
        traits: [
          'name',
          'placeholder',
          {
            type: 'select',
            name: 'type',
            options: [
              { value: 'text' },
              { value: 'email' },
              { value: 'password' },
              { value: 'number' },
            ]
          },
          {
            type: 'checkbox',
            name: 'required',
          },
                  {
            type: 'class_select',
            options: [
              {value: 'is-normal', name: 'normal'},
              {value: 'is-small', name: 'small'},
              {value: 'is-medium', name: 'medium'},
              {value: 'is-large', name: 'large'},
            ],
            label: 'size',
            name: 'size'
          },
          {
            type: 'class_select',
            options: [
              {value: 'is-not-rounded', name: 'normal'},
              {value: 'is-rounded', name: 'round'},
            ],
            label: 'round',
            name: 'round'
          },      
        ],
      },
      ...locked((attr, [child], model) => {
        if(!child) {
          model.components(`<input class="input ${attr.size} ${attr.round}" placeholder="${attr.placeholder}" name="${attr.name}" required="${attr.required}" type="${attr.type}" />`);
          return;
        }
        //const currentClasses = child?.getClasses() || [];
        //child?.removeClass(currentClasses);
        child?.setClass(['input', attr.size, attr.round]);
        child?.addAttributes({
          placeholder: attr.placeholder,
          name: attr.name,
          required: attr.required,
          type: attr.type,
        });
        // `<input class="input ${attr.size} ${attr.round}" placeholder="${attr.placeholder}" name="${attr.name}" required="${attr.required}" type="${attr.type}" />`;
      }),
    },

    extendFnView: ['updateAttributes'],
    view: {
      updateAttributes() {
        this.el.setAttribute('autocomplete', 'off');
      },
    }
  });


  Components.addType('Input', {
    isComponent: el => el.tagName == 'INPUT',
    extend: 'default',
    model: {
      defaults: {
        stylable: [
          'border-color',
          'border-radius',
          'border-width',
          'border-style',
          'background-color',
        ],
      }
    }
  });
  Components.addType('Textarea', {
    isComponent: el => el.tagName == 'TEXTAREA',
    extend: 'default',
    model: {
      defaults: {
        stylable: [
          'border-color',
          'border-radius',
          'border-width',
          'border-style',
          'background-color',
        ],
      }
    }
  });


  // TEXTAREA
  Components.addType(typeTextarea, {
    extend: typeInput,
    isComponent: el => el.tagName?.toLowerCase() == 'p' && el.classList?.contains(`${classPrefix}${typeTextarea}`),

    model: {
      defaults: {
        tagName: 'p',
        attributes: { type: 'text', class: `control ${classPrefix}${typeTextarea} has-flexible-size is-normal`, name: '', placeholder: 'Placeholder', required: false, rows: '' },
        privateClass: ['textarea', 'undefined'],
        stylable: [],
        draggable: 'form, form *',
        traits: [
          'name',
          'placeholder',
          {
            type: 'class_select',
            options: [
              {value: 'is-normal', name: 'normal'},
              {value: 'is-small', name: 'small'},
              {value: 'is-medium', name: 'medium'},
              {value: 'is-large', name: 'large'},
            ],
            label: 'size',
            name: 'size'
          },
                  {
            type: 'checkbox',
            name: 'required',
          },
                  {
            type: 'class_select',
            options: [
              {value: 'has-flexible-size', name: 'normal'},
              {value: 'has-fixed-size', name: 'fixed'},
            ],
            label: 'fixed size',
            name: 'fixedsize'
            
          },
          {
            type: 'number',
            label: 'Rows',
            name: 'rows',
            placeholder: 'rows',
            min: 0,
            max: 20,
            step: 1,
          }
        ]
      },
      ...locked((attr, [child]) => {
        if(!child) {
          model.components(`<textarea class="textarea ${attr.size} ${attr.fixedsize}" ${attr.rows ? `rows="${attr.rows}"` : ""} placeholder="${attr.placeholder}" name="${attr.name}" required="${attr.required}" />`);
          return;
        }
        //const currentClasses = child?.getClasses() || [];
        //child?.removeClass(currentClasses);
        child?.setClass(['textarea', attr.size, attr.fixedsize].filter(i => !!i));
        child?.addAttributes({
          placeholder: attr.placeholder,
          name: attr.name,
          required: attr.required,
          rows: attr.rows,
        });
        //`<textarea class="textarea ${(child?.getClasses() || []).join(" ")} ${attr.size} ${attr.fixedsize}" ${attr.rows ? `rows="${attr.rows}"` : ""} placeholder="${attr.placeholder}" name="${attr.name}" required="${attr.required}" />`
      }),
    },
  });




  /*
  // OPTION
  Components.addType(typeOption, {
    isComponent: el => el.tagName == 'OPTION',

    model: {
      defaults: {
        tagName: 'option',
        layerable: false,
        droppable: false,
        draggable: false,
        highlightable: false,
      },
    },
  });





  // SELECT
  Components.addType(typeSelect, {
    extend: typeInput,
    isComponent: el => el.tagName == 'SELECT',

    model: {
      defaults: {
        tagName: 'select',
        components: [
          { type: typeOption, content: 'Option 1', attributes: { value: 'opt1' } },
          { type: typeOption, content: 'Option 2', attributes: { value: 'opt2' } },
        ],
        traits: [
          'name',
          {
            name: 'options',
            type: 'select-options'
          },
          {
    type: 'checkbox',
    name: 'required',
  }
        ],
      },
    },

    view: {
      events: {
        mousedown: checkIfInPreview,
      },
    },
  });





  // CHECKBOX
  Components.addType(typeCheckbox, {
    extend: typeInput,
    isComponent: (el) => el.tagName == 'INPUT' && el.type == 'checkbox',

    model: {
      defaults: {
        copyable: false,
        attributes: { type: 'checkbox' },
        traits: [
          idTrait,
          'name',
          'value',
          {
    type: 'checkbox',
    name: 'required',
  },
          {
    type: 'checkbox',
    name: 'checked',
  }
        ],
      },
    },

    view: {
      events: {
        click: checkIfInPreview,
      },

      init() {
        this.listenTo(this.model, 'change:attributes:checked', this.handleChecked);
      },

      handleChecked() {
        this.el.checked = !!this.model.get('attributes')?.checked;
      },
    },
  });





  // RADIO
  Components.addType(typeRadio, {
    extend: typeCheckbox,
    isComponent: el => el.tagName == 'INPUT' && el.type == 'radio',

    model: {
      defaults: {
        attributes: { type: 'radio' },
      },
    },
  });
  */

  editor.Components.addType(typeButton, {
    isComponent: el => el.tagName?.toLowerCase() == 'button' && ["submit", "reset"].includes(el.type),
    model: {
        defaults: {
            tagName: 'button',
            draggable: 'form, form *',
            droppable: inlineflowelement,
            attributes: {
              class: `button ${classPrefix}${typeInput} is-normal is-responsive`,
              name: 'default-name',
              type: 'submit',
            },
            stylable: [
              'background-color',

              'font-size', 'color', 'font-family', /*'font-style',*/ 'font-weight', 
              'text-transform', /*'text-decoration',*/ 'text-shadow', 
              'text-align', 'line-height', 'letter-spacing',
              //'word-spacing', 'text-overflow', 
              //'white-space', 'word-break', 'hyphens', 'line-break', 'writing-mode', 'text-orientation', 'overflow-wrap'
            ],
            traits: [
              'name',
              {
                type: 'select',
                name: 'type',
                options: [
                  { value: 'submit' },
                  { value: 'reset' },
                ]
              },
              {
                type: 'class_select',
                options: [
                    {value: '', name: 'none'},
                    {value: 'is-white', name: 'white'},
                    {value: 'is-dark', name: 'dark'},
                    {value: 'is-black', name: 'black'},
                    {value: 'is-text', name: 'text'},
                    {value: 'is-ghost', name: 'ghost'},
                    {value: 'is-primary', name: 'primary'},
                    {value: 'is-link', name: 'link'},
                    {value: 'is-info', name: 'info'},
                    {value: 'is-success', name: 'success'},
                    {value: 'is-warning', name: 'warning'},
                    {value: 'is-danger', name: 'danger'},

                ],
                label: 'Variant'
              },
              {
                type: 'class_select',
                options: [
                    {value: '', name: 'none'},
                    {value: 'is-light', name: 'light'},
                ],
                label: 'Light variant'
              },
              {
                type: 'class_select',
                options: [
                    {value: 'is-small', name: 'small'},
                    {value: 'is-normal', name: 'normal'},
                    {value: 'is-medium', name: 'medium'},
                    {value: 'is-large', name: 'large'},
                ],
                label: 'Size'
              },
              {
                type: 'class_select',
                options: [
                    {value: '', name: 'Static size'},
                    {value: 'is-responsive', name: 'Responsive size'},
                ],
                label: 'Responsive'
              },
              {
                type: 'class_select',
                options: [
                    {value: '', name: 'Fit width to content'},
                    {value: 'is-fullwidth', name: 'Fullwidth'},
                ],
                label: 'Fullwidth'
              },
              {
                type: 'class_select',
                options: [
                    {value: '', name: 'Normal'},
                    {value: 'is-outlined', name: 'Outlined'},
                ],
                label: 'Outlined'
              },
              {
                type: 'class_select',
                options: [
                    {value: '', name: 'Normal'},
                    {value: 'is-inverted', name: 'Inverted'},
                ],
                label: 'Inverted'
              },
              {
                type: 'class_select',
                options: [
                    {value: '', name: 'Normal'},
                    {value: 'is-rounded', name: 'Rounded'},
                ],
                label: 'Rounded'
              },
            ],
            components: [
              {
                type: 'text',
                components: `Press me!`,
              },
            ],
            styles: ``,
            updated() {
              
            },
            script: function () {
              
            }
          },
    },
    view: {
      events: {
        click: checkIfInPreview,
      },
    },
});




  
  // LABEL
  Components.addType(typeLabel, {
    extend: 'text',
    isComponent: el => el.tagName == 'LABEL',

    model: {
      defaults: {
        tagName: 'label',
        components: 'Label',
        traits: [forTrait],
        stylable: [
          'font-size', 'color', 'font-family', /*'font-style',*/ 'font-weight', 
          'text-transform', /*'text-decoration',*/ 'text-shadow', 
          'text-align', 'line-height', 'letter-spacing',
          //'word-spacing', 'text-overflow', 
          //'white-space', 'word-break', 'hyphens', 'line-break', 'writing-mode', 'text-orientation', 'overflow-wrap'
          'padding', 'margin', 'border'
        ],
        attributes: {class: `${classPrefix}${typeLabel} label` },
      },
    },
  });
  
}