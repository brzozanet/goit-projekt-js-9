import { API_KEY, IMG_URL, URL, LANGUAGE } from "./setup";
import { showSpinner, hideSpinner } from "./loading-spinner";
import { UserMovies } from "./local-storage";
import "./search-box";

const userMovies = new UserMovies();

userMovies.displayWatchedMovies();
userMovies.displayQueuedMovies();

export const fetchMostPopular = async () => {
  let currentPage = 1;
  let totalPages = 0;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  const fetchPopularData = async page => {
    try {
      showSpinner();
      const response = await fetch(
        `${URL}movie/popular?language=${LANGUAGE}&page=${page}&api_key=${API_KEY}`,
        options
      );
      const data = await response.json();
      hideSpinner();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const fetchGenres = async () => {
    try {
      const response = await fetch(
        `${URL}genre/movie/list?api_key=${API_KEY}`,
        options
      );
      const genreNames = await response.json();
      return genreNames.genres;
    } catch (error) {
      console.error(error);
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

    popularMovies(movies);
    totalPages = popularMoviesData.total_pages;

    if (currentPage < totalPages) {
      window.addEventListener("scroll", handleScroll);
    }
  };

  const handleScroll = async () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 10) {
      window.removeEventListener("scroll", handleScroll);
      currentPage++;
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
      popularMovies(movies);
      if (currentPage < totalPages) {
        window.addEventListener("scroll", handleScroll);
      }
    }
  };

  const popularMovies = movies => {
    movies.forEach(movie => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <div id="card" class="card" >
          <img class="card__poster" src="${IMG_URL}${movie.poster_path}" alt="${
        movie.original_title
      }" title="${movie.original_title}" />
        </div>
        <div class="card__content">
          <div class="card__info">
            <div class="card__title">${movie.original_title}</div>
            <div class="card__genre">${movie.genres.join(", ")} |</div>
            <div class="card__release">${movie.release_date.slice(0, 4)}</div>
          </div>
        </div>`;

      const moviesContainerEl = document.querySelector("#gallery");

      moviesContainerEl.appendChild(card);

      // ================================ SHOW MODAL ================================

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
        imageEl.src = `${IMG_URL}${movie.poster_path}`;
        titleEl.innerHTML = `${movie.original_title}`;
        voteEl.innerHTML = `${movie.vote_average}`;
        votesEl.innerHTML = `${movie.vote_count}`;
        popularityEl.innerHTML = `${movie.popularity}`;
        originalTitleEl.innerHTML = `${movie.original_title}`;
        genreEl.innerHTML = `${movie.genres.join(", ")}`;
        aboutEl.innerHTML = `${movie.overview}`;

        const addWatchBtnEl = document.querySelector("#modal__button-watched");
        const addQueueBtnEl = document.querySelector("#modal__button-queue");

        addWatchBtnEl.addEventListener("click", () =>
          userMovies.addToWatch(movie)
        );

        addQueueBtnEl.addEventListener("click", () =>
          userMovies.addToQueue(movie)
        );

        // ================================ HIDE MODAL ================================

        closeBtnEl.addEventListener("click", () => {
          popupEl.classList.add("is-hidden");
        });

        window.addEventListener("keyup", e => {
          if (e.key === "Escape") {
            popupEl.classList.add("is-hidden");
          }
        });

        window.addEventListener("keyup", e => {
          if (e.key === "Escape") {
            popupEl.classList.add("is-hidden");
          }
        });

        window.addEventListener("click", e => {
          if (e.target.classList.contains("backdrop")) {
            popupEl.classList.add("is-hidden");
          }
        });
      };
    });
  };

  await matchGenres();
};
fetchMostPopular();
