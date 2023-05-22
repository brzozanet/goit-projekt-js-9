import "../sass/main.scss";
import { API_KEY, IMG_URL, URL, LANGUAGE } from "./setup";
import { fetchGenres } from "./genres";

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

  const popularMovies = async () => {
    const results = await fetchPopularData();
    console.log(results); 
    results.forEach(movie => {
      moviesContainerEl.innerHTML += `
        <div id="card" class="card">
          <img class="card__poster" src="${IMG_URL}${movie.poster_path}" alt="${movie.original_title}" title="${movie.original_title}" />
          <div class="card__content">
            <div class="card__info">
              <div class="card__title">${movie.original_title}</div>
              <div class="card__genre">${movie.genre_ids} |</div>
              <div class="card__release">${movie.release_date.slice(0, 4)}</div>
            </div>
          </div>
        </div>
      `;
    });
  };
  popularMovies();
};

    