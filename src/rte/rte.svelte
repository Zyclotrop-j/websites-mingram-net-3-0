<script>
    import SvelteColor from '../styles/color/color.svelte';
    import Toastify from 'toastify-js';
    import { SOffline } from 's-offline';
    import SvelteTooltip from 'svelte-tooltip';
    import swal from 'sweetalert';

  export let editor;
  export let edt;
  export let uid;

  let u = 1;

    editor.on('transaction', ({ editor }) => {
        editor = editor;
        u++;
    });
    editor.on('selectionUpdate', ({ editor }) => {
        editor = editor;
        u++;
    });

    // todo: split text funcationality, like in original rte

</script>

<style>
  button.is-active {
    background-color: rgba(0, 0, 0, .15);
    box-shadow: 0 0 3px rgba(0, 0, 0, .25) inset;
  }
  button.edt-icon {
    padding: 0;
    margin: 0;
    color: white;
  }
  svg.edt-icon {
    width: 1.5em;
    height: 1.5em;
    display: block;
  }
  button.is-active svg.edt-icon {
    color: #d278c9;
  }
  .rowwrapper {
    display: inline-flex;
    flex-direction: row;
  }
  .rowwrapper + .rowwrapper {
    padding-left: 5px;
  }
</style>

  <div>
    <div>
      <div class="rowwrapper">
        <SvelteTooltip tip="Bold" top >
            <button
                aria-label="Make selected text bold"
                on:click={() => editor.chain().focus().toggleBold().run()}
                disabled={u && !editor.can().chain().focus().toggleBold().run()}
                class={u && editor.isActive("bold") ? "is-active edt-icon gjs-pn-btn" : "edt-icon gjs-pn-btn"}
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="edt-icon" viewBox="0 0 24 24"><path fill="currentColor" d="M17.25 8c0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79c0-1.52-.86-2.82-2.15-3.42c.97-.67 1.65-1.77 1.65-2.79zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"/></svg>
            </button>
        </SvelteTooltip>
        <SvelteTooltip tip="Italic" top >
            <button
                aria-label="Make selected text italic"
                on:click={() => editor.chain().focus().toggleItalic().run()}
                disabled={u && !editor.can().chain().focus().toggleItalic().run()}
                class={u && editor.isActive("italic") ? "is-active edt-icon gjs-pn-btn" : "edt-icon gjs-pn-btn"}
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="edt-icon" viewBox="0 0 24 24"><path fill="currentColor" d="M5 19v-2.5h4l3-9H8V5h10v2.5h-3.5l-3 9H15V19Z"/></svg>
            </button>
        </SvelteTooltip>

        <SvelteTooltip tip="Strike" top >
            <button
                aria-label="Make selected text strike"
                on:click={() => editor.chain().focus().toggleStrike().run()}
                disabled={u && !editor.can().chain().focus().toggleStrike().run()}
                class={u && editor.isActive("strike") ? "is-active edt-icon gjs-pn-btn" : "edt-icon gjs-pn-btn"}
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="edt-icon" viewBox="0 0 24 24"><path fill="currentColor" d="M7.24 8.75c-.26-.48-.39-1.03-.39-1.67c0-.61.13-1.16.4-1.67c.26-.5.63-.93 1.11-1.29a5.73 5.73 0 0 1 1.7-.83c.66-.19 1.39-.29 2.18-.29c.81 0 1.54.11 2.21.34c.66.22 1.23.54 1.69.94c.47.4.83.88 1.08 1.43s.38 1.15.38 1.81h-3.01c0-.31-.05-.59-.15-.85c-.09-.27-.24-.49-.44-.68c-.2-.19-.45-.33-.75-.44c-.3-.1-.66-.16-1.06-.16c-.39 0-.74.04-1.03.13s-.53.21-.72.36c-.19.16-.34.34-.44.55c-.1.21-.15.43-.15.66c0 .48.25.88.74 1.21c.38.25.77.48 1.41.7H7.39c-.05-.08-.11-.17-.15-.25zM21 12v-2H3v2h9.62c.18.07.4.14.55.2c.37.17.66.34.87.51s.35.36.43.57c.07.2.11.43.11.69c0 .23-.05.45-.14.66c-.09.2-.23.38-.42.53c-.19.15-.42.26-.71.35c-.29.08-.63.13-1.01.13c-.43 0-.83-.04-1.18-.13s-.66-.23-.91-.42c-.25-.19-.45-.44-.59-.75s-.25-.76-.25-1.21H6.4c0 .55.08 1.13.24 1.58s.37.85.65 1.21c.28.35.6.66.98.92c.37.26.78.48 1.22.65c.44.17.9.3 1.38.39c.48.08.96.13 1.44.13c.8 0 1.53-.09 2.18-.28s1.21-.45 1.67-.79c.46-.34.82-.77 1.07-1.27s.38-1.07.38-1.71c0-.6-.1-1.14-.31-1.61c-.05-.11-.11-.23-.17-.33H21V12z"/></svg>
            </button>
        </SvelteTooltip>

        <SvelteTooltip tip="Underline" top >
            <button
                aria-label="Make selected text underlined"
                on:click={() => editor.chain().focus().toggleUnderline().run()}
                disabled={u && !editor.can().chain().focus().toggleUnderline().run()}
                class={u && editor.isActive("underline") ? "is-active edt-icon gjs-pn-btn" : "edt-icon gjs-pn-btn"}
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="edt-icon" viewBox="0 0 24 24"><path fill="currentColor" d="M5 21v-2h14v2Zm7-4q-2.525 0-3.925-1.575t-1.4-4.175V3H9.25v8.4q0 1.4.7 2.275t2.05.875q1.35 0 2.05-.875q.7-.875.7-2.275V3h2.575v8.25q0 2.6-1.4 4.175Q14.525 17 12 17Z"/></svg>
            </button>
        </SvelteTooltip>

        <SvelteTooltip tip="Superscript" top >
            <button
                aria-label="Make selected text superscript"
                on:click={() => editor.chain().focus().toggleSuperscript().run()}
                disabled={u && !editor.can().chain().focus().toggleSuperscript().run()}
                class={u && editor.isActive("superscript") ? "is-active edt-icon gjs-pn-btn" : "edt-icon gjs-pn-btn"}
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="edt-icon" viewBox="0 0 24 24"><path fill="currentColor" d="M19 9V6h3V5h-3V4h4v3h-3v1h3v1ZM5.875 20l4.625-7.275L6.2 6h2.65l3.1 5h.1l3.075-5H17.8l-4.325 6.725L18.125 20H15.45l-3.4-5.425h-.1L8.55 20Z"/></svg>
            </button>
        </SvelteTooltip>

        <SvelteTooltip tip="Subscript" top >
            <button
                aria-label="Make selected text subscript"
                on:click={() => editor.chain().focus().toggleSubscript().run()}
                disabled={u && !editor.can().chain().focus().toggleSubscript().run()}
                class={u && editor.isActive("subscript") ? "is-active edt-icon gjs-pn-btn" : "edt-icon gjs-pn-btn"}
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="edt-icon" viewBox="0 0 24 24"><path fill="currentColor" d="M19 20v-3h3v-1h-3v-1h4v3h-3v1h3v1ZM5.875 18l4.625-7.275L6.2 4h2.65l3.1 5h.1l3.075-5H17.8l-4.325 6.725L18.125 18H15.45l-3.4-5.425h-.1L8.55 18Z"/></svg>
            </button>
        </SvelteTooltip>

        <SvelteTooltip tip="Text color" top >
            <button
                aria-label="Make selected text coloured"
                on:click={() => (editor.isActive('textStyle') ? editor.chain().focus().unsetColor().run() : editor.chain().focus().setColor('var(--primary)').run())}
                disabled={u && !(editor.isActive('textStyle') ? editor.can().chain().focus().unsetColor().run() : editor.can().chain().focus().setColor('var(--primary)').run())}
                class={u && editor.isActive('textStyle') ? "is-active edt-icon gjs-pn-btn" : "edt-icon gjs-pn-btn"}
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="edt-icon" viewBox="0 0 24 24"><path fill="currentColor" d="M2 24v-4h20v4Zm3.5-7l5.25-14h2.5l5.25 14h-2.4l-1.25-3.6H9.2L7.9 17Zm4.4-5.6h4.2l-2.05-5.8h-.1Z"/></svg>
            </button>
        </SvelteTooltip>

        <SvelteTooltip tip="Highlight" top >
            <button
                aria-label="Make selected text highlighted"
                on:click={() => editor.chain().focus().toggleHighlight().run()}
                disabled={u && !editor.can().chain().focus().toggleHighlight().run()}
                class={u && editor.isActive("highlight") ? "is-active edt-icon gjs-pn-btn" : "edt-icon gjs-pn-btn"}
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="edt-icon" viewBox="0 0 24 24"><path fill="currentColor" d="M2 24v-4h20v4Zm1.5-6l3.15-3.15l-.05-.05q-.6-.6-.6-1.4q0-.8.6-1.4l4.275-4.275l5.4 5.4L12 17.4q-.6.6-1.4.6q-.8 0-1.4-.6l-.05-.05l-.65.65Zm14.2-6.3l-5.4-5.4L16 2.6q.6-.6 1.4-.6q.8 0 1.4.6l2.6 2.6q.6.6.6 1.4q0 .8-.6 1.4Z"/></svg>
            </button>
        </SvelteTooltip>
      </div>
      <div class="rowwrapper">
        <SvelteTooltip tip="Code" top >
            <button
                aria-label="Make selected text code"
                on:click={() => editor.chain().focus().toggleCode().run()}
                disabled={u && !editor.can().chain().focus().toggleCode().run()}
                class={u && editor.isActive("code") ? "is-active edt-icon gjs-pn-btn" : "edt-icon gjs-pn-btn"}
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="edt-icon" viewBox="0 0 24 24"><path fill="currentColor" d="m8 18l-6-6l6-6l1.425 1.425l-4.6 4.6L9.4 16.6Zm8 0l-1.425-1.425l4.6-4.6L14.6 7.4L16 6l6 6Z"/></svg>
            </button>
        </SvelteTooltip>

         <SvelteTooltip tip="Link" top >
            <button
                aria-label="Make selected text linked"
                on:click={async () => {
                    // todo: make nice modal
                    // warning: modal must not propagate events to the outside, else text-edit mode ends!!
                    const ret = window.prompt('Enter the link. (Leave empty to remove.)', editor.getAttributes('link').href);

                    console.log(ret);

                    if(typeof ret === 'string' && ret.length === 0) {
                        editor.chain().focus().unsetLink().run();
                        return;
                    }
                    if (typeof ret === 'string' && ret.length > 0) {
                        // todo: calculate blank and rel from ret
                        editor.chain().focus().toggleLink({ href: ret, target: '_blank', rel: 'noopener noreferrer nofollow' }).run()
                        return;
                    }         
                }}
                disabled={u && !editor.can().chain().focus().toggleLink().run()}
                class={u && editor.isActive('link') ? "is-active edt-icon gjs-pn-btn" : "edt-icon gjs-pn-btn"}
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="edt-icon" viewBox="0 0 24 24"><path fill="currentColor" d="M11 17H7q-2.075 0-3.537-1.463Q2 14.075 2 12t1.463-3.538Q4.925 7 7 7h4v2H7q-1.25 0-2.125.875T4 12q0 1.25.875 2.125T7 15h4Zm-3-4v-2h8v2Zm5 4v-2h4q1.25 0 2.125-.875T20 12q0-1.25-.875-2.125T17 9h-4V7h4q2.075 0 3.538 1.462Q22 9.925 22 12q0 2.075-1.462 3.537Q19.075 17 17 17Z"/></svg>
            </button>
        </SvelteTooltip>

        <SvelteTooltip tip="Insert linebreak" top >
            <button class="gjs-pn-btn edt-icon" aria-label="Insert linebreak" on:click={() => editor.chain().focus().setHardBreak().run()}>
                <svg xmlns="http://www.w3.org/2000/svg" class="edt-icon" viewBox="0 0 48 48"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"><path d="M6 4v40M42 4v40M18 26l-4 4l4 4"/><path d="M15 30h13a6 6 0 0 0 0-12H14"/></g></svg>
            </button>
        </SvelteTooltip>
      </div>
      <div class="rowwrapper">
        <SvelteTooltip tip="Clear formatting" top >
            <button 
                aria-label="Clear all formatting from selected text" 
                class="gjs-pn-btn edt-icon" 
                on:click={() => {
                    editor.chain().focus().clearNodes().run(); // make everything a paragraph
                    editor.chain().focus().unsetAllMarks().run(); // unset all formatting
                }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="edt-icon" viewBox="0 0 16 16"><path fill="currentColor" d="M4.5 1c.2 0 .38.12.46.303l2.884 6.731l-.753.754a.502.502 0 0 1-.05-.091L6.313 7H2.687L1.96 8.697a.5.5 0 0 1-.92-.394l3-7A.5.5 0 0 1 4.5 1Zm1.385 5L4.5 2.77L3.116 6h2.769Zm8.427.19c.002-.063.004-.128.004-.193c0-1.82-.957-2.997-2.428-2.997c-.795 0-1.499.392-1.816 1.015H10V1.5a.5.5 0 1 0-1 0v5.378l1-1v-.394c.149-1.032.762-1.651 1.673-1.651c.853 0 1.426.526 1.617 1.44c.17.102.33.227.478.373l.544.545Zm-1.252.164a1.5 1.5 0 0 0-2.12 0l-4.587 4.585a1.5 1.5 0 0 0 0 2.122l1.586 1.585A1.5 1.5 0 0 0 9.501 15H12.5a.5.5 0 0 0 0-1h-1.793l3.94-3.94a1.5 1.5 0 0 0 0-2.12L13.06 6.353ZM8 10.707L10.293 13l-.94.94a.5.5 0 0 1-.707 0l-1.585-1.586a.5.5 0 0 1 0-.708L8 10.707Z"/></svg>
            </button>
        </SvelteTooltip>
      </div>
      <div class="rowwrapper">

        <SvelteTooltip tip="Undo" top >
            <button
                aria-label="Undo last action"
                on:click={() => editor.chain().focus().undo().run()}
                disabled={u && !editor.can().chain().focus().undo().run()}
                class="gjs-pn-btn edt-icon"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="edt-icon" viewBox="0 0 24 24"><path fill="currentColor" d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88c3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z"/></svg>    
            </button>
        </SvelteTooltip>
        <SvelteTooltip tip="Redo" top >
            <button
                aria-label="Redo last action"
                on:click={() => editor.chain().focus().redo().run()}
                disabled={u && !editor.can().chain().focus().redo().run()}
                class="gjs-pn-btn edt-icon"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="edt-icon" viewBox="0 0 24 24"><path fill="currentColor" d="M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16a8.002 8.002 0 0 1 7.6-5.5c1.95 0 3.73.72 5.12 1.88L13 16h9V7l-3.6 3.6z"/></svg>
            </button>
        </SvelteTooltip>
      </div>
      <div class="rowwrapper">
      <SvelteTooltip tip="Expand text" top >
        <button
            aria-label="Autocomplete text with in-browser-ai"
            class="gjs-pn-btn edt-icon" 
            on:click={async () => {
                editor.setEditable(false)
                try {
                    const prompt = editor.getText({ blockSeparator: "\n" });
                    edt.runCommand('status:start', { component: 'ai-textgen', msg: `Running complesion text of ${prompt.length} chars` });
                    const [{generated_text: text}] = await edt.runCommand('ai:textgen2', { args: [prompt] });
                    const textMinusOriginal = text.replace(prompt.trim(), '');
                    // t2tgen
                    editor.chain().focus('end').createParagraphNear().insertContent(textMinusOriginal).run();
                } catch(e) {
                    console.warn(e);
                    Toastify({
                        text: `Uh, something went wrong. ${e?.message || e}`,
                        duration: 2000,
                        close: true,
                        gravity: "top", 
                        position: "left",
                        stopOnFocus: true,
                        backgroundColor: 'orange',
                    }).showToast();
                } finally {
                    editor.setEditable(true);
                    edt.runCommand('status:end', { component: 'ai-textgen' });
                }
            }}
            disabled={u && !true}
        >
            <svg xmlns="http://www.w3.org/2000/svg" class="edt-icon" viewBox="0 0 576 512"><path fill="currentColor" d="M234.7 42.7L197 56.8c-3 1.1-5 4-5 7.2s2 6.1 5 7.2l37.7 14.1l14.1 37.7c1.1 3 4 5 7.2 5s6.1-2 7.2-5l14.1-37.7L315 71.2c3-1.1 5-4 5-7.2s-2-6.1-5-7.2l-37.7-14.1L263.2 5c-1.1-3-4-5-7.2-5s-6.1 2-7.2 5l-14.1 37.7zM46.1 395.4c-18.7 18.7-18.7 49.1 0 67.9l34.6 34.6c18.7 18.7 49.1 18.7 67.9 0l381.3-381.4c18.7-18.7 18.7-49.1 0-67.9l-34.6-34.5c-18.7-18.7-49.1-18.7-67.9 0L46.1 395.4zM484.6 82.6l-105 105l-23.3-23.3l105-105l23.3 23.3zM7.5 117.2C3 118.9 0 123.2 0 128s3 9.1 7.5 10.8L64 160l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L128 160l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L128 96l-21.2-56.5c-1.7-4.5-6-7.5-10.8-7.5s-9.1 3-10.8 7.5L64 96L7.5 117.2zm352 256c-4.5 1.7-7.5 6-7.5 10.8s3 9.1 7.5 10.8L416 416l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L480 416l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L480 352l-21.2-56.5c-1.7-4.5-6-7.5-10.8-7.5s-9.1 3-10.8 7.5L416 352l-56.5 21.2z"/></svg>
        </button>
        </SvelteTooltip>
      <SOffline
        pingUrl={window.location.origin}
      >
        <span slot="online" class="online">
          <SvelteTooltip tip="Continue text" top >
            <button
                aria-label="Autocomplete text with ai"
                class="gjs-pn-btn edt-icon" 
                on:click={async () => {
                    editor.setEditable(false)
                    try {
                        const resp = await fetch('http://localhost:3003/ai/extend', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({
                            style: 'short description',
                            targetaudience: 'the general public',
                            description: editor.getText({ blockSeparator: "\n" }),
                        })}).then(i => i.json());
                        const text = resp.choices.map(({text}) => text).join('\n\n');
                        editor.chain().focus('end').createParagraphNear().insertContent(text).run();
                    } catch(e) {
                        console.warn(e);
                        Toastify({
                            text: `Uh, something went wrong. ${e?.message || e}`,
                            duration: 2000,
                            close: true,
                            gravity: "top", 
                            position: "left",
                            stopOnFocus: true,
                            backgroundColor: 'orange',
                        }).showToast();
                    } finally {
                        editor.setEditable(true)
                    }
                }}
                disabled={u && !true}
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="edt-icon" viewBox="0 0 576 512"><path fill="currentColor" d="M234.7 42.7L197 56.8c-3 1.1-5 4-5 7.2s2 6.1 5 7.2l37.7 14.1l14.1 37.7c1.1 3 4 5 7.2 5s6.1-2 7.2-5l14.1-37.7L315 71.2c3-1.1 5-4 5-7.2s-2-6.1-5-7.2l-37.7-14.1L263.2 5c-1.1-3-4-5-7.2-5s-6.1 2-7.2 5l-14.1 37.7zM46.1 395.4c-18.7 18.7-18.7 49.1 0 67.9l34.6 34.6c18.7 18.7 49.1 18.7 67.9 0l381.3-381.4c18.7-18.7 18.7-49.1 0-67.9l-34.6-34.5c-18.7-18.7-49.1-18.7-67.9 0L46.1 395.4zM484.6 82.6l-105 105l-23.3-23.3l105-105l23.3 23.3zM7.5 117.2C3 118.9 0 123.2 0 128s3 9.1 7.5 10.8L64 160l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L128 160l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L128 96l-21.2-56.5c-1.7-4.5-6-7.5-10.8-7.5s-9.1 3-10.8 7.5L64 96L7.5 117.2zm352 256c-4.5 1.7-7.5 6-7.5 10.8s3 9.1 7.5 10.8L416 416l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L480 416l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L480 352l-21.2-56.5c-1.7-4.5-6-7.5-10.8-7.5s-9.1 3-10.8 7.5L416 352l-56.5 21.2z"/></svg>
            </button>
          </SvelteTooltip>
        </span>
        <span slot="offline" class="offline">
            <SvelteTooltip tip="Go online in order to use text-continuation" top >
                <button disabled class="gjs-pn-btn edt-icon" >
                    <svg xmlns="http://www.w3.org/2000/svg" class="edt-icon" viewBox="0 0 576 512"><path fill="currentColor" d="M234.7 42.7L197 56.8c-3 1.1-5 4-5 7.2s2 6.1 5 7.2l37.7 14.1l14.1 37.7c1.1 3 4 5 7.2 5s6.1-2 7.2-5l14.1-37.7L315 71.2c3-1.1 5-4 5-7.2s-2-6.1-5-7.2l-37.7-14.1L263.2 5c-1.1-3-4-5-7.2-5s-6.1 2-7.2 5l-14.1 37.7zM46.1 395.4c-18.7 18.7-18.7 49.1 0 67.9l34.6 34.6c18.7 18.7 49.1 18.7 67.9 0l381.3-381.4c18.7-18.7 18.7-49.1 0-67.9l-34.6-34.5c-18.7-18.7-49.1-18.7-67.9 0L46.1 395.4zM484.6 82.6l-105 105l-23.3-23.3l105-105l23.3 23.3zM7.5 117.2C3 118.9 0 123.2 0 128s3 9.1 7.5 10.8L64 160l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L128 160l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L128 96l-21.2-56.5c-1.7-4.5-6-7.5-10.8-7.5s-9.1 3-10.8 7.5L64 96L7.5 117.2zm352 256c-4.5 1.7-7.5 6-7.5 10.8s3 9.1 7.5 10.8L416 416l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L480 416l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L480 352l-21.2-56.5c-1.7-4.5-6-7.5-10.8-7.5s-9.1 3-10.8 7.5L416 352l-56.5 21.2z"/></svg>
                </button>
            </SvelteTooltip>
        </span>
      </SOffline>
      </div>
      

      <details>
        <summary>Customise text-color</summary>
        <SvelteColor
            uid={uid}
            getComputedStyles={() => edt.Canvas.getWindow().getComputedStyle(edt.Canvas.getBody())}
            change={({event}) => editor.chain().focus().setColor(event.value).run()}
            value={u && editor.getAttributes('textStyle').color}
            colorPickerIsOpen={true}
            colorPickerIsPopup={false}
        ></SvelteColor>
      </details>
      <details>
        <summary>Customise higlight-color</summary>
        <SvelteColor
            uid={uid}
            getComputedStyles={() => edt.Canvas.getWindow().getComputedStyle(edt.Canvas.getBody())}
            change={({event}) => editor.chain().focus().setHighlight({ color: event.value }).run()}
            value={u && editor.getAttributes('textStyle').backgroundColor}
            colorPickerIsOpen={true}
            colorPickerIsPopup={false}
        ></SvelteColor>
      </details>
    </div>
  </div>