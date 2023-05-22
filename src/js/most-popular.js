import "../sass/main.scss";
import { API_KEY, IMG_URL, URL, LANGUAGE } from "./setup";

export const fetchMostPopular = () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  const moviesContainerEl = document.querySelector("#movies-container-index");

  const fetchPopularData = async () => {
    try {
      const response = await fetch(
        `${URL}movie/popular?language=${LANGUAGE}&page=1&api_key=${API_KEY}`,
        options
      );
      const data = await response.json();

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
      moviesContainerEl.innerHTML += `
        <div id="card" class="card">
          <img class="card__poster" src="${IMG_URL}${movie.poster_path}" alt="${movie.original_title}" title="${movie.original_title}" />
          <div class="card__content">
            <div class="card__info">
              <div class="card__title">${movie.original_title}</div>
              <div class="card__genre">${movie.genres.join(", ")} |</div>
              <div class="card__release">${movie.release_date.slice(0, 4)}</div>
            </div>
          </div>
        </div>
      `;
    });
  };
};
