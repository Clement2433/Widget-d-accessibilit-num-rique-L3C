
/*! L3C Accessibility Widget V4 | MIT License */
(function() {
  const ACCOUNTS = {
    "MON_ID_UNIQUE": {
      themeColor: "#007BFF",
      position: "right",
      language: "fr",
      logo: ""
    }
    // Ajouter d'autres comptes ici
  };

  // Read configuration from script tag
  const scriptTag = document.currentScript;
  const accountId = scriptTag.getAttribute('data-account');
  const accountConfig = ACCOUNTS[accountId] || {};
  const themeColor = accountConfig.themeColor || "#007BFF";
  const position = accountConfig.position || "right";
  const lang = accountConfig.language || "en";

  // Load saved preferences or defaults
  const prefs = JSON.parse(localStorage.getItem('l3c_prefs_' + accountId) || "{}");
  const state = {
    fontSize: prefs.fontSize || 100,
    highContrast: prefs.highContrast || false,
    inverted: prefs.inverted || false,
    dyslexic: prefs.dyslexic || false,
    underline: prefs.underline || false,
    reduceMotion: prefs.reduceMotion || false
  };

  // Utility: save prefs
  function savePrefs() {
    localStorage.setItem('l3c_prefs_' + accountId, JSON.stringify(state));
  }

  // Create styles
  const style = document.createElement('style');
  style.textContent = `
    .l3c-btn { position: fixed; bottom: 20px; ${position}: 20px; background: ${themeColor}; color: white;
      width:48px; height:48px; border-radius:24px; border:none; cursor:pointer; z-index:9999;
      font-size:24px; display:flex; align-items:center; justify-content:center; }
    .l3c-overlay { position: fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5);
      display:none; z-index:9998; }
    .l3c-modal { position: fixed; bottom: 80px; ${position}: 20px; background:white; border-radius:8px;
      padding:16px; box-shadow:0 4px 12px rgba(0,0,0,0.3); max-width:280px; max-height:80%;
      overflow:auto; z-index:9999; }
    .l3c-modal button { display:block; width:100%; margin:8px 0; padding:8px;
      border:none; background:#f0f0f0; border-radius:4px; cursor:pointer; text-align:left; }
    .l3c-high-contrast { filter: none; background: #000 !important; color: #fff !important; }
    .l3c-invert { filter: invert(1) hue-rotate(180deg) !important; }
    body.l3c-dyslexic { font-family: 'OpenDyslexic', Arial, sans-serif !important; }
    body.l3c-underline a { text-decoration: underline !important; }
    `;
  document.head.appendChild(style);

  // Apply state features
  function applyFeatures() {
    document.documentElement.style.fontSize = state.fontSize + '%';
    document.documentElement.classList.toggle('l3c-high-contrast', state.highContrast);
    document.documentElement.classList.toggle('l3c-invert', state.inverted);
    document.body.classList.toggle('l3c-dyslexic', state.dyslexic);
    document.body.classList.toggle('l3c-underline', state.underline);
    if (state.reduceMotion) {
      const noMotion = document.createElement('style');
      noMotion.innerHTML = `* { animation: none !important; transition: none !important; }`;
      document.head.appendChild(noMotion);
    }
  }

  // Create elements
  const btn = document.createElement('button');
  btn.className = 'l3c-btn';
  btn.setAttribute('aria-label', 'Accessibilité');
  btn.innerHTML = '♿';
  btn.addEventListener('click', toggleModal);
  document.body.appendChild(btn);

  const overlay = document.createElement('div');
  overlay.className = 'l3c-overlay';
  overlay.addEventListener('click', closeModal);
  document.body.appendChild(overlay);

  const modal = document.createElement('div');
  modal.className = 'l3c-modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-label', 'Outils d’accessibilité');
  modal.tabIndex = -1;
  modal.innerHTML = `
    <button id="l3c-size-up">Taille +</button>
    <button id="l3c-size-down">Taille -</button>
    <button id="l3c-contrast">Contraste</button>
    <button id="l3c-invert">Inverser</button>
    <button id="l3c-dys">Police dyslexie</button>
    <button id="l3c-underline">Souligner liens</button>
    <button id="l3c-motion">Stopper animations</button>
    <button id="l3c-read">Lire sélection</button>
  `;
  document.body.appendChild(modal);

  // Feature handlers
  document.getElementById('l3c-size-up').onclick = function() {
    state.fontSize += 10; applyFeatures(); savePrefs();
  };
  document.getElementById('l3c-size-down').onclick = function() {
    state.fontSize = Math.max(50, state.fontSize - 10); applyFeatures(); savePrefs();
  };
  document.getElementById('l3c-contrast').onclick = function() {
    state.highContrast = !state.highContrast; applyFeatures(); savePrefs();
  };
  document.getElementById('l3c-invert').onclick = function() {
    state.inverted = !state.inverted; applyFeatures(); savePrefs();
  };
  document.getElementById('l3c-dys').onclick = function() {
    state.dyslexic = !state.dyslexic; applyFeatures(); savePrefs();
  };
  document.getElementById('l3c-underline').onclick = function() {
    state.underline = !state.underline; applyFeatures(); savePrefs();
  };
  document.getElementById('l3c-motion').onclick = function() {
    state.reduceMotion = !state.reduceMotion; applyFeatures(); savePrefs();
  };
  document.getElementById('l3c-read').onclick = function() {
    const text = window.getSelection().toString();
    if(text) new SpeechSynthesisUtterance(text).text = text, speechSynthesis.speak(text);
  };

  // Modal toggling & keyboard
  function toggleModal() {
    const isOpen = overlay.style.display === 'block';
    overlay.style.display = isOpen ? 'none' : 'block';
    modal.style.display = isOpen ? 'none' : 'block';
    if (!isOpen) modal.focus();
  }
  function closeModal(e) {
    overlay.style.display = 'none'; modal.style.display = 'none';
    btn.focus();
  }
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeModal();
  });

  // Initialize
  applyFeatures();
  console.log('Widget L3C V4 chargé pour compte', accountId);
})();
