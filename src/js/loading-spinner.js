export const showSpinner = () => {
  const spinnerEl = document.querySelector(".lds-ring");
  spinnerEl.style.display = "flex";
};

export const hideSpinner = () => {
  const spinnerEl = document.querySelector(".lds-ring");
  spinnerEl.style.display = "none";
};
