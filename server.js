'use strict';

// allows the use of the variables within .env file
// .env access
require('dotenv').config();

// express server library
const express = require('express');
const getWeather = require('./library/weather');
const getMovie = require('./library/movie');

//initializes express library
const app = express();

// cors library
const cors = require('cors');

// express app that uses cors
// controls which websites can request access to server
app.use(cors());

//initializes the port will run on
const PORT = process.env.PORT || 3002;

app.get('/', (req, res) => {
  res.send('Hello there! o/');
});

app.get('/weather', getWeather);

app.get('/movie', getMovie);

app.listen(PORT, () => console.log(`listening on ${PORT}`));
