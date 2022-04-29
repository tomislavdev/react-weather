import React from "react";
import { CurrentForecastState } from "../../state/reducers/forecastReducer";
import './current-forecast.sass'

interface CurrentForecastProps {
  currentForecast: CurrentForecastState;
}

const CurrentForecast:React.FC<CurrentForecastProps> = ({ currentForecast }) => {
  return (
    <div className="current-weather">
      <div>
        <div className="current-title">
          Current weather
        </div>
        <div className="current-icon-container">
          <img src={ process.env.REACT_APP_WEATHER_API_ICONS_ENDPOINT + currentForecast.weather[0].icon + '.png' }
               alt="Weather" />
          <span>{ Math.floor(currentForecast.temp as number) }°C</span>
        </div>
        <div className="status">{ currentForecast.weather[0].main }</div>
        <div className="feels-like">Feels like { Math.floor(currentForecast.feels_like) }°</div>
        <div className="bottom-info">
          <div className="humidity">
            <img src="/images/drop.svg"  alt="Humidity" />
            <span>{ currentForecast.humidity } %</span>
          </div>
          <div className="wind">
            <img src="/images/wind.svg" alt="Wind" />
            <span>{ currentForecast.wind_speed } m/s</span>
          </div>
          <div className="sunrise">
            <img src="/images/sunrise.svg" alt="Sunrise" />
            <span>{ new Date((currentForecast.sunrise * 1000)).toTimeString().substring(0, 5) }</span>
          </div>
          <div className="sunset">
            <img src="/images/sunset.svg" alt="Sunset" />
            <span>{ new Date((currentForecast.sunset * 1000)).toTimeString().substring(0, 5) }</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentForecast;
