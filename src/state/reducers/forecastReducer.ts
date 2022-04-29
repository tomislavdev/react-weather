import { Action, ActionType } from "../actions";

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

const initialState = {
  loading: false,
  error: null,
  data: {}
};

const forecastReducer = (
  state: ForecastState = initialState,
  action: Action
): ForecastState => {
  switch (action.type) {
    case ActionType.GET_FORECAST:
      return { loading: true, error: null, data: {} };
    case ActionType.GET_FORECAST_SUCCESS:
      return { loading: false, error: null, data: action.payload };
    case ActionType.GET_FORECAST_ERROR:
      return { loading: false, error: action.payload, data: {} };
    default:
      return state;
  }
}

export default forecastReducer;
