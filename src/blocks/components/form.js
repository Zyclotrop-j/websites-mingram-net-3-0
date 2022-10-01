import { typeForm, typeInput, typeTextarea, typeButton, typeLabel } from "../../components/form/form";

export default [
    {
        id: 'Form',
        label: `<figure style="margin: 5px;">
        
        <figcaption>Form</figcaption></figure>`,
        content: { type: typeForm },
        category: 'Form',
    },
    {
        id: 'Input',
        label: `<figure style="margin: 5px;">
        
        <figcaption>Input</figcaption></figure>`,
        content: { type: typeInput },
        category: 'Form',
    },
    {
        id: 'Textarea',
        label: `<figure style="margin: 5px;">
        
        <figcaption>Textarea</figcaption></figure>`,
        content: { type: typeTextarea },
        category: 'Form',
    },
    {
        id: 'SubmitResetButton',
        label: `<figure style="margin: 5px;">
        
        <figcaption>Form buton</figcaption></figure>`,
        content: { type: typeButton },
        category: 'Form',
    },
    {
        id: 'Label',
        label: `<figure style="margin: 5px;">
        
        <figcaption>Label</figcaption></figure>`,
        content: { type: typeLabel },
        category: 'Form',
    },
];