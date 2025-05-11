/*! L3C Accessibility Widget Phase 1 | MIT License */
(function() {
  // Read script tag config
  const script = document.currentScript;
  const position = script.getAttribute('data-position') || 'bottom-right';
  const iconHTML = script.getAttribute('data-icon') || '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M3 3h2v18H3zm16.293 9.293l-3 3 1.414 1.414 3-3 3-3-1.414-1.414-3 3zM6 12a6 6 0 0111.192-2.667l1.465-1.011A8 8 0 105 12h1z"/></svg>';

  // Create button
  const btn = document.createElement('button');
  btn.className = 'l3c-widget-btn pulse l3c-pos-' + position;
  btn.setAttribute('aria-label', 'Ouvrir les outils d\'accessibilité');
  btn.innerHTML = iconHTML;
  btn.addEventListener('click', togglePanel);
  document.body.appendChild(btn);

  // Create overlay & panel
  const overlay = document.createElement('div');
  overlay.className = 'l3c-widget-overlay';
  overlay.setAttribute('aria-hidden', 'true');

  const panel = document.createElement('div');
  panel.className = 'l3c-widget-panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-modal', 'true');
  panel.setAttribute('aria-hidden', 'true');

  // Panel header
  const header = document.createElement('div');
  header.className = 'l3c-widget-panel-header';
  header.innerText = 'Accessibilité';
  const closeBtn = document.createElement('button');
  closeBtn.className = 'l3c-widget-panel-close';
  closeBtn.setAttribute('aria-label', 'Fermer');
  closeBtn.innerText = '\u00D7';
  closeBtn.addEventListener('click', togglePanel);
  header.appendChild(closeBtn);
  panel.appendChild(header);

  // Feature buttons (placeholders)
  const features = [
    {id:'size+', label:'Agrandir', icon:'<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4 11h16v2H4z"/></svg>'},
    {id:'size-', label:'Réduire', icon:'<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4 13h16v-2H4z"/></svg>'},
    {id:'contrast', label:'Contraste', icon:'<svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>'}
  ];
  features.forEach(f => {
    const b = document.createElement('button');
    b.id = f.id;
    b.setAttribute('aria-label', f.label);
    b.innerHTML = f.icon + '<span>' + f.label + '</span>';
    panel.appendChild(b);
  });

  overlay.appendChild(panel);
  document.body.appendChild(overlay);

  // Toggle panel visibility
  function togglePanel() {
    const hidden = overlay.getAttribute('aria-hidden') === 'true';
    overlay.setAttribute('aria-hidden', hidden ? 'false' : 'true');
    panel.setAttribute('aria-hidden', hidden ? 'false' : 'true');
    if (!hidden) {
      document.body.focus();
    } else {
      panel.focus();
    }
  }
})();