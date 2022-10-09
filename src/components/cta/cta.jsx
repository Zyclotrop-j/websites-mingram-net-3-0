import draggable from '../../helpers/draggable';
import inlineflowelement from '../../helpers/inlineflowelement';

export const type =  'cta';
export const grouptype = 'buttongroup';

const anims = [
  "bounce",
  "flash",
  "pulse",
  "rubberBand",
  "shakeX",
  "shakeY",
  "headShake",
  "swing",
  "tada",
  "wobble",
  "jello",
  "heartBeat",
  "backInDown",
  "backInLeft",
  "backInRight",
  "backInUp",
  "backOutDown",
  "backOutLeft",
  "backOutRight",
  "backOutUp",
  "bounceIn",
  "bounceInDown",
  "bounceInLeft",
  "bounceInRight",
  "bounceInUp",
  "bounceOut",
  "bounceOutDown",
  "bounceOutLeft",
  "bounceOutRight",
  "bounceOutUp",
  "fadeIn",
  "fadeInDown",
  "fadeInDownBig",
  "fadeInLeft",
  "fadeInLeftBig",
  "fadeInRight",
  "fadeInRightBig",
  "fadeInUp",
  "fadeInUpBig",
  "fadeInTopLeft",
  "fadeInTopRight",
  "fadeInBottomLeft",
  "fadeInBottomRight",
  "fadeOut",
  "fadeOutDown",
  "fadeOutDownBig",
  "fadeOutLeft",
  "fadeOutLeftBig",
  "fadeOutRight",
  "fadeOutRightBig",
  "fadeOutUp",
  "fadeOutUpBig",
  "fadeOutTopLeft",
  "fadeOutTopRight",
  "fadeOutBottomRight",
  "fadeOutBottomLeft",
  "flip",
  "flipInX",
  "flipInY",
  "flipOutX",
  "flipOutY",
  "lightSpeedInRight",
  "lightSpeedInLeft",
  "lightSpeedOutRight",
  "lightSpeedOutLeft",
  "rotateIn",
  "rotateInDownLeft",
  "rotateInDownRight",
  "rotateInUpLeft",
  "rotateInUpRight",
  "rotateOut",
  "rotateOutDownLeft",
  "rotateOutDownRight",
  "rotateOutUpLeft",
  "rotateOutUpRight",
  "hinge",
  "jackInTheBox",
  "rollIn",
  "rollOut",
  "zoomIn",
  "zoomInDown",
  "zoomInLeft",
  "zoomInRight",
  "zoomInUp",
  "zoomOut",
  "zoomOutDown",
  "zoomOutLeft",
  "zoomOutRight",
  "zoomOutUp",
  "slideInDown",
  "slideInLeft",
  "slideInRight",
  "slideInUp",
  "slideOutDown",
  "slideOutLeft",
  "slideOutRight",
  "slideOutUp"
];

export default editor => {
    const domc = editor.DomComponents;
    const defaultType = domc.getType('default');
    const textType = domc.getType('text');
    const defaultModel = defaultType.model;
    const defaultView = defaultType.view;

    editor.Components.addType(type, {
        isComponent: el => el?.tagName?.toLowerCase() === 'button' && !["submit", "reset"].includes(el.type),
        model: {
            defaults: {
                tagName: 'button',
                draggable: draggable('*'),
                droppable: inlineflowelement,
                attributes: {
                  // permanent dom-attributes
                  class: 'button is-normal is-responsive',
                  // defaults for traits
                  name: 'default-name',
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
                  {
                    type: 'text',
                    name: 'data-target',
                    label: 'Target selector'
                  },
                  {
                    type: 'select',
                    options: [
                        { value: 'pointerenter', name: 'hover' }, // pointerout
                        { value: 'pointerdown', name: 'pressed' }, // pointerup
                        { value: 'focus', name: 'focus' }, // blur
                        { value: 'click', name: 'click' },
                        { value: 'auxclick', name: 'aux click' },
                        { value: 'dblclick', name: 'double click' },
                    ],
                    label: 'Action trigger',
                    name: 'data-trigger',
                  },
                  /*{
                    type: 'select',
                    options: [
                        { value: 'toggle', name: 'toggle effect' },
                        { value: 'add', name: 'add effect' },
                        { value: 'remove', name: 'remove effect' },
                    ],
                    label: 'Action mode',
                    name: 'data-mode',
                  },*/
                  {
                    type: 'select',
                    options: anims.map((anim) => ({
                      value: `animate__${anim}`, name: anim
                    })),
                    privateClass: true,
                    label: 'Effect',
                    name: 'data-effect',
                  },
                  {
                    type: 'select',
                    options: [
                      { value: 'auto', name: 'auto' },
                      ...anims.map((anim) => ({
                        value: `animate__${anim}`, name: anim
                      }))
                    ],
                    privateClass: true,
                    label: 'Opposide effect',
                    name: 'data-oppopside',
                  },
                  {
                    type: 'button',
                    text: 'Play!',
                    full: true, // Full width button
                    command: function(editor, trait) {
                      const el = trait.target.view.el;
                      const event = new Event(el.dataset.trigger?.trim() ?? 'click');
                      el.dispatchEvent(event);
                    },
                  
                  }
                ],
                components: [
                  {
                    type: 'text',
                    components: `Press me!`,
                  },
                ],
                styles: `
                    
                `,
                updated() {
                  const effect = this.dataset.effect?.trim() || 'bounce';
                  const targetdomnode = [...(this.ownerDocument ?? document).querySelectorAll(this.dataset.target?.trim())];
                  targetdomnode.forEach(el => el.classList.forEach(i => {
                    if(el.startsWith('animate__')) el.classList.remove(i)
                  }));
                },
                script: function () {
                  const base = 'animate__animated';
                  const evt = () => this.dataset.trigger?.trim() || 'click';
                  const effect = () => this.dataset.effect?.trim() || 'bounce';
                  const target = () => this.dataset.target?.trim();
                  const oppopside = () => this.dataset.oppopside?.trim();
                  const action = evtKind => (e) => {
                    if(evtKind !== evt()) return;
                    if(!target()) return;
                    const targetdomnode = [...(this.ownerDocument ?? document).querySelectorAll(target())]; 
                    if(!targetdomnode.length) {
                      console.warn(`Targetnode for ${target()} not found - check you got the id right!`);
                      return;
                    }
                    const className = effect();
                    
                    const reverse = oppopside() === 'auto' ? (className === 'jackInTheBox' ? 'jackInTheBox' : className
                      .replace(/In|Out/, i => i === "In" ? "Out" : "In")
                      .replace(/Left|Right/, i => i === "Left" ? "Right" : "Left")
                      .replace(/Up|Down/, i => i === "Up" ? "Down" : "Up")
                      .replace(/Top|Bottom/, i => i === "Top" ? "Bottom" : "Top")) : oppopside();
                    const reverseClass = el => {
                      el.classList.forEach(i => {
                        if(i.startsWith('animate__') && ![className, reverse, base].includes(i)) el.classList.remove(i);
                      });
                      el.classList.add(base);
                      if(reverse === className && el.classList.contains(className)) {
                        el.classList.remove(className);
                        return setTimeout(() => el.classList.add(className), 1);
                      }
                      if(el.classList.contains(className)) return el.classList.replace(className, reverse);
                      if(el.classList.contains(reverse)) return el.classList.replace(reverse, className);
                      return el.classList.add(className);
                    };
                    switch (evt()) {
                      case 'click':
                      case 'auxclick':
                      case 'dbclick':
                        targetdomnode.forEach(reverseClass);
                        break;
                      case 'pointerenter':
                        targetdomnode.forEach(reverseClass);
                        this.addEventListener('pointerout', () => {
                          targetdomnode.forEach(reverseClass);
                        }, { once: true });
                        break;
                      case 'pointerdown':
                        targetdomnode.forEach(reverseClass);
                        this.addEventListener('pointerup', () => {
                          targetdomnode.forEach(reverseClass);
                        }, { once: true });
                        break;
                      case 'focus':
                        targetdomnode.forEach(reverseClass);
                        this.addEventListener('blur', () => {
                          targetdomnode.forEach(reverseClass);
                        }, { once: true });
                        break;
                    }
                  }
                  const evts = [
                    'pointerenter',
                    'pointerdown',
                    'click',
                    'auxclick',
                    'dblclick',
                    'focus',
                  ];
                  const stringCollapse = 'cta-evet'
                  if( !(stringCollapse in this ) ) {
                    evts.forEach(evt => {
                      this.addEventListener(evt, action(evt));
                    });
                  }
                  this[stringCollapse] = 1;
                }
              },
        },
        view: {
            
        }
        // view: -> this defines editor-only stuff
    });

    editor.Components.addType(grouptype, {
      isComponent: el => el?.classList?.contains('buttons'), // only used if we need to parse external html - internal ones already has data-gjs-type-attr
      model: {
          defaults: {
              tagName: 'div',
              draggable: draggable('*'),
              droppable: `button.button`,
              attributes: {
                class: 'buttons has-addons',
              },
              stylable: [
                'margin',
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
              ],
              traits: [
                {
                  type: 'class_select',
                  options: [
                      {value: '', name: 'with gaps'},
                      {value: 'has-addons', name: 'normal'},
                  ],
                  label: 'Gaps'
                },
              ],
              components: [
                {
                  type: type,
                  components: [{
                    type: 'text',
                    components: `Press me 1!`,
                  }],
                },
                {
                  type: type,
                  components: [{
                    type: 'text',
                    components: `Press me 2!`,
                  }],
                },
                {
                  type: type,
                  components:[ {
                    type: 'text',
                    components: `Press me 3!`,
                  }],
                },
              ],
              styles: `
                  .buttons {
                    display: inline-flex;
                  }
              `,
            }
      },
      view: {
          
      }
      // view: -> this defines editor-only stuff
  });
}