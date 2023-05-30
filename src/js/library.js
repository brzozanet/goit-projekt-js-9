import { API_KEY, IMG_URL, URL, LANGUAGE } from "./setup";

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
  watchedDivEl.style.display = "block";
  queuedDivEl.style.display = "none";
  libraryInfoEl.style.display = "none";
});

queueBtnEl.addEventListener("click", () => {
  watchedDivEl.style.display = "none";
  queuedDivEl.style.display = "block";
  libraryInfoEl.style.display = "none";
});
