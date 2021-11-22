export enum ActionType {
  GET_FORECAST = 'GET_FORECAST',
  GET_FORECAST_SUCCESS = 'GET_FORECAST_SUCCESS',
  GET_FORECAST_ERROR = 'GET_FORECAST_ERROR',
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

export type Action = GetForecastAction | GetForecastSuccessAction | GetForecastErrorAction;