import React from "react";
import moment from "moment";
import './daily-forecast.sass'

interface DailyForecastProps {
  data: any,
  index: number
}

const DailyForecast: React.FC<DailyForecastProps> = ({ data, index }) => {
  const currentDay = moment.unix(data.dt);
  const currentDayName = index === 1 ? 'Tomorrow' : currentDay.format('dddd');
  const weatherIcon = `${ process.env.REACT_APP_WEATHER_API_ICONS_ENDPOINT }${ data.weather[0].icon }.png`;
  const temperatures = `${ Math.floor(data.temp.min) }° / ${ Math.floor(data.temp.max) }°`;

  return (
    <div className="daily-forecast">
      <div>
        <div className="date">
          <div className="day-name">{ currentDayName }</div>
          <div className="day-date">{ currentDay.format('DD/MM/YYYY') }</div>
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
              <div>{ data.feels_like.day }° / { data.feels_like.night }°</div>
            </div>
            <div>
              <div>Wind speed:</div>
              <div>{ data.wind_speed } km/h</div>
            </div>
            <div>
              <div>Pressure:</div>
              <div>{ data.pressure } hPa</div>
            </div>
            <div>
              <div>Humidity</div>
              <div>{ data.humidity } %</div>
            </div>
          </div>
        </div>
        <div className="icon">
          <img src={ weatherIcon } alt="Weather" />
        </div>
        <div className="temperature">
          { temperatures }
        </div>
        <div className="status">{ data.weather[0].main }</div>
      </div>
    </div>
  );
}

export default DailyForecast;