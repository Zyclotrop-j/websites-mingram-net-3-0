import ColorManger from './colors/generate';

export default function themManagerManager(editor, { close, open }) {
    const div = document.createElement("div");
    const colorManager = ColorManger(editor, { close, open });
    
    return () => {
        colorManager.onOpen();
        div.appendChild(colorManager.div);
        const onclose = () => {
            colorManager.onClose();
            div.removeChild(colorManager.div);
        };

        return [div, onclose];
    }
};