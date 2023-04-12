import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import forecastReducer from "../components/forecast/forecastSlice";
import stationaryMetricsReducer from "../components/stationary-metrics/stationaryMetricsSlice";

export const store = configureStore({
  reducer: {
    forecast: forecastReducer,
    stationaryMetrics: stationaryMetricsReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
