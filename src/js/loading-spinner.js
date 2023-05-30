export const showSpinner = () => {
  const spinnerEl = document.querySelector(".lds-ring");

  if (!spinnerEl) return;
  spinnerEl.style.display = "block";
  // spinnerEl.style.display = "flex";
};

export const hideSpinner = () => {
  const spinnerEl = document.querySelector(".lds-ring");
  if (!spinnerEl) return;
  spinnerEl.style.display = "none";
};
