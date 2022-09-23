export default editor => {
    const css = editor.Css;

    const styleManager = editor.StyleManager;
    styleManager.addSector('img', {
        name: 'Image display',
        open: false,
        properties: [
          {
            id: 'object-fit',
            label: 'Object fit',
            property: 'object-fit',
            type: 'select',
            default: 'unset',
            options: [
              { label: 'contain image (contain)', id: 'contain' },
              { label: 'cover container (cover)', id: 'cover' },
              { label: 'stretch to fit (fill)', id: 'fill' },
              { label: 'no resize (none)', id: 'none' },
              { label: 'always scale down (scale-down)', id: 'scale-down' },
              { label: 'unset', id: 'unset' },
            ],
          },
          {
            id: 'image-rendering',
            label: 'Image upscale rendering',
            property: 'image-rendering',
            type: 'select',
            default: 'auto',
            options: [
              { label: 'auto', id: 'auto' },
              { label: 'smooth', id: 'smooth' },
              { label: 'high-quality', id: 'high-quality' },
              { label: 'crisp-edges', id: 'crisp-edges' },
              { label: 'pixelated', id: 'pixelated' },
            ],
          },
          {
            id: 'object-position',
            label: 'Image positioning',
            property: 'object-position',
            type: 'composite',
            default: '50% 50%',
            detached: false,
            separator: " ",
            join: " ",
            properties: [
              {
                id: 'object-position-vertical',
                label: 'from left',
                type: 'number',
                units: ["%", "px", "em", "rem"],
                min: 0,
                max: 100,
                step: 1,
              },
              {
                id: 'object-position-horizontal',
                label: 'from top',
                type: 'number',
                units: ["%", "px", "em", "rem"],
                min: 0,
                max: 100,
                step: 1,
              }
            ]
          },
          
        ],
    });
    
}
