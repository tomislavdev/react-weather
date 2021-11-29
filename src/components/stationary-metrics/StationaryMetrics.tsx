import React from "react";
import './stationary-metrics-form.sass'
import { SubmitHandler, useForm } from "react-hook-form";
import { useActions } from "../../hooks/useActions";
import { StationaryMetricsData } from "../../state/reducers/stationaryMetricsReducer";

type Inputs = {
  username: string,
  email: string,
  temperature: string,
  windSpeed: string,
  humidity: string,
  pressure: string,
  rain: string,
};

const StationaryMetrics: React.FC = () => {
  const { toggleStationaryMetrics, submitStationaryMetrics } = useActions();
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const submitData: StationaryMetricsData = {
      station_id: process.env.REACT_APP_DEFAULT_STATION_ID || '',
      dt: Date.now(),
      username: data.username,
      email: data.email,
      temperature: parseFloat(data.temperature),
      wind_speed: parseFloat(data.windSpeed),
      humidity: parseFloat(data.humidity),
      pressure: parseFloat(data.pressure),
      rain_1h: parseFloat(data.rain),
    };

    submitStationaryMetrics(submitData);
  };

  return (
    <div className="form-container disable-scrollbars">
      <form className="stationary-metrics-form" onSubmit={ handleSubmit(onSubmit) }>
        <div className="form-title">Add metrics manually:</div>

        <div>
          <label>Username</label>
          <input {...register('username', { required: true, maxLength: 20 })} />
          <div className="error">
            { errors.username?.type === 'required' && 'Username is required!' }
            { errors.username?.type === 'maxLength' && 'Username must be between 0 and 20 characters!' }
          </div>
        </div>

        <div>
          <label>Email</label>
          <input
            {...register('email', { required: true,  pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })}
          />
          <div className="error">
            { errors.email && 'Enter a valid email!' }
          </div>
        </div>

        <div>
          <label>Temperature</label>
          <input placeholder="Temperature in celsius" type="number" step="0.1"
            {...register('temperature', { required: true, min: -20, max: 60 })}
          />
          <div className="error">
            { errors.temperature && 'Enter a valid temperature value!' }
          </div>
        </div>

        <div>
          <label>Wind speed</label>
          <input placeholder="A speed of the wind in m/s" type="number" step="0.1"
            {...register('windSpeed', { required: true, min: 0, max: 200 })}
          />
          <div className="error">
            { errors.windSpeed && 'Enter a valid wind speed value!' }
          </div>
        </div>

        <div>
          <label>Humidity</label>
          <input placeholder="Percentage of air humidity" type="number" step="0.1"
            {...register('humidity', { required: true, min: 0, max: 100 })}
          />
          <div className="error">
            { errors.humidity && 'Enter a valid humidity value!' }
          </div>
        </div>

        <div>
          <label>Pressure</label>
          <input placeholder="Atmosphere pressure in hPa" type="number"
            {...register('pressure', { required: true, min: 0, max: 3000 })}
          />
          <div className="error">
            { errors.pressure && 'Enter a valid pressure value!' }
          </div>
        </div>

        <div>
          <label>Rain</label>
          <input placeholder="Millimetres of rain in last hour" type="number" step="0.1"
            {...register('rain', { required: true, min: 0, max: 1000 })}
          />
          <div className="error">
            { errors.pressure && 'Enter a valid rain value!' }
          </div>
        </div>

        <input className="submit-form" type="submit" />
        <button className="close-form" type="button" onClick={ () => toggleStationaryMetrics(false) }>Close</button>
      </form>
    </div>
  );
}

export default StationaryMetrics;