import "../sass/main.scss";
import { API_KEY, URL, IMG_URL, LANGUAGE } from "./setup";

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
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
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
