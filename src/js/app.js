import "../sass/main.scss";
import { fetchMostPopular } from "./most-popular";
import { showSpinner, hideSpinner } from "./loading-spinner";
import { showModal } from "./modal";

fetchMostPopular();
showModal();
