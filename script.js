function addClickEffects() {
  const bepSound = new Audio('bep.mp3'); // Add bep.mp3 in same folder
  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('click', (e) => {
      e.target.classList.add('shake');
      bepSound.currentTime = 0;
      bepSound.play();
      setTimeout(() => {
        e.target.classList.remove('shake');
      }, 300);
    });
  });
}

document.addEventListener('DOMContentLoaded', addClickEffects);
