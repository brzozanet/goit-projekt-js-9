export const showSpinner = () => {
  const spinnerEl = document.querySelector(".lds-ring");
  if (!spinnerEl) return;
  spinnerEl.style.display = "block";
};

export const hideSpinner = () => {
  const spinnerEl = document.querySelector(".lds-ring");
  if (!spinnerEl) return;
  spinnerEl.style.display = "none";
};
