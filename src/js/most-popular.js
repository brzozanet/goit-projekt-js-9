import "../sass/main.scss";
import { API_KEY, IMG_URL, URL, LANGUAGE } from "./setup";
import { showSpinner, hideSpinner } from "./loading-spinner";
export const fetchMostPopular = () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  const moviesContainerEl = document.querySelector("#gallery");

  const fetchPopularData = async () => {
    try {
      showSpinner();
      const response = await fetch(
        `${URL}movie/popular?language=${LANGUAGE}&page=1&api_key=${API_KEY}`,
        options
      );
      const data = await response.json();
      console.log(data.results);
      hideSpinner();
      return data.results;
    } catch (error) {
      console.error(error);
    }
  };

  const fetchGenres = async () => {
    try {
      const response = await fetch(
        `${URL}/genre/movie/list?api_key=${API_KEY}`,
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
    const popularMoviesData = await fetchPopularData();
    const movies = popularMoviesData.map(movie => {
      const movieGenresIds = movie.genre_ids;
      const matchedGenres = [];
      for (let i = 0; i < movieGenresIds.length; i++) {
        for (let j = 0; j < genres.length; j++) {
          if (movieGenresIds[i] === genres[j].id) {
            matchedGenres.push(genres[i].name);
          }
        }
      }
      movie.genres = matchedGenres;
      return movie;
    });
    popularMovies(movies);
  };
  matchGenres();

  const popularMovies = movies => {
    movies.forEach(movie => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `<div id="card" class="card" >
                   <img  class="card__poster" src="${IMG_URL}${
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
      const modalEL = document.getElementById("modalBox");

      console.log(modalEL);

      moviesContainerEl.appendChild(card);

      // showModal

      card.addEventListener("click", () => {
        modalBoxShow(movie);
      });
      const modalBoxShow = movie => {
        let popupEl = document.querySelector(".backdrop");
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
        genreEl.innerHTML = `${movie.genres}`;
        aboutEl.innerHTML = `${movie.overview}`;

        closeBtnEl.addEventListener("click", () => {
          popupEl.classList.add("is-hidden");
        });
      };
    });
  };
};
fetchMostPopular();
