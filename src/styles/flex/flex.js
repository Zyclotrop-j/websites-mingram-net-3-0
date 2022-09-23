export default editor => {
    const css = editor.Css;

    const styleManager = editor.StyleManager;
    styleManager.addSector('flex-container', {
        name: 'Container',
        open: false,
        properties: [
          {
            id: 'flex-direction-row',
            label: 'Direction',
            property: 'flex-direction',
            type: 'select',
            default: 'row',
            options: [
              { id: 'row', label: 'row' },
              { id: 'row-reverse', label: 'row-reverse' },
              { id: 'column', label: 'column' },
              { id: 'column-reverse', label: 'column-reverse' },
            ],
          },
          {
            id: 'flex-direction-column',
            label: 'Direction',
            property: 'flex-direction',
            type: 'select',
            default: 'column',
            options: [
              { id: 'row', label: 'row' },
              { id: 'row-reverse', label: 'row-reverse' },
              { id: 'column', label: 'column' },
              { id: 'column-reverse', label: 'column-reverse' },
            ],
          },
          {
            label: 'Wrap',
            property: 'flex-wrap',
            type: 'select',
            default: 'nowrap',
            options: [
              { id: 'nowrap', label: 'nowrap' },
              { id: 'wrap', label: 'wrap' },
              { id: 'wrap-reverse', label: 'wrap-reverse' },
            ],
          },
          {
            label: 'Justify between',
            property: 'justify-content',
            type: 'select',
            default: 'flex-start',
            options: [
              { id: 'flex-start', label: 'Start' },
              { id: 'flex-end', label: 'End' },
              { id: 'center', label: 'Center' },
              { id: 'space-between', label: 'space between' },
              { id: 'space-around', label: 'space around' },
              { id: 'space-evenly', label: 'space evenly' },
            ],
          },
          {
            label: 'Align between',
            property: 'align-content',
            type: 'select',
            default: 'flex-start',
            options: [
              { id: 'flex-start', label: 'Start' },
              { id: 'flex-end', label: 'End' },
              { id: 'center', label: 'Center' },
              { id: 'space-between', label: 'space between' },
              { id: 'space-around', label: 'space around' },
              { id: 'space-evenly', label: 'space evenly' },
            ]
          },
          {
            label: 'Align all',
            property: 'align-items',
            type: 'select',
            default: 'flex-start',
            options: [
              { id: 'flex-start', label: 'Start' },
              { id: 'flex-end', label: 'End' },
              { id: 'center', label: 'Center' },
              { id: 'stretch', label: 'Stretch' },
              { id: 'baseline', label: 'Baseline' },
            ],
          },
          {
            label: 'Gap',
            property: 'gap',
            type: 'composite',
            detached: true,
            properties: [
              {
                label: 'Row gap',
                property: 'row-gap',
                type: 'size-preset',
              },
              {
                label: 'Column gap',
                property: 'column-gap',
                type: 'size-preset',
              }
            ]
          },
        ],
    });
    styleManager.addSector('flex-child', {
      name: 'Item',
      open: false,
      properties: [
        {
          label: 'Order',
          property: 'order',
          type: 'number',
          units: [],
          min: 0,
          requiresParent: {
            display: ['flex']
          }
        },
        {
          label: 'Grows-factor',
          property: 'flex-grow',
          type: 'number',
          units: [],
          min: 0,
          requiresParent: {
            display: ['flex']
          }
        },
        {
          label: 'Shrink-factor',
          property: 'flex-shrink',
          type: 'number',
          units: [],
          min: 0,
          requiresParent: {
            display: ['flex']
          }
        },
        {
          label: 'Base size',
          property: 'flex-basis',
          type: 'size-preset',
          requiresParent: {
            display: ['flex']
          }
        },
        {
          label: 'Align self',
          property: 'align-self',
          type: 'select',
          default: 'flex-start',
          options: [
            { id: 'flex-start', label: 'Start' },
            { id: 'flex-end', label: 'End' },
            { id: 'center', label: 'Center' },
            { id: 'stretch', label: 'Stretch' },
            { id: 'baseline', label: 'Baseline' },
          ],
          requiresParent: {
            display: ['flex']
          }
        },
        {
          label: 'Justify self',
          property: 'justify-self',
          type: 'select',
          default: 'flex-start',
          options: [
            { id: 'flex-start', label: 'Start' },
            { id: 'flex-end', label: 'End' },
            { id: 'center', label: 'Center' },
            { id: 'stretch', label: 'Stretch' },
            { id: 'baseline', label: 'Baseline' },
          ],
          requiresParent: {
            display: ['flex']
          }
        },
      ]
    });
    styleManager.addSector('grid-12-width', {
      name: 'Grid item width',
      open: false,
      properties: [
        {
          id: 'grid-12-width-item-width-w',
          label: 'Width (overwrite)',
          property: '--w',
          type: 'select',
          default: '',
          options: [
            { id: '1', label: '1' },
            { id: '2', label: '2' },
            { id: '3', label: '3' },
            { id: '4', label: '4' },
            { id: '5', label: '5' },
            { id: '6', label: '6' },
            { id: '7', label: '7' },
            { id: '8', label: '8' },
            { id: '9', label: '9' },
            { id: '10', label: '10' },
            { id: '11', label: '11' },
            { id: '12', label: '12' },
          ]
        },
      ]
    });
}
