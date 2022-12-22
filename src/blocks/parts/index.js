export default [
    {
        id: 'link-arrow-decoration',
        label: `<figure style="margin: 5px;" class="w100">
            ${""}
        <figcaption>Block link with arrow</figcaption></figure>`,
        content: `<a data-gjs-custom-name="Link (arrow)" class="" data-type="block" href="#" title="" target="self" rel="" data-force="inline" ><span>Learn more</span><icon-l icon="icons/maki-arrow.svg" iconname="arrow" space="var(--O-0)" id="i0j4iu">
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
        content: `<p class="content" id="i6p6g" data-gjs-custom-name="View- and Comment-count">
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
        content: `<div data-spacer="vertical" id="iwbai" data-gjs-custom-name="Line">
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
        <figcaption>Profile-attribution</figcaption></figure>`,
        content: `<sidebar-l sidewidth="var(--max)" contentmin="5%" space="var(--O-0)" id="ia33j" data-gjs-custom-name="Profile attribution">
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
    {
      id: 'profile-large',
      label: `<figure style="margin: 5px;" class="w100">
          ${""}
      <figcaption>Profile</figcaption></figure>`,
      content: `<c-card class="card" id="i1b45-2" data-gjs-custom-name="Profile">
      <c-card-image class="card-image" id="ivruy-2">
        <img class="image round" src="https://via.placeholder.com/150" id="izeij-2"/>
      </c-card-image>
      <c-card-header class="card-header" id="iyjuk-2">
        <c-card-header-title class="card-header-title is-centered" id="igozx-2">
          <h2 class="is-2 h-tag" name="default-name">
            <span id="iacwg-2">Phoebe Caulfield</span>
          </h2>
        </c-card-header-title>
      </c-card-header>
      <c-card-content class="card-content" id="invyt-2">
        <div data-spacer="vertical" id="iwbai-2-2">
          <span data-spacer="horizontal" id="i0j8i-2-2"></span>
        </div>
      </c-card-content>
      <c-card-content class="card-content" id="ihzfw-2">
        <span id="isfur-2">Raclette knausgaard hella meggs normcore williamsburg enamel pin sartorial venmo tbh hot chicken gentrify portland.</span>
      </c-card-content>
    </c-card><style>
    #i1b45-2{
      border-right-width:var(--s-5);
      border-right-style:solid;
      border-top-left-radius:var(--O-0);
      border-top-right-radius:var(--O-0);
      border-bottom-right-radius:var(--O-0);
      border-bottom-left-radius:var(--O-0);
      margin-top:auto;
      margin-bottom:auto;
    }
    #ivruy-2{
      align-self:center;
    }
    #izeij-2{
      width:var(--L20);
      height:var(--L20);
      object-fit:cover;
    }
    #iwbai-2-2{
      height:0.25rem;
      --w2:100%;
      color:var(--primary);
    }
    #i0j8i-2-2{
      width:3rem;
      --w:0;
    }
    #invyt-2{
      text-align:center;
      padding-top:var(--O-0);
      padding-left:var(--O-0);
      padding-bottom:var(--O-0);
      padding-right:var(--O-0);
      margin-bottom:-2.5em;
    }
    #ihzfw-2{
      text-align:center;
      font-size:0.9em;
    }
    </style>`,
      category: 'Combo',
      kind: 'Part'
    },
    {
      id: 'progress-bar',
      label: `<figure style="margin: 5px;" class="w100">
          ${""}
      <figcaption>Progress</figcaption></figure>`,
      content: `<div role="progressbar" data-gjs-custom-name="Progress" data-spacer="vertical" id="iwbai-3" data-force="width">
        <span data-spacer="horizontal" id="i0j8i-3" data-inherit="height"></span>
      </div><style>
        #iwbai-3{
          height:0.25rem;
          --w2:100%;
          color:var(--grey-lightest);
        }
        #i0j8i-3{
          width:20%;
          --w:100%;
          color:var(--primary);
          vertical-align:top;
        }
      </style>`,
      category: 'Decorations',
      kind: 'Part'
    },

    


    
];