export const showSpinner = () => {
  const spinnerEl = document.querySelector(".lds-ring");

  if (!spinnerEl) return;
  spinnerEl.classList.remove("is-hidden");
};

export const hideSpinner = () => {
  const spinnerEl = document.querySelector(".lds-ring");
  if (!spinnerEl) return;
  spinnerEl.classList.add("is-hidden");
};
