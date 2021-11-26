import React, {ChangeEvent} from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../state/reducers";
import { useActions } from "../../hooks/useActions";
import './forecast.sass'
import DailyForecast from "../daily-forecast/DailyForecast";
import Navigation from "../navigation/Navigation";

interface City {
  name: string;
  lat: string;
  lon: string;
}

const Forecast: React.FC = () => {
  const { getForecast } = useActions();
  const state = useSelector((state: RootState) => state.forecast);
  const cities: City[] = [
    { name: 'London', lat: '51.507351', lon: '-0.127758' },
    { name: 'Paris', lat: '48.856613', lon: '2.352222' },
    { name: 'Berlin', lat: '52.520008', lon: '13.404954' },
    { name: 'Sofia', lat: '42.697708', lon: '23.321867' },
    { name: 'Stockholm', lat: '59.329323', lon: '18.068581' },
    { name: 'Rome', lat: '41.902782', lon: '12.496366' },
    { name: 'Brussels', lat: '50.8505', lon: '4.3488' },
  ];

  const showCityForecastOnChange = (event: ChangeEvent<HTMLSelectElement>) => {
    // Get lat and lon for the chosen city
    const city: City = cities.filter((city: City) => city.name === event.target.value)[0];
    getForecast(city.lat, city.lon);
  };

  return (
    <div className="main-container">
      <form className="forecast-form">
        <select onChange={ showCityForecastOnChange }>
          <option className="default-option" value="">Select a city</option>
          { cities.map(city => <option value={ city.name } key={ city.name }>{ city.name }</option>) }
        </select>
      </form>

      { state.loading && <div className="loading">Loading...</div> }
      { state.error && <h3 className="error">{ state.error }</h3> }
      { state.data.daily && (
        <div>
          <Navigation/>
          <div className="forecast-container">
            <DailyForecast key={ 0 } index={ 0 } data={ state.data.current } />
            <div className="inner-forecast-container disable-scrollbars">
              <div className="scroll-arrows scroll-left">&larr;</div>
              {
                state.data.daily.map((dailyForecast: object, index: number) => {
                  return <DailyForecast key={ index + 1 } index={ index + 1 } data={ dailyForecast } />;
                })
              }
              <div className="scroll-arrows scroll-right">&rarr;</div>
            </div>
          </div>
        </div>
      ) }

      <div className="button-container">
        <button>Add metrics manually</button>
      </div>
    </div>
  );
};

export default Forecast;