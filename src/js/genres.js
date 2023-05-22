import "../sass/main.scss";
import { API_KEY, IMG_URL, URL, LANGUAGE } from "./setup";
import axios from "axios";

axios
  .get(`${URL}/genre/movie/list?api_key=${API_KEY}`)
  .then(response => {
    const fetchGenres = response.data.genres;
    console.log(fetchGenres);
  })
  .catch(error => {
    console.log("Wystąpił błąd podczas pobierania gatunków:", error);
  });



// const matchedGenres = [];

// for (let i = 0; i < movie.genre_ids.length; i++) {
//   const genreId = movie.genre_ids[i];
//   const matchedGenre = fetchGenres.find(genre => genre.id === genreId);

//   if (matchedGenre) {
//     matchedGenres.push(matchedGenre.name);
//   }
// }

// console.log(matchedGenres);

