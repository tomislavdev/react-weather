import React, { useEffect, useState } from "react";
import Navigation from "../navigation/Navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../state/reducers";
import { useLocation } from "react-router-dom";
import { useActions } from "../../hooks/useActions";
import './hourly-forecast.sass'
import moment from "moment";

const HourlyForecast:React.FC = () => {
  const [, setSlide] = useState(0);
  const { getForecast } = useActions();

  const state = useSelector((state: RootState) => state.forecast);
  const location = useLocation();

  useEffect(() => {
    const parameters = new URLSearchParams(location.search);
    const lat = parameters.get('lat') || process.env.REACT_APP_DEFAULT_LAT || '';
    const lon = parameters.get('lon') || process.env.REACT_APP_DEFAULT_LON || '';

    // Get weather info for these lat and lon if such are missing in the state
    if (Number(lat) !== state.data.lat || Number(lon) !== state.data.lon) {
      getForecast(lat.toString(), lon.toString());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search, state.data.lat, state.data.lon]);

  const horizontalSlide = (toRight: boolean) => {
    // Slide hourly forecast horizontally on button click
    const containerElement = document.getElementById('hourly-forecast');
    const slideValue = toRight ? 110 : -110;

    containerElement && setSlide((containerElement.scrollLeft += slideValue));
  };

  return (
    <div>
      { state.error && <h3 className="error">{ state.error }</h3> }
      { !state.error && !state.loading && state.data.hourly && (
        <div>
          { state.data.timezone && (<div className="city-title">{ state.data.timezone.split('/')[1]}</div>)}
          <Navigation/>
          <div className="hourly-forecast-container">
            <div className="side-titles">
              <div className="hour">Hour</div>
              <div className="date">Date</div>
              <div className="icon">&nbsp;</div>
              <div className="wind-speed">Wind speed</div>
              <div className="feels-like">Feels like</div>
              <div className="cloudiness">Cloudiness</div>
              <div className="pressure">Pressure</div>
              <div className="humidity">Humidity</div>
            </div>
            <div className="hourly-forecast disable-scrollbars" id="hourly-forecast">
              <div className="scroll-arrows scroll-left" onClick={ () => horizontalSlide(false) }>
                <img src="/images/arrow.svg" alt="Slide to left"/>
              </div>
              {
                state.data.hourly.map((data, index: number) => {
                  return (
                    <div className="inner-container" key={ index }>
                      <div className="hour">{ new Date((data.dt * 1000)).toTimeString().substring(0, 5) }</div>
                      <div className="date">{ moment.unix(data.dt).format('DD.MM.YYYY') }</div>
                      <div className="icon">
                        <img src={ process.env.REACT_APP_WEATHER_API_ICONS_ENDPOINT + data.weather[0].icon + '.png' }
                         alt="Weather" />
                      </div>
                      <div className="wind-speed">{ data.wind_speed } m/s</div>
                      <div className="feels-like">{ data.feels_like }??</div>
                      <div className="cloudiness">{ data.clouds } %</div>
                      <div className="pressure">{ data.pressure } hPa</div>
                      <div className="humidity">{ data.humidity } %</div>
                    </div>
                  );
                })
              }
              <div className="scroll-arrows scroll-right" onClick={ () => horizontalSlide(true) }>
                <img src="/images/arrow.svg" alt="Slide to right" className="arrow-right" />
              </div>
            </div>
          </div>
        </div>
      ) }
    </div>
  );
}

export default HourlyForecast;
