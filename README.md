# Simple weather app written in React

# Description of the app

Select a city from a dropdown menu and see the weather forecast for the chosen city.

The weather forecast is based on the OpenWeatherMap API.

For more information about the API: https://openweathermap.org/api/one-call-api

## Installation

### For development
- Run `npm install`
- Create `.env` file or copy and rename `example.env` to `.env`
- Populate `.env` file
- Run `npm start`

### Run the app with Docker
- Run `docker build . -t imageTag` to build the image. You have to replace `imageTag` with a more meaningful name.
- Run the image with the following command `docker run -d -p 3000:3000 imageTag`
- Open `localhost:3000` in your browser in order to use the app
