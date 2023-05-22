import "../sass/main.scss";
import { fetchMostPopular } from "./most-popular";

fetchMostPopular();




// // TEST START
// const matchedGenres = [];

// for (let i = 0; i < movie.genre_ids.length; i++) {
//   const genreId = movie.genre_ids[i];
//   const matchedGenre = fetchGenres.find(genre => genre.id === genreId);

//   if (matchedGenre) {
//     matchedGenres.push(matchedGenre.name);
//   }
// }

// console.log(matchedGenres);
// // TEST END