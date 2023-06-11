const invalidcsschars = /[^a-zA-Z0-9-_]/g;

export default function(editor = {}) { 
    const panelManager = editor.Panels;
    const statusPanel = panelManager.getPanel('status');
    const s = document.createElement('div');
    const componentsLoading = {};
    
    s.innerHTML = `<div class="trigger">
        <svg class='loading' xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><circle cx="12" cy="3.5" r="1.5" fill="currentColor" opacity="0"><animateTransform attributeName="transform" calcMode="discrete" dur="2.4s" repeatCount="indefinite" type="rotate" values="0 12 12;90 12 12;180 12 12;270 12 12"/><animate attributeName="opacity" dur="0.6s" keyTimes="0;0.5;1" repeatCount="indefinite" values="1;1;0"/></circle><circle cx="12" cy="3.5" r="1.5" fill="currentColor" opacity="0"><animateTransform attributeName="transform" begin="0.2s" calcMode="discrete" dur="2.4s" repeatCount="indefinite" type="rotate" values="30 12 12;120 12 12;210 12 12;300 12 12"/><animate attributeName="opacity" begin="0.2s" dur="0.6s" keyTimes="0;0.5;1" repeatCount="indefinite" values="1;1;0"/></circle><circle cx="12" cy="3.5" r="1.5" fill="currentColor" opacity="0"><animateTransform attributeName="transform" begin="0.4s" calcMode="discrete" dur="2.4s" repeatCount="indefinite" type="rotate" values="60 12 12;150 12 12;240 12 12;330 12 12"/><animate attributeName="opacity" begin="0.4s" dur="0.6s" keyTimes="0;0.5;1" repeatCount="indefinite" values="1;1;0"/></circle></svg>
        <svg class='done' xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="currentColor" d="M16.59 7.58L10 14.17l-3.59-3.58L5 12l5 5l8-8zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8s8 3.58 8 8s-3.58 8-8 8z"/></svg>
        <ul class="target"></ul>
    </div>`;
    statusPanel.view.el.appendChild(s);
    const commands = editor.Commands;
    commands.add('status:start', async (editor, sender, options = {}) => {
        const cmptnm = `c_${options.component.replace(invalidcsschars, match => match.charCodeAt(0))}`;
        componentsLoading[cmptnm] = options.msg ?? true;
        if(options.msg) {
            if(options.clean !== false) {
                s.querySelectorAll(`.target .${cmptnm}`).forEach(el => el.parentNode.removeChild(el));
            }
            s.querySelector('.target').innerHTML += `<li class="${cmptnm}">${options.msg}</li>`;
        }
        s.querySelector('.trigger').classList.add('loading');
    });
    commands.add('status:end', async (editor, sender, options = {}) => {
        const cmptnm = `c_${options.component.replace(invalidcsschars, match => match.charCodeAt(0))}`;
        delete componentsLoading[cmptnm];
        s.querySelectorAll(`.target .${cmptnm}`).forEach(el => el.parentNode.removeChild(el));
        if(!Object.keys(componentsLoading).length) s.querySelector('.trigger').classList.remove('loading');
    });
}
