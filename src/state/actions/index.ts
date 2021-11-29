export enum ActionType {
  GET_FORECAST = 'GET_FORECAST',
  GET_FORECAST_SUCCESS = 'GET_FORECAST_SUCCESS',
  GET_FORECAST_ERROR = 'GET_FORECAST_ERROR',
  SUBMIT_STATIONARY_METRICS = 'SUBMIT_STATIONARY_METRICS',
  SUBMIT_STATIONARY_METRICS_SUCCESS = 'SUBMIT_STATIONARY_METRICS_SUCCESS',
  SUBMIT_STATIONARY_METRICS_ERROR = 'SUBMIT_STATIONARY_METRICS_ERROR',
  TOGGLE_STATIONARY_METRICS_FORM = 'TOGGLE_STATIONARY_METRICS_FORM'
}

interface GetForecastAction {
  type: ActionType.GET_FORECAST;
}

interface GetForecastSuccessAction {
  type: ActionType.GET_FORECAST_SUCCESS;
  payload: {};
}

interface GetForecastErrorAction {
  type: ActionType.GET_FORECAST_ERROR;
  payload: string;
}

interface SubmitStationaryMetrics {
  type: ActionType.SUBMIT_STATIONARY_METRICS;
}

interface SubmitStationaryMetricsSuccess {
  type: ActionType.SUBMIT_STATIONARY_METRICS_SUCCESS;
  payload: {};
}

interface SubmitStationaryMetricsError {
  type: ActionType.SUBMIT_STATIONARY_METRICS_ERROR;
  payload: string;
}

interface ToggleStationaryMetricsForm {
  type: ActionType.TOGGLE_STATIONARY_METRICS_FORM;
  payload: boolean;
}

export type Action =
  GetForecastAction | GetForecastSuccessAction | GetForecastErrorAction |
  SubmitStationaryMetrics | SubmitStationaryMetricsSuccess | SubmitStationaryMetricsError | ToggleStationaryMetricsForm;