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

  const popularMovies = async () => {
    const results = await fetchPopularData();
    console.log(results);
    results.forEach(movie => {
      moviesContainerEl.innerHTML += `<div class="movie-placeholder">${movie.original_title}</div>`;
    });
  };
  popularMovies();
};
