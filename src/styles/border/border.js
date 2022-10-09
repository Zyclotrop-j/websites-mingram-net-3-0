export default editor => {
    const css = editor.Css;

    const styleManager = editor.StyleManager;
    const borderStyleSelect = {
      type: 'select',
      options: [
        { id: 'none', name: 'none' },
        { id: 'hidden', name: 'hidden' },
        { id: 'dotted', name: 'dotted' },
        { id: 'dashed', name: 'dashed' },
        { id: 'solid', name: 'solid' },
        { id: 'double', name: 'double' },
        { id: 'groove', name: 'groove' },
        { id: 'ridge', name: 'ridge' },
        { id: 'inset', name: 'inset' },
        { id: 'outset', name: 'outset' },
      ]
    };
    styleManager.addSector('border', {
        name: 'Border',
        open: false,
        properties: [
          {
            label: 'Border radius',
            property: 'border-radius',
            type: 'composite',
            detached: true,
            properties: [
              {
                label: 'Border radius top-left',
                property: 'border-top-left-radius',
                type: 'size-preset',
              },
              {
                label: 'Border radius top-right',
                property: 'border-top-right-radius',
                type: 'size-preset',
              },
              {
                label: 'Border radius bottom-right',
                property: 'border-bottom-right-radius',
                type: 'size-preset',
              },
              {
                label: 'Border radius bottom-left',
                property: 'border-bottom-left-radius',
                type: 'size-preset',
              },
            ]
          },
          {
            label: 'Border width',
            property: 'border-width',
            type: 'composite',
            detached: true,
            properties: [
              {
                label: 'Border width top',
                property: 'border-top-width',
                type: 'size-preset',
              },
              {
                label: 'Border width right',
                property: 'border-right-width',
                type: 'size-preset',
              },
              {
                label: 'Border width bottom',
                property: 'border-bottom-width',
                type: 'size-preset',
              },
              {
                label: 'Border width left',
                property: 'border-left-width',
                type: 'size-preset',
              },
            ]
          },
          {
            label: 'Border style',
            property: 'border-style',
            type: 'composite',
            detached: true,
            properties: [
              {
                label: 'Border style top',
                property: 'border-top-style',
                ...borderStyleSelect,
              },
              {
                label: 'Border style right',
                property: 'border-right-style',
                ...borderStyleSelect,
              },
              {
                label: 'Border style bottom',
                property: 'border-bottom-style',
                ...borderStyleSelect,
              },
              {
                label: 'Border style left',
                property: 'border-left-style',
                ...borderStyleSelect,
              },
            ]
          },
        ],
    });
    
}
