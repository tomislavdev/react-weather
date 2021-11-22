import axios from "axios";
import { Dispatch } from "redux";
import { Action, ActionType } from "../actions";

export const getForecast = (lat: string, lon: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.GET_FORECAST
    });

    try {
      const weatherApiUrl = `${ process.env.REACT_APP_WEATHER_API_ENDPOINT }?lat=${ lat }&lon=${ lon }&units=metric\
        &exclude=minutely,alerts&appid=${ process.env.REACT_APP_WEATHER_API_KEY }`.replaceAll(' ', '');
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
