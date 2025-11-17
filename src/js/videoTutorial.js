const openBtn = document.getElementById("openVideo");
const modal = document.getElementById("videoModal");
const closeBtn = document.getElementById("closeModal");
const video = document.getElementById("tutorialVideo");

openBtn.onclick = () => {
  modal.style.display = "flex";
  video.play();
};

closeBtn.onclick = () => {
  modal.style.display = "none";
  video.pause();
  video.currentTime = 0;
};

window.onclick = (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
    video.pause();
    video.currentTime = 0;
  }
};
