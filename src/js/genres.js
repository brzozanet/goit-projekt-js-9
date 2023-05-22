import "../sass/main.scss";
import { API_KEY, IMG_URL, URL, LANGUAGE } from "./setup";
import axios from "axios";

// axios
//   .get(`${URL}movie/popular?language=${LANGUAGE}&page=1&api_key=${API_KEY}`)
//   .then(response => {
//     const movies = response.data.results;
//     console.log(movies);
//     movies.forEach(movie => {
//       const movieGenres = movie.genre_ids;
//       console.log(movieGenres);
//     });
//   })
//   .catch(error => {
//     console.log("Wystąpił błąd podczas pobierania filmów:", error);
//   });

// axios
//   .get(`${URL}/genre/movie/list?api_key=${API_KEY}`)
//   .then(response => {
//     const genreNames = response.data.genres;
//     console.log(genreNames);
//   })
//   .catch(error => {
//     console.log("Wystąpił błąd podczas pobierania gatunków:", error);
//   });

//   // MATCH GENRES TEST START
// const matchedGenres = [];

// for (let i = 0; i < movie.genre_ids.length; i++) {
//   const genreId = movie.genre_ids[i];
//   const matchedGenre = genreNames.find(genre => genre.id === genreId);

//   if (matchedGenre) {
//     matchedGenres.push(matchedGenre.name);
//   }
// }

// console.log(matchedGenres);
// // MATCH GENRES TEST END
