import { API_KEY, IMG_URL, URL, LANGUAGE } from "./setup";
import { showSpinner, hideSpinner } from "./loading-spinner";
// import { UserMovies } from "./local-storage";
import { modalBoxShow } from "./modal";
import "./search-box";
import Notiflix from "notiflix";

// const userMovies = new UserMovies();

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
      Notiflix.Notify.failure(
        "Sorry, the server is not responding. Please try again later."
      );
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

    popularMovies(movies);
    totalPages = popularMoviesData.total_pages;

    if (currentPage < totalPages) {
      window.addEventListener("scroll", handleScroll);
    }
  };

  const handleScroll = async () => {
    hideSpinner();
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
      card.id = "card";

      const posterSrc = movie.poster_path
        ? `${IMG_URL}${movie.poster_path}`
        : "https://fotowarsztaty.com/wp-content/uploads/poster-placeholder.png";
        
      const posterAlt = movie.poster_path
        ? movie.original_title
        : "Poster Not Found";

      card.innerHTML = `
          <img class="card__poster" src="${posterSrc}" alt="${posterAlt}" title="${
        movie.original_title
      }" />
        </div>
        <div class="card__content">
          <div class="card__info">
            <div class="card__title">${movie.original_title}</div>
            <div class="card__genre">${movie.genres.join(", ")} |</div>
            <div class="card__release">${movie.release_date.slice(0, 4)}</div>
          </div>
        </div>`;

      const moviesContainerEl = document.querySelector("#gallery");
      if (!moviesContainerEl) return;
      moviesContainerEl.appendChild(card);

      card.addEventListener("click", async () => {
        modalBoxShow(movie);
        await getTrailerLink(movie.id);
      });
    });
  };

  await matchGenres();
};

fetchMostPopular();

export const getTrailerLink = async id => {
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
  } catch (error) {
    console.error(error);
  }
};
