import box, { type as boxtype, icon as boxicon } from "../../components/everylayout/Box/index";
import center, { type as centertype, icon as centericon } from "../../components/everylayout/Center/index";
import cluster, { type as clustertype, icon as clustericon } from "../../components/everylayout/Cluster/index";
import cover, { type as covertype, icon as covericon } from "../../components/everylayout/Cover/index";
import frame, { type as frametype, icon as frameicon } from "../../components/everylayout/Frame/index";
import grid, { type as gridtype, icon as gridicon } from "../../components/everylayout/Grid/index";
import icon, { type as icontype, icon as iconicon } from "../../components/everylayout/Icon/index";
import imposter, { type as impostertype, icon as impostericon } from "../../components/everylayout/Imposter/index";
import reel, { type as reeltype, icon as reelicon } from "../../components/everylayout/Reel/index";
import sidebar, { type as sidebartype, icon as sidebaricon } from "../../components/everylayout/Sidebar/index";
import stack, { type as stacktype, icon as stackicon } from "../../components/everylayout/Stack/index";
import switcher, { type as switchertype, icon as switchericon } from "../../components/everylayout/Switcher/index";

export default [
    {
        id: 'Layout-box',
        label: `<figure style="margin: 5px;">${boxicon.default}<figcaption>Box</figcaption></figure>`,
        content: { type: boxtype },
        category: 'Basic',
    },
    {
        id: 'Layout-center',
        label: `<figure style="margin: 5px;">${centericon.default}<figcaption>Center</figcaption></figure>`,
        content: { type: centertype },
        category: 'Layout'
    },
    {
        id: 'Layout-cluster',
        label: `<figure style="margin: 5px;">${clustericon.default}<figcaption>Cluster</figcaption></figure>`,
        content: { type: clustertype },
        category: 'Grid'
    },
    {
        id: 'Layout-cover',
        label: `<figure style="margin: 5px;">${covericon.default}<figcaption>Cover</figcaption></figure>`,
        content: { type: covertype },
        category: 'Layout'
    },
    {
        id: 'Layout-frame',
        label: `<figure style="margin: 5px;">${frameicon.default}<figcaption>Frame</figcaption></figure>`,
        content: { type: frametype },
        category: 'Layout'
    },
    {
        id: 'Layout-grid',
        label: `<figure style="margin: 5px;">${gridicon.default}<figcaption>Grid</figcaption></figure>`,
        content: { type: gridtype },
        category: 'Grid'
    },
    {
        id: 'Layout-icon',
        label: `<figure style="margin: 5px;">${iconicon.default}<figcaption>Icon</figcaption></figure>`,
        content: { type: icontype },
        category: 'Media'
    },
    {
        id: 'Layout-imposter',
        label: `<figure style="margin: 5px;">${impostericon.default}<figcaption>Imposter</figcaption></figure>`,
        content: { type: impostertype },
        category: 'Layout'
    },
    {
        id: 'Layout-reel',
        label: `<figure style="margin: 5px;">${reelicon.default}<figcaption>Reel</figcaption></figure>`,
        content: { type: reeltype },
        category: 'Layout'
    },
    {
        id: 'Layout-sidebar',
        label: `<figure style="margin: 5px;">${sidebaricon.default}<figcaption>Sidebar</figcaption></figure>`,
        content: { type: sidebartype },
        category: 'Layout'
    },
    {
        id: 'Layout-stack',
        label: `<figure style="margin: 5px;">${stackicon.default}<figcaption>Stack</figcaption></figure>`,
        content: { type: stacktype },
        category: 'Basic'
    },
    {
        id: 'Layout-switcher',
        label: `<figure style="margin: 5px;">${switchericon.default}<figcaption>Switcher</figcaption></figure>`,
        content: { type: switchertype },
        category: 'Layout'
    },
];