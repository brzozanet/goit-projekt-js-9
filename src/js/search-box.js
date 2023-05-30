import "../sass/main.scss";
import { API_KEY, IMG_URL, URL, LANGUAGE } from "./setup";
import { UserMovies } from "./local-storage";
import { genres } from "./genres";
import { modalBoxShow } from "./modal";

const userMovies = new UserMovies();

const SEARCH_API = `${URL}/search/movie?api_key=${API_KEY}&query=`;

const form = document.querySelector("#form");
const search = document.querySelector("#search");
const moviesContainerEl = document.querySelector(".movies-container");


async function getMovies(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await res.json();
    showMovies(data.results);
  } catch (error) {
    console.error(error);
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
      .map(genreId => genres.find(genre => genre.id === genreId).name)
      .join(", ");

    if (!poster_path) {
      movieEl.innerHTML = `
      <div id="card" class="card">
        <img class="card__poster" src="src/images/not-found.jpg" alt="${original_title}" title="${original_title}" />
        <div class="card__content">
          <div class="card__info">
            <div class="card__title">${original_title}</div>
            <div class="card__genre">${movieGenres} |</div>
            <div class="card__release">${release_date.slice(0, 4)} </div>
            
          </div>
        </div>
      </div>`;
    } else {
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
    }
    moviesContainerEl.appendChild(movieEl);

    // ================================ SHOW MODAL ================================

    movieEl.addEventListener("click", () => {
      modalBoxShow(movie);
    });

  });
}
if (form !== null) 
form.addEventListener("input", () => {
  const searchTerm = search.value;

  if (searchTerm && searchTerm !== "") {
    const searchUrl = SEARCH_API + searchTerm;
    getMovies(searchUrl);
  } else {
    window.location.reload();
  }
});
