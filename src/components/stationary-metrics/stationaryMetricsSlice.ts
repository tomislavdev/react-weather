import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk } from "../../app/store";

export interface StationaryMetricsData {
  username: string;
  email: string;
  station_id: string;
  dt: number;
  temperature: number;
  wind_speed: number;
  pressure: number;
  humidity: number;
  rain_1h: number;
}

export interface StationaryMetricsState {
  loading: boolean;
  error: string | null;
  isOpen: boolean;
  data: StationaryMetricsData | {}
}

const initialState: StationaryMetricsState = {
  loading: false,
  error: null,
  isOpen: false,
  data: {}
};

export const stationaryMetricsSlice = createSlice({
  name: 'stationaryMetrics',
  initialState,
  reducers: {
    toggleStationaryMetricsFormReducer: (state, action) => {
      return { loading: false, error: null, isOpen: action.payload, data: {} };
    },
    submitStationaryMetricsReducer: () => {
      return { loading: true, error: null, isOpen: true, data: {} };
    },
    submitStationaryMetricsSuccessReducer: (state, action) => {
      return { loading: false, error: null, isOpen: true, data: action.payload };
    },
    submitStationaryMetricsErrorReducer: (state, action) => {
      return { loading: false, error: action.payload, isOpen: true, data: {} };
    },
  },
});

export const {
  toggleStationaryMetricsFormReducer,
  submitStationaryMetricsReducer,
  submitStationaryMetricsSuccessReducer,
  submitStationaryMetricsErrorReducer
} = stationaryMetricsSlice.actions;

export const toggleStationaryMetrics = (isOpen: boolean): AppThunk => (dispatch) => {
  dispatch(toggleStationaryMetricsFormReducer(isOpen));
};

export const submitStationaryMetrics = (data: StationaryMetricsData): AppThunk => async (dispatch) => {
  dispatch(submitStationaryMetricsReducer());

  try {
    const { username, email, ...requestData } = data;
    const config = { headers: { 'Content-Type': 'application/JSON' } };
    const weatherApiUrl = `${ process.env.REACT_APP_WEATHER_API_MEASUREMENTS_ENDPOINT }\
      ?appid=${ process.env.REACT_APP_WEATHER_API_KEY }`.replaceAll(' ', '');

    const response = await axios.post(weatherApiUrl, requestData, config);

    if (response) {
      dispatch(submitStationaryMetricsSuccessReducer(data));
    } else {
      dispatch(submitStationaryMetricsErrorReducer('An error occurred. Please try again later.'));
    }
  } catch (error) {
    dispatch(submitStationaryMetricsErrorReducer('An error occurred. Please try again later.'));
  }
};

export default stationaryMetricsSlice.reducer;
