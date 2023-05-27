import "../sass/main.scss";
import { API_KEY, IMG_URL, URL, LANGUAGE } from "./setup";

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
    // const { original_title, poster_path, vote_average, release_date, genres } = movie;

    const movieEl = document.createElement("div");
    movieEl.classList.add("card");

    movieEl.innerHTML = `
      <div id="card" class="card">
        <img class="card__poster" src="${IMG_URL}${movie.poster_path}" alt="${movie.original_title}" title="${movie.original_title}" />
        <div class="card__content">
          <div class="card__info">
            <div class="card__title">${movie.original_title}</div>
            <div class="card__genre">${movie.genre_ids} |</div>
            <div class="card__release">${movie.release_date.slice(0, 4)} |</div>
            <div class="card__rating">Rating: ${movie.vote_average}</div>
          </div>
        </div>
      </div>`;

    moviesContainerEl.appendChild(movieEl);
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
