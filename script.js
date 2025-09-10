document.addEventListener("DOMContentLoaded", () => {
  const sound = document.getElementById("click-sound");

  document.querySelectorAll(".click-sound").forEach(el => {
    el.addEventListener("click", () => {
      sound.currentTime = 0; // restart sound if already playing
      sound.play();
    });
  });
});
