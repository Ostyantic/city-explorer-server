'use strict';

// imports axios
const axios = require('axios');
// imports cache file
const cache = require('../data/cache');

const getWeather = (req,res,next) => {

  // console logging the query parameter and defining city with the value of req(uest).query.city
  console.log(req.query);
  const cityLat = req.query.lat;
  const cityLon = req.query.lon;
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${cityLat}&lon=${cityLon}&days=7`;

  // delcaring a key to be used in cache
  const key = `Latitude: ${cityLat}, Longitude: ${cityLon}`;


  // if statement to check for cached data, loads cached data if available. If not, makes a new request and saves cached data.
  if (cache[key] && (Date.now() - cache[key].timestamp < 86400000)) {
    console.log(`cache hit - sending cached data`);
    res.status(200).send(cache[key].data);
  } else {
    console.log(`cache miss - making new request`);
    axios.get(url)
      .then(data => {
        const formattedWeather = data.data.data.map(city => new Forecast(city));
        cache[key] = {};
        cache[key].timestamp = Date.now();
        cache[key].data = formattedWeather;
        res.status(200).send(formattedWeather);
      })
      .catch(error => next(error));
  }
};



//creating a forecast class
class Forecast{

  constructor(city){
    this.date = city.datetime;
    this.desc = city.weather.description;
  }
}

module.exports = getWeather;
