import { Editor } from '@tiptap/core'
import Document from '@tiptap/extension-document'
import Text from '@tiptap/extension-text'
import HardBreak from '@tiptap/extension-hard-break';
import Blockquote from '@tiptap/extension-blockquote';
import Paragraph from '@tiptap/extension-paragraph';
import TextStyle from '@tiptap/extension-text-style';
import { Bold } from '@tiptap/extension-bold';
import { Code } from '@tiptap/extension-code';
import { Dropcursor } from '@tiptap/extension-dropcursor';
import { Gapcursor } from '@tiptap/extension-gapcursor';
import { History } from '@tiptap/extension-history';
import { Italic } from '@tiptap/extension-italic';
import { Strike } from '@tiptap/extension-strike';
import { Color } from '@tiptap/extension-color';
import Typography from '@tiptap/extension-typography';
import Underline from '@tiptap/extension-underline'
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';

import { v4 as uuidv4 } from 'uuid';

import SvelteRTEApp from './rte.svelte';

export default editor => {
  //const rte = editor.RichTextEditor;
  /*rte.add('bold', {
    icon: '<b>B</b>',
    attributes: {title: 'Bold'},
    result: rte => rte?.chain().focus().toggleBold().run(),
    state: rte => {
      if(!rte) return btnState.DISABLED;
      console.log(rte);
      if(!rte.can().chain().focus().toggleBold().run()) return btnState.DISABLED;
      return rte.isActive("bold") ? btnState.ACTIVE : btnState.INACTIVE;
    },
  });*/

  editor.setCustomRte({
    /**
     * Enabling the custom RTE
     * @param  {HTMLElement} el This is the HTML node which was selected to be edited
     * @param  {Object} rte It's the instance you'd return from the first call of enable().
     *                      At the first call it'd be undefined. This is useful when you need
     *                      to check if the RTE is already enabled on the component
     * @return {Object} The return should be the RTE initialized instance
     */
    enable: function(el, rte) {
      console.log("Enable", el, rte);
      // If already exists just focus
      if (rte) {
        try {
          rte.destroy();
        } catch(e) {
          console.warn(e);
        }
      }

      const content = el.querySelector('div.ProseMirror > p')?.innerHTML || el.innerHTML; // make sure to only select real content, even if page was reloaded while editing
      el.innerHTML = "";
      
  
      // CKEditor initialization
      rte = new Editor({
        element: el,
        extensions: [
          Document,
          Paragraph,
          Text,
          HardBreak,
          Blockquote,
          Bold,
          Code,
          Dropcursor,
          Gapcursor,
          History,
          Italic,
          Strike,
          TextStyle,
          Color,
          Typography,
          Underline,
          Subscript,
          Superscript,
          Highlight.configure({ multicolor: true }),
          Link.configure({
            protocols: [{
              scheme: 'tel',
              optionalSlashes: true
            }, {
              scheme: 'mailto',
              optionalSlashes: true
            }],
            autolink: true,
            openOnClick: false,
            linkOnPaste: true,
            HTMLAttributes: {
              class: 'inline-link',
              target: '_blank',
              rel: 'noopener noreferrer nofollow',
            },
            validate: href => {
              let givenURL;
              try {
                  givenURL = new URL (href);
              } catch (error) {
                 return false; 
              }
              if(url.protocol === "http:" || url.protocol === "https:") {
                return true; // todo: do a bit more validation here!
              }
              return true;
            }
          })
        ],
        content,
        // autofocus: 'end',
      });
      rte.commands.focus();

      if(this.app) this.app.$destroy();
      const p = document.querySelector(".gjs-rte-toolbar");
      this.app = new SvelteRTEApp({ target: p, anchor: p.firstChild, props: {
        editor: rte,
        edt: editor,
        uid: uuidv4(),
        getComputedStyles: () => editor.Canvas.getWindow().getComputedStyle(editor.Canvas.getBody()),
      } });
  
      // this.focus(el, rte); // implemented later
      return rte;
    },
    disable: function(el, rte) {
      console.log("disable", el, rte);
      const newContent = rte.getHTML().replaceAll('</p><p>', '<br />').replaceAll('</p>', '').replaceAll('<p>', '');

      rte?.commands.blur()
      rte?.destroy();
      this.app.$destroy();
      this.app = null;
      el.innerHTML = newContent;
      //if (rte && rte.focusManager) {
      //  rte.focusManager.blur(true);
      //}
      
      return rte;
    },
  });
}