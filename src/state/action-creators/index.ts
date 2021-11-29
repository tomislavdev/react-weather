import axios from "axios";
import { Dispatch } from "redux";
import { Action, ActionType } from "../actions";
import { StationaryMetricsData } from "../reducers/stationaryMetricsReducer";

export const getForecast = (lat: string, lon: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.GET_FORECAST
    });

    try {
      const weatherApiUrl = `${ process.env.REACT_APP_WEATHER_API_ONE_CALL_ENDPOINT }?lat=${ lat }&lon=${ lon }&\
        units=metric&exclude=minutely,alerts&appid=${ process.env.REACT_APP_WEATHER_API_KEY }`.replaceAll(' ', '');
      const data = await axios.get(weatherApiUrl);

      dispatch({
        type: ActionType.GET_FORECAST_SUCCESS,
        payload: data.data
      });
    } catch (error) {
      dispatch({
        type: ActionType.GET_FORECAST_ERROR,
        payload: 'An error occurred. Please try again later.'
      });
    }
  };
};

export const toggleStationaryMetrics = (isOpened: boolean) => {
  return {
    type: ActionType.TOGGLE_STATIONARY_METRICS_FORM,
    payload: isOpened
  };
};

export const submitStationaryMetrics = (data: StationaryMetricsData) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SUBMIT_STATIONARY_METRICS
    });

    try {
      const { username, email, ...requestData } = data;
      const config = { headers: { 'Content-Type': 'application/JSON' } };
      const weatherApiUrl = `${ process.env.REACT_APP_WEATHER_API_MEASUREMENTS_ENDPOINT }\
        ?appid=${ process.env.REACT_APP_WEATHER_API_KEY }`.replaceAll(' ', '');

      const response = await axios.post(weatherApiUrl, requestData, config);

      if (response) {
        dispatch({
          type: ActionType.SUBMIT_STATIONARY_METRICS_SUCCESS,
          payload: data
        });
      }
    } catch (error) {
      dispatch({
        type: ActionType.SUBMIT_STATIONARY_METRICS_ERROR,
        payload: 'An error occurred. Please try again later.'
      });
    }
  };
};

