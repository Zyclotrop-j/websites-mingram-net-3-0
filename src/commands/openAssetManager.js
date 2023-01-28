export default (editor) => {
    const { Commands, AssetManager } = editor;
    Commands.add('open-asset-manager', () => AssetManager.open({
        types: ['image', 'document', 'video', 'audio', 'other'], // This is the default option
        // Without select, nothing will happen on asset selection
        select(asset, complete) {
          console.log(asset, complete);
        }
      })
    );

    const panelManager = editor.Panels;

    panelManager.addButton('options',{
        id: 'open-asset-manager',
        className: 'open-asset-manager',
        attributes: { title: 'Open Asset Manager'},
        label: `<svg style="display: block" viewBox="0 0 2048 2048">
            <path fill="currentColor" d="M608 128q45 0 77 9t58 24t46 31t40 31t44 23t55 10h992q27 0 50 10t40 27t28 41t10 50v640h-128V384H928q-31 0-54 9t-44 24t-41 31t-45 31t-58 23t-78 10H128v1152h768v128H0V256q0-27 10-50t27-40t41-28t50-10h480zm0 256q24 0 42-4t33-13t29-20t32-27q-17-15-31-26t-30-20t-33-13t-42-5H128v128h480zm416 768h1024v896H1024v-896zm128 128v128h128v128h-128v128h128v128h-128v128h768v-128h-128v-128h128v-128h-128v-128h128v-128h-768zm-123-295q-17-41-53-65t-80-24v448q0 44-19 79t-52 61t-72 38t-81 14q-41 0-81-13t-72-39t-51-60t-20-80q0-44 19-79t52-61t72-38t81-14q51 0 96 18V768h128q41 0 79 12t72 34t58 53t42 69l-118 49zm-357 423q13 0 29-4t32-12t25-20t10-28q0-16-10-28t-25-20t-31-12t-30-4q-13 0-29 4t-32 12t-25 20t-10 28q0 16 10 28t25 20t31 12t30 4z"/>
          </svg>`,
        command: () => editor.runCommand('open-asset-manager'),
    });
}