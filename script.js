// script.js - fully rebuilt
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menu-btn");
  const mainMenu = document.getElementById("main-menu");
  const clickSound = document.getElementById("click-sound");
  const interactiveEls = Array.from(document.querySelectorAll(".interactive"));

  // Play click sound safely
  function playClickSound() {
    if (!clickSound) return;
    try {
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {}); // ignore playback errors
    } catch (e) {}
  }

  // Add shake + sound for all interactive elements
  interactiveEls.forEach(el => {
    el.addEventListener("click", (ev) => {
      playClickSound();
      el.classList.add("shake");

      // If it’s a normal anchor (not _blank), delay navigation
      if (el.tagName === "A") {
        const targetBlank = el.getAttribute("target") === "_blank";
        const href = el.getAttribute("href");

        if (!targetBlank && href && !ev.metaKey && !ev.ctrlKey && !ev.shiftKey) {
          ev.preventDefault();
          setTimeout(() => window.location.href = href, 160);
        }
      }
    });

    el.addEventListener("animationend", e => {
      if (e.animationName === "clickShake") el.classList.remove("shake");
    });

    el.addEventListener("keydown", e => {
      if (e.key === "Enter") playClickSound();
    });
  });

  // Hamburger menu toggle
  if (menuBtn && mainMenu) {
    menuBtn.addEventListener("click", () => {
      const expanded = menuBtn.getAttribute("aria-expanded") === "true" || false;
      menuBtn.setAttribute("aria-expanded", !expanded);

      mainMenu.classList.toggle("open");
      mainMenu.setAttribute("aria-hidden", expanded);
    });

    // Close menu when clicking outside
    document.addEventListener("click", e => {
      if (!mainMenu.contains(e.target) && !menuBtn.contains(e.target)) {
        mainMenu.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
        mainMenu.setAttribute("aria-hidden", "true");
      }
    });
  }
});
