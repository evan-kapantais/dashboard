import React, { Component } from 'react'
import styled from 'styled-components'

import Days from './days'

//TODO: add forecast (check if possible with a single api call)
//TODO: optimize weather flow
//TODO: imperial / metric toggle

const WeatherWidget = styled.div `
  border: 1px solid;

  header {
    display: flex;
    align-items: center;
  }
`

export class Weather extends Component {
  constructor(props) {
    super(props);
    this.state={
      isLoaded: false,
      weatherCurrent: {},
      weatherForecast: {},
    }
  }

  // Weather Data

  abortController = new AbortController();

  weatherInit = () => {

    const success = (position) => {
      this.getWeatherData(position.coords.latitude, position.coords.longitude);
    }

    const error = () => {
      alert('Unable to retreive location.');
    }
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      alert('Your browser does not support location tracking, or permission is denied.');
    }
  }

  getForecastData = () => {
    let currentDayIndex = new Date().getDay();
    console.log(currentDayIndex);
    const forecastDays = [];

    for (let i = -0; i < 5; ++i) {
      forecastDays.push(Days[(currentDayIndex + i) % Days.length]);
    }
    console.log(forecastDays);
  }

  getWeatherData = (lat, lon) => {
    const weatherApi = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.REACT_APP_WEATHER_KEY}`;

    fetch(weatherApi, { signal: this.abortController.signal })
    .then(response => response.json())
    .then(
      (result) => {
        // console.log(result);
        // console.log(result.list[0].dt_txt.slice(11, 13));
        this.getForecastData();
        this.setState({
          isLoaded: true,
          weatherCurrent: {
            city: result.city.name,
            condition: result.list[0].weather[0].description,
            icon: result.list[0].weather[0].icon,
            temp: Math.round(result.list[0].main.temp),
            tempMin: Math.round(result.list[0].main.temp_min),
            tempMax: Math.round(result.list[0].main.temp_max),
          }
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    );
  }

  componentDidMount = () => {
    this.weatherInit();
  }

  render() {
    return (
      <WeatherWidget>
        <header>
          <img src={`http://openweathermap.org/img/wn/${this.state.weatherCurrent.icon}@2x.png`} alt='weather icon'/>
          <div>
            <h1>{this.state.weatherCurrent.temp}°</h1>
            <p>{this.state.weatherCurrent.city}</p>
          </div>
        </header>
        <main>
          <table>

          </table>
        </main>
      </WeatherWidget>
    )
  }
}

export default Weather
