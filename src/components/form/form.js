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
  const locked = (child) => ({
    async updated() {
      const model = this;
      const attr = model.getAttributes();
      if(JSON.stringify(attr) === this.oldAttr) return;
      this.oldAttr = JSON.stringify(attr);
      model.components(child(attr));
      model.get('components').each(model => {
        model.set({
          locked: true, editable: false, hoverable: false, selectable: false, highlightable: false, draggable: false, droppable: false,
          propagate: ['editable', 'locked', 'hoverable', 'selectable', 'highlightable', 'draggable', 'droppable'] });
      });
    },
    async init() {
      const model = this;
      const attr = model.getAttributes();
      if(JSON.stringify(attr) === this.oldAttr) return;
      this.oldAttr = JSON.stringify(attr);
      model.components(child(attr));
      model.get('components').each(model => {
        model.set({
          locked: true, editable: false, hoverable: false, selectable: false, highlightable: false, draggable: false, droppable: false,
          propagate: ['editable', 'locked', 'hoverable', 'selectable', 'highlightable', 'draggable', 'droppable'] });
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
        stylable: [],
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
        attributes: { type: 'text', class: `control ${classPrefix}${typeInput} is-not-rounded is-normal`, name: '', placeholder: 'Placeholder', required: false, size: 'normal', round: 'is-not-rounded' },
        stylable: [],
        draggable: 'form',
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
      ...locked(attr => `<input class="input ${attr.size} ${attr.round}" placeholder="${attr.placeholder}" name="${attr.name}" required="${attr.required}" type="${attr.type}" />`),
    },

    extendFnView: ['updateAttributes'],
    view: {
      updateAttributes() {
        this.el.setAttribute('autocomplete', 'off');
      },
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
        stylable: [],
        draggable: 'form',
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
      ...locked(attr => `<textarea class="textarea ${attr.size} ${attr.fixedsize}" ${attr.rows ? `rows="${attr.rows}"` : ""} placeholder="${attr.placeholder}" name="${attr.name}" required="${attr.required}" />`),
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
    isComponent: el => el.tagName?.toLowerCase() == 'input' && ["submit", "reset"].includes(el.type),
    model: {
        defaults: {
            tagName: 'input',
            draggable: 'form',
            droppable: inlineflowelement,
            attributes: {
              class: `button ${classPrefix}${typeInput} is-normal is-responsive`,
              name: 'default-name',
              type: 'submit',
            },
            stylable: ['background-color'],
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
        attributes: {class: `${classPrefix}${typeLabel} label` },
      },
    },
  });
  
}