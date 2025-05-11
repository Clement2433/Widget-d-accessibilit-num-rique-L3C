/*! L3C Accessibility Widget UX/UI | MIT License */
(function(){
  const configColor = document.currentScript.getAttribute('data-color') || '#007BFF';
  document.documentElement.style.setProperty('--l3c-color', configColor);

  // Create button
  const btn = document.createElement('button');
  btn.className = 'l3c-widget-btn';
  btn.setAttribute('aria-label','Ouvrir les outils d\'accessibilité');
  btn.innerHTML = '<svg role="img" aria-label="Accessibilité" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3 3h2v18H3zm16.293 9.293l-3 3 1.414 1.414 3-3 3-3-1.414-1.414-3 3zM6 12a6 6 0 0111.192-2.667l1.465-1.011A8 8 0 105 12h1z"/></svg>';
  btn.addEventListener('click', togglePanel);
  document.body.appendChild(btn);

  // Create overlay and panel
  const overlay = document.createElement('div');
  overlay.className = 'l3c-widget-overlay';
  overlay.setAttribute('aria-hidden','true');
  overlay.addEventListener('click', closePanel);

  const panel = document.createElement('div');
  panel.className = 'l3c-widget-panel';
  panel.setAttribute('role','dialog');
  panel.setAttribute('aria-modal','true');
  panel.setAttribute('aria-hidden','true');

  const features = [
    {id:'size+', label:'Taille +', icon:'<svg role="img" aria-label="Augmenter la taille du texte" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M4 12h16v2H4z"/></svg>'},
    {id:'size-', label:'Taille -', icon:'<svg role="img" aria-label="Diminuer la taille du texte" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M4 13h16v-2H4z"/></svg>'},
    {id:'contrast', label:'Contraste', icon:'<svg role="img" aria-label="Contraste élevé" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>'},
    {id:'invert', label:'Inverser', icon:'<svg role="img" aria-label="Contraste inversé" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2v20M2 12h20"/></svg>'},
    {id:'dys', label:'Dyslexie', icon:'<svg role="img" aria-label="Police dyslexie-friendly" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6 4h12v2H6z"/></svg>'},
    {id:'underline', label:'Souligner', icon:'<svg role="img" aria-label="Souligner les liens" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M4 20h16v-2H4z"/></svg>'},
    {id:'motion', label:'Animations', icon:'<svg role="img" aria-label="Stopper les animations" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6 6h12v12H6z"/></svg>'},
    {id:'read', label:'Lire', icon:'<svg role="img" aria-label="Lire le texte sélectionné" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 6h14v12H5z"/></svg>'}
  ];

  features.forEach(f => {
    const b = document.createElement('button');
    b.id = f.id;
    b.innerHTML = f.icon + `<span>${f.label}</span>`;
    b.addEventListener('click', () => applyFeature(f.id));
    panel.appendChild(b);
  });

  overlay.appendChild(panel);
  document.body.appendChild(overlay);

  // Feature logic
  function applyFeature(id) {
    switch(id) {
      case 'size+': document.documentElement.style.fontSize = '110%'; break;
      case 'size-': document.documentElement.style.fontSize = '90%'; break;
      case 'contrast': document.documentElement.classList.toggle('l3c-high-contrast'); break;
      case 'invert': document.documentElement.classList.toggle('l3c-invert'); break;
      case 'dys': document.body.classList.toggle('l3c-dyslexic'); break;
      case 'underline': document.body.classList.toggle('l3c-underline'); break;
      case 'motion':
        const css = document.createElement('style');
        css.innerHTML = `* { animation: none !important; transition: none !important; }`;
        document.head.appendChild(css);
        break;
      case 'read':
        const text = window.getSelection().toString();
        if(text) new SpeechSynthesisUtterance(text).text = text, speechSynthesis.speak(text);
        break;
    }
    showToast(`${document.getElementById(id).innerText} activé`);
  }

  function togglePanel() {
    const open = overlay.getAttribute('aria-hidden') === 'false';
    overlay.setAttribute('aria-hidden', open);
    panel.setAttribute('aria-hidden', open);
    if (!open) panel.focus();
  }

  function closePanel() {
    overlay.setAttribute('aria-hidden', 'true');
    panel.setAttribute('aria-hidden', 'true');
    btn.focus();
  }

  document.addEventListener('keydown', e => { if(e.key==='Escape') closePanel(); });

  function showToast(msg) {
    let t = document.querySelector('.l3c-widget-toast');
    if(!t) {
      t = document.createElement('div');
      t.className = 'l3c-widget-toast';
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2000);
  }

  // Accessibility classes
  const contrastCSS = document.createElement('style');
  contrastCSS.innerHTML = `
    .l3c-high-contrast { background:#000!important; color:#fff!important; }
    .l3c-invert { filter: invert(1) hue-rotate(180deg)!important; }
    body.l3c-dyslexic { font-family:'OpenDyslexic',Arial,sans-serif!important; }
    body.l3c-underline a { text-decoration:underline!important; }
  `;
  document.head.appendChild(contrastCSS);

})();