import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.sass';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import { store } from "./state";
import Forecast from "./components/forecast/Forecast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HourlyForecast from "./components/hourly-forecast/HourlyForecast";

ReactDOM.render(
  <Provider store={ store }>
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Forecast />} />
        <Route path="/hourly" element={<HourlyForecast />} />
      </Routes>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
