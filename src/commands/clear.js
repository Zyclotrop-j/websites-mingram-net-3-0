import swal from 'sweetalert';

export default (editor) => {
    const { Commands } = editor;
    Commands.add('canvas-clear', e => swal({
        title: "Are you sure to clear the canvas?",
        text: `Once cleared, there is no way to get back your process!`,
        buttons: true,
        dangerMode: true,
    })
    .then((willDelete) => {
        if (willDelete) {
            editor.DomComponents.clear();
        }
    }));

    const panelManager = editor.Panels;

    panelManager.addButton('options',{
        id: 'canvas-clear',
        className: 'canvas-clear',
        attributes: { title: 'Clear canvas'},
        label: `<svg style="display: block" viewBox="0 0 24 24">
              <path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
          </svg>`,
        command: () => editor.runCommand('canvas-clear'),
    });
}