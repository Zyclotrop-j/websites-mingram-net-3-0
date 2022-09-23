import list, {
    type as listtype,
    listitem as listlistitem,
    title as listtitle,
    content as listcontent,
    description as listdescription,
    image as listimage,
} from "../../components/list/list";
import iconListTitle from './list-icons/list-title.svg';
import iconListContent from './list-icons/list-content.svg';
import iconListItem from './list-icons/list-item.svg';
import iconListImage from './list-icons/list-image.svg';
import iconListDescription from './list-icons/list-description.svg';
import iconList from './list-icons/list.svg';

export default [
    {
        id: `${listtype}-list`,
        label: `<figure style="margin: 5px;" class="w80">
        ${iconList}
        <figcaption>List</figcaption></figure>`,
        content: { type: listtype },
        category: 'List'
    },
    {
        id: `${listlistitem}-list`,
        label: `<figure style="margin: 5px;" class="w80">
        ${iconListItem}
        <figcaption>List item</figcaption></figure>`,
        content: { type: listlistitem },
        category: 'List'
    },
    {
        id: `${listtitle}-list`,
        label: `<figure style="margin: 5px;" class="w80">
        ${iconListTitle}
        <figcaption>LIst item title</figcaption></figure>`,
        content: { type: listtitle },
        category: 'List'
    },
    {
        id: `${listcontent}-list`,
        label: `<figure style="margin: 5px;" class="w80">
        ${iconListContent}
        <figcaption>List item content</figcaption></figure>`,
        content: { type: listcontent },
        category: 'List'
    },
    {
        id: `${listdescription}-list`,
        label: `<figure style="margin: 5px;" class="w80">
        ${iconListDescription}
        <figcaption>List item description</figcaption></figure>`,
        content: { type: listdescription },
        category: 'List'
    },
    {
        id: `${listimage}-list`,
        label: `<figure style="margin: 5px;" class="w80">
        ${iconListImage}
        <figcaption>List image</figcaption></figure>`,
        content: { type: listimage },
        category: 'List'
    },
];