'use strict';

// allows the use of the variables within .env file
// .env access
require('dotenv').config();

// express server library
const express = require('express');

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

app.get('/weather', (req,res) => {

  // console logging the query parameter and defining searchQuery with the value of req(uest).query.searchQuery
  console.log(req.query);
  let searchQuery = req.query.searchQuery;

  console.log('City:', searchQuery);
  // let lat = req.query.lat;
  // let lon = req.query.lon;

  // console logging lat and lon
  // console.log('Lat: ', lat);
  // console.log('Lon: ', lon);

  //creating a new Forecast class
  let locationForecast = new Forecast(searchQuery);

  // defining a varable and assigning it the value returned from the newly create Forecast class' method.
  let locationDateAndDesc = locationForecast.getDateAndDesc();

  // console logging the date and desc variable and sending the API response to the client
  console.log(locationDateAndDesc);
  res.status(200).send(locationDateAndDesc);

});

//creating a forecast class
class Forecast{

  // using a constructor to create the class and passing searchQuery as the parameter
  constructor(searchQuery){

    // defining a "weather" variable and assigning it the value of the property found within the array.find() method
    // defining a property in the constructor and assigning it the value of the data array within the searched weather object

    let weather = weatherData.find(obj => obj.city_name === searchQuery);
    this.weatherForecast = weather.data;
    // this.lat = weather.lat;
    // this.lon = weather.lon;
    // individually assigning date and desc properties
    // this.date = weather.data.map(element => element.datetime);
    // this.desc = weather.data.map(element => element.weather.description);
  }

  // function that maps over weather forecast and returns date and description properties per element in the weatherForecast array
  getDateAndDesc(){
    return this.weatherForecast.map(element =>{
      return {date: element.datetime, desc: element.weather.description};
    });
  }

}

app.listen(PORT, () => console.log(`listening on ${PORT}`));
