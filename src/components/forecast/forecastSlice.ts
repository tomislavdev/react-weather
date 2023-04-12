import { createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "../../app/store";
import axios from "axios";

interface WeatherState {
  icon: string;
  main: string;
}

export interface CurrentForecastState {
  dt: number;
  clouds: number;
  pressure: number;
  humidity: number;
  sunrise: number;
  sunset: number;
  temp: number;
  wind_speed: number;
  feels_like: number;
  weather: WeatherState[];
}

export interface HourlyForecastState {
  dt: number;
  wind_speed: number;
  feels_like: number;
  clouds: number;
  pressure: number;
  humidity: number;
  weather: WeatherState[];
}

export interface DailyForecastState {
  dt: number;
  wind_speed: number;
  feels_like: {
    day: number;
    night: number;
  };
  clouds: number;
  pressure: number;
  humidity: number;
  temp: {
    min: number;
    max: number;
  },
  weather: WeatherState[];
}

interface ForecastState {
  loading: boolean;
  error: string | null;
  data: {
    lat?: Number;
    lon?: Number;
    timezone?: string;
    current?: CurrentForecastState;
    daily?: DailyForecastState[];
    hourly?: HourlyForecastState[];
  };
}

const initialState: ForecastState = { loading: false, error: null, data: {} };

export const forecastSlice = createSlice({
  name: 'forecast',
  initialState,
  reducers: {
    getForecastReducer: () => {
      return { loading: true, error: null, data: {} };
    },
    getForecastSuccessReducer: (state, action) => {
      return { loading: false, error: null, data: action.payload };
    },
    getForecastErrorReducer: (state, action) => {
      return { loading: false, error: action.payload, data: {} };
    },
  },
});

export const { getForecastReducer, getForecastSuccessReducer, getForecastErrorReducer } = forecastSlice.actions;

export const getForecast = (lat: string, lon: string): AppThunk => async (dispatch) => {
  dispatch(getForecastReducer());

  try {
    const weatherApiUrl = `${ process.env.REACT_APP_WEATHER_API_ONE_CALL_ENDPOINT }?lat=${ lat }&lon=${ lon }&\
      units=metric&exclude=minutely,alerts&appid=${ process.env.REACT_APP_WEATHER_API_KEY }`.replaceAll(' ', '');
    const data = await axios.get(weatherApiUrl);

    // Get only 24 hours
    data.data.hourly = data.data.hourly.slice(0, 24);

    dispatch(getForecastSuccessReducer(data.data));
  } catch (error) {
    dispatch(getForecastErrorReducer('An error occurred. Please try again later.'));
  }
};

export default forecastSlice.reducer;
