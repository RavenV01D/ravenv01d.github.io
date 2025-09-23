// script.js
document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('click-sound');
  const interactiveEls = Array.from(document.querySelectorAll('.interactive'));
  const menuBtn = document.getElementById('menu-btn');
  const mainMenu = document.getElementById('main-menu');
  const authBtn = document.getElementById('auth-btn');

  // Play sound safely
  function playClickSound() {
    if (!audio) return;
    try {
      audio.currentTime = 0;
      audio.play().catch(()=>{ /* user gesture required; ignore */ });
    } catch (e) { /* ignore playback errors */ }
  }

  // Add interactions: play sound + small shake + (optional) delayed navigation so sound is audible
  interactiveEls.forEach(el => {
    el.addEventListener('click', (ev) => {
      // play sound + add shake
      playClickSound();
      el.classList.add('shake');

      // if it's a normal anchor (no target="_blank"), delay navigation slightly so sound plays
      if (el.tagName === 'A') {
        const targetBlank = el.getAttribute('target') === '_blank';
        const href = el.getAttribute('href');

        // allow modifier keys (ctrl/meta/shift) to open normally
        if (!targetBlank && href && !ev.metaKey && !ev.ctrlKey && !ev.shiftKey) {
          ev.preventDefault();
          // short delay so user hears the click (adjust if too long)
          setTimeout(() => {
            window.location.href = href;
          }, 160);
        }
      }
    });

    // remove shake after animation
    el.addEventListener('animationend', (e) => {
      if (e.animationName === 'clickShake') el.classList.remove('shake');
    });

    // keyboard activation (Enter)
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        playClickSound();
      }
    });
  });

  // Menu toggle with small animation class
  if (menuBtn && mainMenu) {
    menuBtn.addEventListener('click', () => {
      const isOpen = mainMenu.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      mainMenu.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    });

    // close menu on outside click
    document.addEventListener('click', (e) => {
      if (!mainMenu.contains(e.target) && !menuBtn.contains(e.target)) {
        mainMenu.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
        mainMenu.setAttribute('aria-hidden', 'true');
      }
    });
  }
