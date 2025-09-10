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

  // Auth button placeholder
  if (authBtn) {
    authBtn.addEventListener('click', () => {
      // Placeholder: integrate your 3rd-party auth here (Auth0 / Firebase / etc.)
      // Example options:
      // - Auth0 (recommended SPA flow): use the Auth0 SPA JS SDK and call loginWithRedirect()
      // - Firebase Auth: call signInWithPopup() or redirect
      //
      // For now we'll redirect to /account.html (create this route later)
      window.location.href = '/account.html';
    });
  }

  // ---- Example commented snippet for Auth0 integration (do not run as-is) ----
  /* 
  // 1) Add the Auth0 SPA SDK in your HTML:
  // <script src="https://cdn.auth0.com/js/auth0-spa-js/latest/auth0-spa-js.production.js"></script>
  //
  // 2) Then initialize and call login:
  // (async () => {
  //   const auth0 = await createAuth0Client({
  //     domain: 'YOUR_AUTH0_DOMAIN',
  //     client_id: 'YOUR_AUTH0_CLIENT_ID',
  //     redirect_uri: window.location.origin
  //   });
  //
  //   // Trigger login
  //   auth0.loginWithRedirect();
  // })();
  */
});
