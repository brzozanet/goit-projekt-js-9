import "../sass/main.scss";
import { fetchMostPopular } from "./most-popular";
import "./search-box";
import { toggleWatched, toggleQueue } from "./modal";
import { showSpinner, hideSpinner } from "./loading-spinner";
import "./search-box";

fetchMostPopular();
