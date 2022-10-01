class CustomInput extends HTMLElement {
    // useful values for <input>
    static get observedAttributes() {
      return ['name', 'disabled', 'placeholder', 'value'];
    }
    constructor() {
      super();
      this.attachShadow({mode: 'open'});
      this.shadowRoot.innerHTML = `<style>
        :host {
          display: inline-block;
        }
      </style>`;
      this.input = document.createElement('input');
      this.shadowRoot.appendChild(this.input);
      // keep reference to <form> for cleanup
      this._form = null;
      this._handleFormData = this.handleFormData.bind(this);
    }
    // FormData event is sent on <form> submission, so we can modify the data before transmission.
    // It has a .formData property, and that's all we need.
    handleFormData({formData}) {
      // add our name and value to the form's submission data if we're not disabled
      if (!this.input.disabled) {
        // https://developer.mozilla.org/en-US/docs/Web/API/FormData
        formData.append(this.input.name, this.input.value);
      }
    }
    // sync observed attributes to <input>
    attributeChangedCallback(name, oldValue, newValue) {
      const value = name === 'disabled' ? this.hasAttribute('disabled') : newValue;
      this.input[name] = value;
    }
    // find the <form>, and attach the `formdata` listener
    connectedCallback() {
      this._form = this.findContainingForm();
      if (this._form) {
        this._form.addEventListener('formdata', this._handleFormData);
      }
    }
    // remove the `formdata` listener if we're removed
    disconnectedCallback() {
      if (this._form) {
        this._form.removeEventListener('formdata', this._handleFormData);
        this._form = null;
      }
    }
    // find the <form> we are contained in
    findContainingForm() {
      // can only be in a form in the same "scope", ShadowRoot or Document
      const root = this.getRootNode();
      const forms = Array.from(root.querySelectorAll('form'));
      // we can only be in one <form>, so the first one to contain us is the correct one
      return forms.find((form) => form.contains(this)) || null;
    }
  }

  customElements.define('custom-input', CustomInput);
  // <custom-input name="custom element" placeholder="custom input" value="World"></custom-input>
