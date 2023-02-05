'use strict';

const axios = require('axios');

const getMovie = (req,res,next) => {

  console.log(`this it the request: ${req}`);
  let city = req.query.city;

  let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}`;
  console.log(`This is the url: ${url}`);

  axios.get(url)
    .then(data => {
      const formattedMovie = data.data.results.map(movie => new Movie(movie));
      res.status(200).send(formattedMovie.slice(0,5));
    })
    .catch(error => next(error));
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
