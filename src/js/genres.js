import "../sass/main.scss";
import { API_KEY, IMG_URL, URL, LANGUAGE } from "./setup";
import axios from "axios";

const axios = require("axios");

axios
  .get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`)
  .then(response => {
    const fetchGenres = response.data.genres;
    console.log(fetchGenres);
  })
  .catch(error => {
    console.log(
      "Wystąpił błąd podczas pobierania listy gatunków filmów.",
      error
    );
  });
