import "../sass/main.scss";
import { API_KEY, IMG_URL, URL, LANGUAGE } from "./setup";
import { UserMovies } from "./local-storage";
import { genres } from "./genres";
import { modalBoxShow } from "./modal";
import Notiflix from "notiflix";
import debounce from "lodash/debounce";

const DEBOUNCE_DELAY = 1000;

Notiflix.Notify.init({
  width: "280px",
  position: "center-top",
  timeout: 4000,
  closeButton: false,
  distance: "25px",
  borderRadius: "10px",
  fontSize: "18px",
});

const userMovies = new UserMovies();

const SEARCH_API = `${URL}/search/movie?api_key=${API_KEY}&query=`;
// const API_URL = `${URL}/discover/movie?include_adult=false&include_video=false&language=${LANGUAGE}&page=1&sort_by=popularity.desc&api_key=${API_KEY}`;

const form = document.querySelector("#form");
const search = document.querySelector("#search");
const moviesContainerEl = document.querySelector(".movies-container");

async function getMovies(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Notiflix.Notify.warning(
        "Sorry, the server is not responding. Please try again later."
      );
    }
    const data = await res.json();
    if (data.results.length === 0) {
      throw new Notiflix.Notify.failure("MOVIE  NOT  FOUND");
    }
    showMovies(data.results);
  } catch (error) {
    console.log("MOVIE  NOT  FOUND");
  }
}

function showMovies(movies) {
  moviesContainerEl.innerHTML = "";

  movies.forEach(movie => {
    const {
      original_title,
      poster_path,
      vote_average,
      release_date,
      genre_ids,
    } = movie;

    const movieEl = document.createElement("div");
    movieEl.classList.add("card");

    const movieGenres = genre_ids
      .map(genreId => {
        const genre = genres.find(genre => genre.id === genreId);
        return genre ? genre.name : "";
      })
      .join(", ");

    // Sprawdź, czy poster_path istnieje
    const posterSrc = poster_path
      ? `${IMG_URL}${poster_path}`
      : "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png";
    const posterAlt = poster_path ? original_title : "Poster Not Found";

    movieEl.innerHTML = `
      <div id="card" class="card">
        <img class="card__poster" src="${posterSrc}" alt="${posterAlt}" title="${original_title}" />
        <div class="card__content">
          <div class="card__info">
            <div class="card__title">${original_title}</div>
            <div class="card__genre">${movieGenres} |</div>
            <div class="card__release">${release_date.slice(0, 4)} </div>
          </div>
        </div>
      </div>`;

    moviesContainerEl.appendChild(movieEl);

    movieEl.addEventListener("click", async () => {
      modalBoxShow(movie);
      await getTrailerLink(movie.id);
    });

    const addWatchBtnEl = document.querySelector("#modal__button-watched");
    const addQueueBtnEl = document.querySelector("#modal__button-queue");

    addWatchBtnEl.addEventListener("click", () => userMovies.addToWatch(movie));
    addQueueBtnEl.addEventListener("click", () => userMovies.addToQueue(movie));
  });
}

if (form !== null)
  form.addEventListener(
    "input",
    debounce(() => {
      const searchTerm = search.value;
      const searchUrl = SEARCH_API + searchTerm;
      if (searchTerm && searchTerm !== "") {
        getMovies(searchUrl);
      } else {
        window.location.reload();
      }
    }, DEBOUNCE_DELAY)
  );

const getTrailerLink = async id => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=${LANGUAGE}&api_key=${API_KEY}`,
      options
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    const { results } = data;
    const key = results[0].key;
    const youtubeLink = `https://www.youtube.com/embed/${key}`;
    const trailerEl = document.querySelector(".modal__trailer");
    trailerEl.innerHTML = `<iframe id="modal__trailer-video" width="373" height="210" src="${youtubeLink}" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  } catch (error) {
    console.error(error);
  }
};
