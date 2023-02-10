'use strict';

//imports axios
const axios = require('axios');
// imports cache file
const cache = require('../data/cache');

const getMovie = (req,res,next) => {

  console.log(`this it the request: ${req}`);
  let city = req.query.city;
  let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}`;
  // console.log(`This is the url: ${url}`);

  const key = `City: ${city}`;

  if (cache[key] && (Date.now() - cache[key].timestamp < 86400000)) {
    console.log(`cache hit - sending cached data`);
    res.status(200).send(cache[key].data);
  } else {
    console.log(`cache miss - making new request`);
    axios.get(url)
      .then(data => {
        const formattedMovie = data.data.results.map(movie => new Movie(movie));
        cache[key] = {};
        cache[key].timestamp = Date.now();
        cache[key].data = formattedMovie.slice(0,5);


        res.status(200).send(formattedMovie.slice(0,5));
      })
      .catch(error => next(error));
  }
};





// movie class

class Movie{
  constructor(movie){
    this.title = movie.title;
    this.overview = movie.overview;
    this.average_votes = movie.vote_average;
    this.total_votes = movie.vote_count;
    this.img_url = movie.poster_path;
    this.popularity = movie.popularity;
    this.release_date = movie.release_date;
  }
}

module.exports = getMovie;
