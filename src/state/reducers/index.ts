import { combineReducers } from "redux";
import forecastReducer from "./forecastReducer";


const combinedReducers = combineReducers({
  forecast: forecastReducer
});

export type RootState = ReturnType<typeof combinedReducers>;

export default combinedReducers;