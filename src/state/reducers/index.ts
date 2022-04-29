import { combineReducers } from "redux";
import forecastReducer from "./forecastReducer";
import stationaryMetricsReducer from "./stationaryMetricsReducer";

const combinedReducers = combineReducers({
  forecast: forecastReducer,
  stationaryMetrics: stationaryMetricsReducer
});

export type RootState = ReturnType<typeof combinedReducers>;

export default combinedReducers;
