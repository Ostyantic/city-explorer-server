'use strict';

// allows the use of the variables within .env file
// .env access
require('dotenv').config();

// express server library
const express = require('express');
const axios = require('axios');

//initializes express library
const app = express();

// cors library
const cors = require('cors');

// express app that uses cors
// controls which websites can request access to server
app.use(cors());

//initializes the port will run on
const PORT = process.env.PORT || 3002;

//alloww access to weather.json
const weatherData = require('./data/weather.json');


app.get('/', (req, res) => {
  res.send('Endpoint is working');
});

app.get('/weatherData', (req,res) => {
  res.send(weatherData);
});

app.get('/weather', getWeather);

async function getWeather(req,res,next){

  // console logging the query parameter and defining city with the value of req(uest).query.city
  console.log(req.query);
  let city = req.query.city;
  let cityLat = req.query.lat;
  let cityLon = req.query.lon;

  let url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${cityLat}&lon=${cityLon}&days=7`;

  try{
    const weatherResponse = await axios.get(url);
    console.log(weatherResponse.data);
    let formattedWeather = weatherResponse.data.data.map(city => new Forecast(city));
    res.status(200).send(formattedWeather);
  }
  catch(error){
    res.status(500).send('Server Error!');
  }
}

app.get('/movie', getMovie);

async function getMovie(req,res,next){

  console.log(`this it the request: ${req}`);
  let city = req.query.city;

  let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}`;
  console.log(`This is the url: ${url}`);

  try{
    const movieResponse = await axios.get(url);
    console.log(movieResponse.data);
    const formattedMovieResponse = movieResponse.data.results.map(obj => new Movie(obj));
    res.status(200).send(formattedMovieResponse.slice(0,5));
  }
  catch(error){
    res.status(500).send('Server Error');
  }
}

//creating a forecast class
class Forecast{

  constructor(city){
    this.date = city.datetime;
    this.desc = city.weather.description;
  }
}

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


app.listen(PORT, () => console.log(`listening on ${PORT}`));
