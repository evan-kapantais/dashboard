import React, { Component } from 'react'
import styled from 'styled-components'

//TODO: imperial / metric toggle

const WeatherWidget = styled.div `

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
      weatherData: {},
    }
  }

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

  getWeatherData = (lat, lon) => {
    const weatherApi = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.REACT_APP_WEATHER_KEY}`;

    fetch(weatherApi, { signal: this.abortController.signal })
    .then(response => response.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          weatherData: {
            city: result.name,
            condition: result.weather[0].description,
            icon: result.weather[0].icon,
            temp: Math.round(result.main.temp),
            tempMin: Math.round(result.main.temp_min),
            tempMax: Math.round(result.main.temp_max),
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
          <img src={`http://openweathermap.org/img/wn/${this.state.weatherData.icon}@2x.png`} alt='weather icon'/>
          <div>
            <h1>{this.state.weatherData.temp}°</h1>
            <p>{this.state.weatherData.city}</p>
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
