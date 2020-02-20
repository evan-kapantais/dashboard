import React, { Component } from 'react'

export class Weather extends Component {
  constructor(props) {
    super(props);
    this.state={
      isLoaded: false,
    }
  }

  componentDidMount = () => {
    const weatherApi = `http://api.openweathermap.org/data/2.5/weather?q=Barcelona,ES&appid=${process.env.REACT_APP_WEATHER_KEY}`;
  }

  render() {
    return (
      <div>
        
      </div>
    )
  }
}

export default Weather
