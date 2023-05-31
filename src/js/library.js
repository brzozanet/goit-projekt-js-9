import "../sass/main.scss";
import { API_KEY, IMG_URL, URL, LANGUAGE } from "./setup";
import { UserMovies } from "./local-storage";
import { modalBoxShow } from "./modal-library";
import Notiflix from "notiflix";
// import { getTrailerLink } from "./app";
let currentPage = 1;
let totalPages = 0;

const fetchPopularData = async page => {
  try {
    // showSpinner();
    const response = await fetch(
      `${URL}movie/popular?language=${LANGUAGE}&page=${page}&api_key=${API_KEY}`
    );
    const data = await response.json();
    // hideSpinner();
    return data;
  } catch (error) {
    Notiflix.Notify.failure(
      "Sorry, the server is not responding. Please try again later."
    );
  }
};

const fetchGenres = async () => {
  try {
    const response = await fetch(`${URL}genre/movie/list?api_key=${API_KEY}`);
    const genreNames = await response.json();
    return genreNames.genres;
  } catch (error) {
    Notiflix.Notify.failure(
      "Sorry, the server is not responding. Please try again later."
    );
  }
};

const matchGenres = async () => {
  const genres = await fetchGenres();
  const popularMoviesData = await fetchPopularData(currentPage);
  const movies = popularMoviesData.results.map(movie => {
    const movieGenresIds = movie.genre_ids;
    const matchedGenres = [];
    for (let i = 0; i < movieGenresIds.length; i++) {
      for (let j = 0; j < genres.length; j++) {
        if (movieGenresIds[i] === genres[j].id) {
          matchedGenres.push(genres[j].name);
        }
      }
    }
    movie.genres = matchedGenres;
    return movie;
  });
  return movies;
};

let watchedMovies = JSON.parse(localStorage.getItem("watched-movies"));
let queuedMovies = JSON.parse(localStorage.getItem("queued-movies"));

const watchedMoviesContainerEl = document.querySelector("#library-watched");
const queuedMoviesContainerEl = document.querySelector("#library-queued");

if (watchedMovies && Array.isArray(watchedMovies)) {
  const showWatchedMovies = movies => {
    movies.forEach(movie => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
          <div id="card" class="card" >
            <img class="card__poster" src="${IMG_URL}${
        movie.poster_path
      }" alt="${movie.original_title}" title="${movie.original_title}" />
          </div>
          <div class="card__content">
            <div class="card__info">
              <div class="card__title">${movie.original_title}</div>
              <div class="card__genre">${movie.genres.join(", ")} |</div>
              <div class="card__release">${movie.release_date.slice(0, 4)}</div>
            </div>
          </div>`;
      card.addEventListener("click", async () => {
        modalBoxShow(movie);
        await getTrailerLink(movie.id);
      });
      watchedMoviesContainerEl.appendChild(card);
      watchedMoviesContainerEl.classList.remove("hiddenColor");
    });
  };
  showWatchedMovies(watchedMovies);
} else {
  const noWatchedMovies = document.createElement("div");
  noWatchedMovies.innerHTML = `
    <p class="library__title">
        <strong>You have no watched movies.</strong><br /><a href="index.html">Select first movie</a> and click "Add to watched" button.
    </p>`;
  watchedMoviesContainerEl.appendChild(noWatchedMovies);
}

if (queuedMovies && Array.isArray(queuedMovies)) {
  const showQueuedMovies = movies => {
    movies.forEach(movie => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
          <div id="card" class="card" >
            <img class="card__poster" src="${IMG_URL}${
        movie.poster_path
      }" alt="${movie.original_title}" title="${movie.original_title}" />
          </div>
          <div class="card__content">
            <div class="card__info">
              <div class="card__title">${movie.original_title}</div>
              <div class="card__genre">${movie.genres.join(", ")} |</div>
              <div class="card__release">${movie.release_date.slice(0, 4)}</div>
            </div>
          </div>`;
      card.addEventListener("click", () => {
        modalBoxShow(movie);
      });
      queuedMoviesContainerEl.appendChild(card);
      queuedMoviesContainerEl.classList.remove("hiddenColor");
    });
  };
  showQueuedMovies(queuedMovies);
} else {
  const noQueuedMovies = document.createElement("div");
  noQueuedMovies.innerHTML = `
    <p class="library__title">
        <strong>You have no queued movies.</strong><br /><a href="index.html">Select first movie</a> and click "Add to queue" button.
    </p>`;
  queuedMoviesContainerEl.appendChild(noQueuedMovies);
}

const watchedBtnEl = document.querySelector("#button-watched");
const queueBtnEl = document.querySelector("#button-queue");
const watchedDivEl = document.querySelector("#library-watched");
const queuedDivEl = document.querySelector("#library-queued");
const libraryInfoEl = document.querySelector("#library-info");

watchedBtnEl.addEventListener("click", () => {
  watchedDivEl.classList.remove("hidden-in-library");
  queuedDivEl.classList.add("hidden-in-library");
  libraryInfoEl.classList.add("hidden-in-library");
});

queueBtnEl.addEventListener("click", () => {
  watchedDivEl.classList.add("hidden-in-library");
  queuedDivEl.classList.remove("hidden-in-library");
  libraryInfoEl.classList.add("hidden-in-library");
});

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
    console.log(youtubeLink);
  } catch (error) {
    console.error(error);
  }
};
