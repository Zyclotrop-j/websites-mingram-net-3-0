export default [
    {
        id: 'link-arrow-decoration',
        label: `<figure style="margin: 5px;" class="w100">
            ${""}
        <figcaption>Block link with arrow</figcaption></figure>`,
        content: `<a class="" data-type="block" href="#" title="" target="self" rel="" data-force="inline" ><span>Learn more</span><icon-l icon="icons/maki-arrow.svg" iconname="arrow" space="var(--O-0)" id="i0j4iu">
        </icon-l></a><style>
        #i0j4iu{
            font-size:1em;
            align-self:center;
            margin-left:var(--L3);
          }
        </style>`,
        category: 'Decorations',
        kind: 'Part'
    },
    {
        id: 'views-and-comments-decoration',
        label: `<figure style="margin: 5px;" class="w100">
            ${""}
        <figcaption>Views and comments</figcaption></figure>`,
        content: `<p class="content" id="i6p6g">
        <icon-l id="i9ubo" icon="icons/ph-eye.svg" iconname="eye" space="var(--s-3)">
        </icon-l>
        <span id="if6oh">1.2K</span>
        <span data-spacer="horizontal" id="i2bl3"></span>
        <icon-l id="ig5q9" icon="icons/simple-line-icons-bubble.svg" iconname="bubble" space="var(--s-3)">
        </icon-l>
        <span id="ijn5g">6</span>
      </p><style>
            #i6p6g{
                color:var(--grey);
            }
            #i2bl3{
                width:var(--L6);
                vertical-align:text-bottom;
              }
        </style>`,
        category: 'Decorations',
        kind: 'Part'
    },
    {
        id: 'line-decoration',
        label: `<figure style="margin: 5px;" class="w100">
            ${""}
        <figcaption>Decorative line</figcaption></figure>`,
        content: `<div data-spacer="vertical" id="iwbai">
        <span data-spacer="horizontal" id="i0j8i"></span><style>
          #iwbai{
            height:0.25rem;
            --w2:100%;
            color:var(--primary);
          }
          #i0j8i{
            width:5rem;
            --w:0;
          }
        </style>`,
        category: 'Decorations',
        kind: 'Part'
    },
    {
        id: 'profile-combo',
        label: `<figure style="margin: 5px;" class="w100">
            ${""}
        <figcaption>Profile</figcaption></figure>`,
        content: `<sidebar-l sidewidth="var(--max)" contentmin="5%" space="var(--O-0)" id="ia33j">
        <icon-l space="var(--O-0)" icon="icons/radix-icons-person.svg" iconname="person" id="iqmud">
        </icon-l>
        <box-l>
          <h4 class="subtitle is-5" name="default-name" id="i945a">
            <span id="imy0c">Alper Kamu</span>
          </h4>
          <p class="content" name="default-name" id="i7gei">
            <span id="ijstg">DESIGNER</span>
          </p>
        </box-l>
      </sidebar-l><style>
      #i945a{
        margin-bottom:var(--O-0);
      }
      #i7gei{
        color:var(--grey);
      }
      #iqmud{
        font-size:3em;
        margin-top:auto;
        margin-bottom:auto;
      }
      </style>`,
        category: 'Combo',
        kind: 'Part'
    },
];