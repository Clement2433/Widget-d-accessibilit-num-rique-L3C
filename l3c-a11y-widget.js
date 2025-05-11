
(function(){
  // Configuration
  const config = window.L3CAccessibilityConfig || {};
  const position = config.position || 'right';
  const theme = config.theme || 'light';
  const modules = config.modules || {};

  // Create style element
  const style = document.createElement('style');
  style.innerHTML = `
    .l3c-btn { position: fixed; bottom: 20px; ${position}: 20px; background: #007BFF; color: #fff; border: none; border-radius: 50%; width: 50px; height: 50px; cursor: pointer; z-index: 9999; }
    .l3c-panel { position: fixed; bottom: 80px; ${position}: 20px; background: #fff; border: 1px solid #ccc; border-radius: 8px; padding: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); z-index: 9999; display: none; min-width: 200px; }
    .l3c-panel button { display: block; width: 100%; margin: 5px 0; padding: 8px; border: none; background: #f0f0f0; cursor: pointer; border-radius: 4px; text-align: left; }
  `;
  document.head.appendChild(style);

  // Create floating button
  const btn = document.createElement('button');
  btn.className = 'l3c-btn';
  btn.setAttribute('aria-label', 'Ouvrir le panneau d\'accessibilité');
  btn.innerText = '♿';
  btn.onclick = () => panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
  document.body.appendChild(btn);

  // Create panel
  const panel = document.createElement('div');
  panel.className = 'l3c-panel';
  panel.setAttribute('role', 'region');
  panel.setAttribute('aria-label', 'Outils d\'accessibilité');

  // Utility functions
  function setFontSize(size) {
    document.documentElement.style.fontSize = size + '%';
  }
  function toggleHighContrast() {
    document.documentElement.classList.toggle('l3c-high-contrast');
  }
  function toggleInvert() {
    document.documentElement.classList.toggle('l3c-invert-contrast');
  }
  function setDyslexicFont() {
    document.body.style.fontFamily = 'OpenDyslexic, Arial, sans-serif';
  }
  function setSpacing() {
    document.body.style.lineHeight = '1.8';
    document.body.style.letterSpacing = '0.05em';
  }
  function disableMotion() {
    const css = document.createElement('style');
    css.innerHTML = `* { animation: none !important; transition: none !important; }`;
    document.head.appendChild(css);
  }
  function underlineLinks() {
    const css = document.createElement('style');
    css.innerHTML = 'a { text-decoration: underline !important; }';
    document.head.appendChild(css);
  }
  function enlargeCursor() {
    document.documentElement.style.cursor = 'pointer';
  }
  function readSelection() {
    const text = window.getSelection().toString();
    if(text) {
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
    }
  }

  // Add buttons based on modules or always include for MVP
  panel.innerHTML = `
    <button id="l3c-size-increase">Taille +</button>
    <button id="l3c-size-decrease">Taille -</button>
    <button id="l3c-contrast-high">Contraste élevé</button>
    <button id="l3c-contrast-invert">Contraste inversé</button>
    <button id="l3c-dyslexic">Police dyslexique</button>
    <button id="l3c-spacing">Espacement texte</button>
    <button id="l3c-motion">Stop animations</button>
    <button id="l3c-underline">Souligner liens</button>
    <button id="l3c-cursor">Curseur agrandi</button>
    <button id="l3c-read">Lire sélection</button>
  `;

  document.body.appendChild(panel);

  // Event listeners
  document.getElementById('l3c-size-increase').onclick = () => {
    const current = parseInt(getComputedStyle(document.documentElement).fontSize) || 16;
    setFontSize((current / 16 * 100) + 10);
  };
  document.getElementById('l3c-size-decrease').onclick = () => {
    const current = parseInt(getComputedStyle(document.documentElement).fontSize) || 16;
    setFontSize((current / 16 * 100) - 10);
  };
  document.getElementById('l3c-contrast-high').onclick = toggleHighContrast;
  document.getElementById('l3c-contrast-invert').onclick = toggleInvert;
  document.getElementById('l3c-dyslexic').onclick = setDyslexicFont;
  document.getElementById('l3c-spacing').onclick = setSpacing;
  document.getElementById('l3c-motion').onclick = disableMotion;
  document.getElementById('l3c-underline').onclick = underlineLinks;
  document.getElementById('l3c-cursor').onclick = enlargeCursor;
  document.getElementById('l3c-read').onclick = readSelection;

  // Add CSS classes for high contrast and invert
  const contrastStyle = document.createElement('style');
  contrastStyle.innerHTML = `
    .l3c-high-contrast { background: #000 !important; color: #fff !important; }
    .l3c-invert-contrast { filter: invert(1) hue-rotate(180deg) !important; }
  `;
  document.head.appendChild(contrastStyle);

  console.log('Widget L3C chargé.');
})();
