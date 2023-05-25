// export const showModal = () => {
//   const refs = {
//     openModalBtn: document.querySelector("[data-modal-open]"),
//     closeModalBtn: document.querySelector("[data-modal-close]"),
//     modal: document.querySelector("[data-modal]"),
//   };

//   function toggleModal() {
//     refs.modal.classList.toggle("is-hidden");
//   }

//   refs.openModalBtn.addEventListener("click", toggleModal);
//   refs.closeModalBtn.addEventListener("click", toggleModal);
// };
export { showModal, closeModal, toggleWatched, toggleQueue };
window.addEventListener("load", () => {
  document
    .querySelector("#modal__button-watched")
    .addEventListener("click", toggleWatched);
  document
    .querySelector("#modal__button-queue")
    .addEventListener("click", toggleQueue);
  document.addEventListener("keyup", e => {
    if (e.key === "Escape") closeModal();
  });
  document.addEventListener("click", e => {
    if (!e.target.classList.contains("modal")) closeModal();
  });
  document.querySelector(".modal").addEventListener("click", e => {
    e.stopPropagation();
  });
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
