document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menu-btn");
  const mainMenu = document.getElementById("main-menu");
  const clickSound = document.getElementById("click-sound");

  // Play click sound safely
  function playClickSound() {
    if (!clickSound) return;
    try {
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});
    } catch (e) {}
  }

  // Toggle dropdown menu
  if (menuBtn && mainMenu) {
    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // prevent immediate close by document click
      const isOpen = mainMenu.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
      mainMenu.setAttribute("aria-hidden", isOpen ? "false" : "true");
      playClickSound();
    });

    // Close menu when clicking anywhere else
    document.addEventListener("click", (e) => {
      if (!mainMenu.contains(e.target) && !menuBtn.contains(e.target)) {
        mainMenu.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
        mainMenu.setAttribute("aria-hidden", "true");
      }
    });
  }

  // Add click + shake effect for interactive elements
  document.querySelectorAll(".interactive").forEach(el => {
    el.addEventListener("click", (ev) => {
      playClickSound();
      el.classList.add("shake");

      // Normal anchor navigation delay
      if (el.tagName === "A") {
        const targetBlank = el.getAttribute("target") === "_blank";
        const href = el.getAttribute("href");
        if (!targetBlank && href && !ev.metaKey && !ev.ctrlKey && !ev.shiftKey) {
          ev.preventDefault();
          setTimeout(() => { window.location.href = href; }, 160);
        }
      }
    });
    el.addEventListener("animationend", e => {
      if (e.animationName === "clickShake") el.classList.remove("shake");
    });
    el.addEventListener("keydown", e => { if (e.key === "Enter") playClickSound(); });
  });
});
