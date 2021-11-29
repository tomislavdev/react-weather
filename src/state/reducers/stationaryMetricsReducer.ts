import { Action, ActionType } from "../actions";

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
  isOpened: boolean;
  data: StationaryMetricsData | {}
}

const initialState = {
  loading: false,
  error: null,
  isOpened: false,
  data: {}
};

const stationaryMetricsReducer = (
  state: StationaryMetricsState = initialState,
  action: Action
): StationaryMetricsState => {
  switch (action.type) {
    case ActionType.TOGGLE_STATIONARY_METRICS_FORM:
      return { loading: false, error: null, isOpened: action.payload, data: {} };
    case ActionType.SUBMIT_STATIONARY_METRICS:
      return { loading: true, error: null, isOpened: true, data: {} };
    case ActionType.SUBMIT_STATIONARY_METRICS_SUCCESS:
      return { loading: false, error: null, isOpened: true, data: action.payload };
    case ActionType.SUBMIT_STATIONARY_METRICS_ERROR:
      return { loading: false, error: action.payload, isOpened: true, data: {} };
    default:
      return state;
  }
}

export default stationaryMetricsReducer;