import React from "react";
import moment from "moment";
import './daily-forecast.sass'
import { DailyForecastState } from "../../state/reducers/forecastReducer";

interface DailyForecastProps {
  dailyForecast: DailyForecastState;
  index: number;
}

const DailyForecast: React.FC<DailyForecastProps> = ({ dailyForecast, index }) => {
  const currentDay = moment.unix(dailyForecast.dt);
  const currentDayName = index === 0 ? 'Today' : index === 1 ? 'Tomorrow' : currentDay.format('dddd');
  const temperatures = `${ Math.floor(dailyForecast.temp.min) }° / ${ Math.floor(dailyForecast.temp.max) }°`;

  return (
    <div className="daily-forecast">
      <div>
        <div className="date">
          <div className="day-name">{ currentDayName }</div>
          <div className="day-date">{ currentDay.format('DD.MM.YYYY') }</div>
        </div>
        <div className="tooltip">
          <img src="/images/tooltip.png" alt="More info" />
          <div className="more-info">
            <div>{ currentDayName }</div>
            <div>
              <div>Temperature:</div>
              <div>{ temperatures }</div>
            </div>
            <div>
              <div>Feels like:</div>
              <div>
                { Math.floor(dailyForecast.feels_like?.day) }° / { Math.floor(dailyForecast.feels_like.night) }°
              </div>
            </div>
            <div>
              <div>Wind speed:</div>
              <div>{ dailyForecast.wind_speed } m/s</div>
            </div>
            <div>
              <div>Pressure:</div>
              <div>{ dailyForecast.pressure } hPa</div>
            </div>
            <div>
              <div>Humidity</div>
              <div>{ dailyForecast.humidity } %</div>
            </div>
          </div>
        </div>
        <div className="icon">
          <img src={ process.env.REACT_APP_WEATHER_API_ICONS_ENDPOINT + dailyForecast.weather[0].icon + '.png' }
            alt="Weather" />
        </div>
        <div className="temperature">
          { temperatures }
        </div>
        <div className="status">{ dailyForecast.weather[0].main }</div>
      </div>
    </div>
  );
}

export default DailyForecast;