import {
  PROJECT_LOCATION_PATH,
  API_KEY,
  IMG_URL,
  URL,
  LANGUAGE,
} from "./setup";
import { IMG_URL } from "./setup";
import { UserMovies } from "./local-storage";
import { genres } from "./genres";

const userMovies = new UserMovies();

export const modalBoxShow = movie => {
  const popupEl = document.querySelector(".backdrop");
  const closeBtnEl = document.querySelector(".modal__btn-close");
  const imageEl = document.querySelector(".modal__photo");
  const titleEl = document.querySelector(".modal__title");
  const voteEl = document.querySelector(".modal__stats-vote");
  const votesEl = document.querySelector(".modal__stats-votes");
  const popularityEl = document.querySelector(".modal__popularity");
  const originalTitleEl = document.querySelector(".modal__film-title");
  const genreEl = document.querySelector(".modal__genre");
  const aboutEl = document.querySelector(".modal__about-text");

  popupEl.classList.remove("is-hidden");

  const posterSrc = movie.poster_path
    ? `${IMG_URL}${movie.poster_path}`
    : "https://fotowarsztaty.com/wp-content/uploads/poster-placeholder.png";

  const posterAlt = movie.poster_path
    ? movie.original_title
    : "Poster Not Found";

  imageEl.innerHTML = `<img class="posters__img" src="${posterSrc}" alt="${posterAlt}"/>`;
  titleEl.innerHTML = `${movie.original_title}`;
  voteEl.innerHTML = `${movie.vote_average}`;
  votesEl.innerHTML = `${movie.vote_count}`;
  popularityEl.innerHTML = `${movie.popularity}`;
  originalTitleEl.innerHTML = `${movie.original_title}`;
  aboutEl.innerHTML = `${movie.overview}`;

  const { genre_ids } = movie;
  const movieGenres = genre_ids
    .map(genreId => {
      const genre = genres.find(genre => genre.id === genreId);
      return genre ? genre.name : "";
    })
    .join(", ");
  genreEl.innerHTML = movieGenres;

  const url = window.location.pathname;
  if (
    url === "/index.html" ||
    url === `${PROJECT_LOCATION_PATH}/` ||
    url === `${PROJECT_LOCATION_PATH}/index.html`
  ) {
    document
      .querySelector(".modal__info-buttons")
      .classList.remove("is-hidden");
  } else if (
    url === "/library.html" ||
    url === `${PROJECT_LOCATION_PATH}/library.html`
  ) {
    document.querySelector(".modal__info-buttons").classList.add("is-hidden");
  }

  const addWatchBtnEl = document.querySelector("#modal__button-watched");
  const addQueueBtnEl = document.querySelector("#modal__button-queue");

  addWatchBtnEl.addEventListener("click", () => userMovies.addToWatch(movie));
  addQueueBtnEl.addEventListener("click", () => userMovies.addToQueue(movie));

  closeBtnEl.addEventListener("click", () => {
    popupEl.classList.add("is-hidden");
    const iframe = document.getElementById("modal__trailer-video");
    iframe.src = "";
  });

  window.addEventListener("keyup", event => {
    if (event.key === "Escape") {
      popupEl.classList.add("is-hidden");
    }
  });

  window.addEventListener("keyup", event => {
    if (event.key === "Escape") {
      popupEl.classList.add("is-hidden");
    }
  });

  window.addEventListener("click", event => {
    if (event.target.classList.contains("backdrop")) {
      popupEl.classList.add("is-hidden");
    }
  });
};
