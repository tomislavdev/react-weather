import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import combinedReducers from "./reducers";

export const store = createStore(
  combinedReducers,
  applyMiddleware(thunk)
);

export type AppDispatch = typeof store.dispatch
