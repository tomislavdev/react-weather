import { Action, ActionType } from "../actions";

interface forecastState {
  loading: boolean;
  error: string | null;
  data: {
    lat?: Number;
    lon?: Number;
    current?: { [key: string]: any };
    daily?: { [key: string]: any };
    hourly?: { [key: string]: any };
  };
}

const initialState = {
  loading: false,
  error: null,
  data: {}
};

const forecastReducer = (
  state: forecastState = initialState,
  action: Action
): forecastState => {
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