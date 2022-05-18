import React, { ChangeEvent, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../state/reducers";
import { useActions } from "../../hooks/useActions";
import './forecast.sass'
import DailyForecast from "../daily-forecast/DailyForecast";
import Navigation from "../navigation/Navigation";
import StationaryMetrics from "../stationary-metrics/StationaryMetrics";
import CurrentForecast from "../current-forecast/CurrentForecast";
import { cities } from "../../data/cities";
import { City } from "../../models/city";

const Forecast: React.FC = () => {
  const [, setSlide] = useState(0);
  const { getForecast, toggleStationaryMetrics } = useActions();

  const forecastState = useSelector((state: RootState) => state.forecast);
  const stationaryMetricsIsOpened = useSelector((state: RootState) => state.stationaryMetrics.isOpened);
  const loadedCity = cities.filter(city => city.name === forecastState.data.timezone?.split('/')[1]);

  const showCityForecastOnChange = (event: ChangeEvent<HTMLSelectElement>) => {
    // Get lat and lon of the chosen city
    const city: City = cities.filter((city: City) => city.id === +event.target.value)[0];
    getForecast(city.lat, city.lon);
  };

  const openStationaryMetricsForm = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth'
    });

    toggleStationaryMetrics(true);
  }

  const horizontalSlide = (toRight: boolean) => {
    // Slide forecast horizontally on button click
    const containerElement = document.getElementById('inner-forecast-container');
    const slideValue = toRight ? 120 : -120;

    if (containerElement) {
      setSlide((containerElement.scrollLeft += slideValue));
    }
  };

  return (
    <div className="main-container">
      <form className="forecast-form">
        <select onChange={ showCityForecastOnChange } value={ loadedCity.length ? loadedCity[0].id : '' }>
          <option className="default-option" value="">Select a city</option>
          { cities.map(city => <option value={ city.id } key={ city.id }>{ city.name }</option>) }
        </select>
      </form>

      { forecastState.loading && <div className="loading">Loading...</div> }
      { forecastState.error && <h3 className="error">{ forecastState.error }</h3> }
      { forecastState.data.daily && forecastState.data.current && (
        <div>
          <Navigation/>
          <div className="forecast-container">
            <CurrentForecast key={ 0 } currentForecast={ forecastState.data.current } />
            <div className="inner-forecast-container disable-scrollbars" id="inner-forecast-container">
              <div className="scroll-arrows scroll-left" onClick={ () => horizontalSlide(false) }>
                <img src="/images/arrow.svg" alt="Slide to left"/>
              </div>
              {
                forecastState.data.daily.map((dailyForecast, index: number) => {
                  return <DailyForecast key={ index } index={ index } dailyForecast={ dailyForecast } />;
                })
              }
              <div className="scroll-arrows scroll-right" onClick={ () => horizontalSlide(true) }>
                <img src="/images/arrow.svg" alt="Slide to right" className="arrow-right" />
              </div>
            </div>
          </div>
        </div>
      ) }

      <div className="button-container">
        <button className="open-form-button"
          disabled={ stationaryMetricsIsOpened } onClick={ () => openStationaryMetricsForm()}>
          Add metrics manually
        </button>
      </div>

      { stationaryMetricsIsOpened && <StationaryMetrics/> }
    </div>
  );
};

export default Forecast;
