import React, { Component } from 'react'
import styled from 'styled-components'

//TODO: add forecast (check if possible with a single api call) 

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
      weatherData: {}
    }
  }

  // Weather Data

  abortController = new AbortController();

  toCelcius = (temp) => (
    temp - 273.15
  );

  getWeatherData = () => {
    const weatherApi = `http://api.openweathermap.org/data/2.5/weather?q=Barcelona,ES&appid=${process.env.REACT_APP_WEATHER_KEY}`;
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
            temp: Math.round(this.toCelcius(result.main.temp)),
            tempMin: Math.round(this.toCelcius(result.main.temp_min)),
            tempMax: Math.round(this.toCelcius(result.main.temp_max)),
            humidity: result.main.humidity,
            windSpeed: result.wind.speed,
            windDeg: result.wind.deg,
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
    this.getWeatherData();
  }

  render() {
    return (
      <WeatherWidget>
        <header>
          <img src={`http://openweathermap.org/img/wn/${this.state.weatherData.icon}@2x.png`} alt=""/>
          <div>
            <h1>{this.state.weatherData.city}</h1>
            <p>{this.state.weatherData.condition}</p>
          </div>
        </header>
        <main>

        </main>
      </WeatherWidget>
    )
  }
}

export default Weather
