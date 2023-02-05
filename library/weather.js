'use strict';

const axios = require('axios');

const getWeather = (req,res,next) => {

  // console logging the query parameter and defining city with the value of req(uest).query.city
  console.log(req.query);
  const cityLat = req.query.lat;
  const cityLon = req.query.lon;

  const url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${cityLat}&lon=${cityLon}&days=7`;

  axios.get(url)
    .then(data => {
      const formattedWeather = data.data.data.map(city => new Forecast(city));
      res.status(200).send(formattedWeather);
    })
    .catch(error => next(error));
};

//creating a forecast class
class Forecast{

  constructor(city){
    this.date = city.datetime;
    this.desc = city.weather.description;
  }
}

module.exports = getWeather;
