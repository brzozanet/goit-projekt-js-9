export { toggleWatched, toggleQueue };
window.addEventListener("load", () => {
  document
    .querySelector("#modal__button-watched")
    .addEventListener("click", toggleWatched);
  document
    .querySelector("#modal__button-queue")
    .addEventListener("click", toggleQueue);
});
function toggleWatched() {
  document
    .querySelector("#modal__button-watched")
    .classList.toggle("button-active");
  if (
    document
      .querySelector("#modal__button-watched")
      .classList.contains("button-active")
  ) {
    document.querySelector("#modal__button-watched").textContent =
      "Remove from watched";
  } else {
    document.querySelector("#modal__button-watched").textContent =
      "Add to watched";
  }
}
function toggleQueue() {
  document
    .querySelector("#modal__button-queue")
    .classList.toggle("button-active");
  if (
    document
      .querySelector("#modal__button-queue")
      .classList.contains("button-active")
  ) {
    document.querySelector("#modal__button-queue").textContent =
      "Remove from queue";
  } else {
    document.querySelector("#modal__button-queue").textContent = "Add to queue";
  }
}
