export default editor => {
    const css = editor.Css;

    const styleManager = editor.StyleManager;
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
        ],
    });
    
}
