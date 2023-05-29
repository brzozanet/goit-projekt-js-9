import "../sass/main.scss";
import { API_KEY, IMG_URL, URL, LANGUAGE } from "./setup";
import { genres } from "./genres";

const SEARCH_API = `${URL}/search/movie?api_key=${API_KEY}&query=`;
const API_URL = fetch(
  // `${URL}/discover/movie?include_adult=false&include_video=false&language=${LANGUAGE}&page=1&sort_by=popularity.desc`
  `${URL}/discover/movie?include_adult=false&include_video=false&language=${LANGUAGE}&page=1&sort_by=popularity.desc&api_key=${API_KEY}`
)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));

const form = document.getElementById("form");
const search = document.getElementById("search");
const moviesContainerEl = document.querySelector(".movies-container");

getMovies(API_URL);

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();

  showMovies(data.results);
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
      .map(genreId => genres.find(genre => genre.id === genreId).name)
      .join(", ");

    movieEl.innerHTML = `
      <div id="card" class="card">
        <img class="card__poster" src="${IMG_URL}${poster_path}" alt="${original_title}" title="${original_title}" />
        <div class="card__content">
          <div class="card__info">
            <div class="card__title">${original_title}</div>
            <div class="card__genre">${movieGenres} |</div>
            <div class="card__release">${release_date.slice(0, 4)} </div>
            
          </div>
        </div>
      </div>`;

    moviesContainerEl.appendChild(movieEl);

    card.addEventListener("click", () => {
      modalBoxShow(movie);
    });

    const modalBoxShow = movie => {
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
      moviesContainerEl.classList.add("hiddenColor");
      imageEl.src = `${IMG_URL}${movie.poster_path}`;
      titleEl.innerHTML = `${movie.original_title}`;
      voteEl.innerHTML = `${movie.vote_average}`;
      votesEl.innerHTML = `${movie.vote_count}`;
      popularityEl.innerHTML = `${movie.popularity}`;
      originalTitleEl.innerHTML = `${movie.original_title}`;
      genreEl.innerHTML = `${movie.genres.join(", ")}`;
      aboutEl.innerHTML = `${movie.overview}`;

      closeBtnEl.addEventListener("click", () => {
        popupEl.classList.add("is-hidden");
        moviesContainerEl.classList.remove("hiddenColor");
      });

      window.addEventListener("keyup", e => {
        if (e.key === "Escape") {
          popupEl.classList.add("is-hidden");
        }
      });

      window.addEventListener("keyup", e => {
        if (e.key === "Escape") {
          popupEl.classList.add("is-hidden");
          moviesContainerEl.classList.remove("hiddenColor");
        }
      });

      window.addEventListener("click", e => {
        if (e.target.classList.contains("backdrop")) {
          popupEl.classList.add("is-hidden");
          moviesContainerEl.classList.remove("hiddenColor");
        }
      });
    };
  });
}

form.addEventListener("submit", event => {
  event.preventDefault();

  const searchTerm = search.value;

  if (searchTerm && searchTerm !== "") {
    getMovies(SEARCH_API + searchTerm);

    search.value = "";
  } else {
    window.location.reload();
  }
});
