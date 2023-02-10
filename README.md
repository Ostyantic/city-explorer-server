# city-explorer-server

**Author**: Anthony Lopez
**Version**: 1.0.0 (increment the patch/fix version number if you make more commits past your first submission)

## Overview

city-explorer-server is an API server that makes multiple API requests to various sources and stores the data for use in the city explorer web application!

## Getting Started

In order to begin setting up your very own server, you must:

1. Get an API key from your desired API website.
2. Create a server using npm ini to create your server
3. After server is created, install the following libraries listed below

## Architecture

Languages:

- Javascript 3

Libraries:

- Axios
- DOTENV
- Express
- CORS

## Change Log

01-28-23 completed Use npm install to add the required dependencies to this project: `express`, `dotenv`, and `cors`.
01-28-23 completed Create a basic Express server.
01-28-23 completed Create an API endpoint of /weather that processes a GET request that contains lat, lon and searchQuery information
02-02-23 completed Create a function to handle errors from any API call
02-04-2023 - Refactored weather and movie data into individual module files.
02-09-2023 - Added cache functionality for weather & movie API data

## Credit and Collaborations

- Araceli Garcia
- Brenden Moore
- Yurii Hlukhyi

## WRRC

![Image](./images/Screenshot%202023-01-31%20at%2012.00.16%20AM.png)