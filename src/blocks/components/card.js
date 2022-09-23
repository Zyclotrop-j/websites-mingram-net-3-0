import card, {
    type as cardtype,
    header as cardheader,
    content as cardcontent,
    image as cardimage,
    footer as cardfooter,
    title as cardtitle,
    icon as cardicon,
    footeritem as cardfooteritem,
} from "../../components/card/card";
import iconCard from "./card-icons/card.svg";
import iconCardHeader from "./card-icons/card-header.svg";
import iconCardHeaderTitle from "./card-icons/card-header-title.svg";
import iconCardHeaderIcon from "./card-icons/card-header-icon.svg";
import iconCardImage from "./card-icons/card-image.svg";
import iconCardContent from "./card-icons/card-content.svg";
import iconCardFooter from "./card-icons/card-footer.svg";
import iconCardFooterItem from "./card-icons/card-footer-item.svg";

export default [
    {
        id: `${cardtype}-card`,
        label: `<figure style="margin: 5px;" class="w80">
        ${iconCard}
        <figcaption>Card</figcaption></figure>`,
        content: { type: cardtype },
        category: 'Card'
    },
    {
        id: `${cardheader}-card`,
        label: `<figure style="margin: 5px;" class="w80">
        ${iconCardHeader}
        <figcaption>Card header</figcaption></figure>`,
        content: { type: cardheader },
        category: 'Card'
    },
    {
        id: `${cardcontent}-card`,
        label: `<figure style="margin: 5px;" class="w80">
        ${iconCardContent}
        <figcaption>Card content</figcaption></figure>`,
        content: { type: cardcontent },
        category: 'Card'
    },
    {
        id: `${cardimage}-card`,
        label: `<figure style="margin: 5px;" class="w80">
        ${iconCardImage}
        <figcaption>Card image</figcaption></figure>`,
        content: { type: cardimage },
        category: 'Card'
    },
    {
        id: `${cardfooter}-card`,
        label: `<figure style="margin: 5px;" class="w80">
        ${iconCardFooter}
        <figcaption>Card footer</figcaption></figure>`,
        content: { type: cardfooter },
        category: 'Card'
    },
    {
        id: `${cardtitle}-card`,
        label: `<figure style="margin: 5px;" class="w80">
        ${iconCardHeaderTitle}
        <figcaption>Card header title</figcaption></figure>`,
        content: { type: cardtitle },
        category: 'Card'
    },
    {
        id: `${cardicon}-card`,
        label: `<figure style="margin: 5px;" class="w80">
        ${iconCardHeaderIcon}
        <figcaption>Card header icon</figcaption></figure>`,
        content: { type: cardicon },
        category: 'Card'
    },
    {
        id: `${cardfooteritem}-card`,
        label: `<figure style="margin: 5px;" class="w80">
        ${iconCardFooterItem}
        <figcaption>Card-footer-item</figcaption></figure>`,
        content: { type: cardfooteritem },
        category: 'Card'
    },
];