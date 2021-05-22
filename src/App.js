import React, { Component } from 'react'
import Title from './components/Title'
import Form from './components/Form'
import Weather from './components/Weather'
import './static/css/main.css'

// api key
const API_KEY = "92908091e7f1e83fec0d3e3d5474e66a";


class App extends Component {
    state = {
        temperature: undefined,
        feelsLike: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        pressure: undefined,
        description: undefined,
        windSpeed: undefined,
        windDegree: undefined,
        visibility: undefined,
        error: undefined
    }

    getWeather = async(e) =>{
        e.preventDefault()
        const city = e.target.elements.city.value
        const country = e.target.elements.country.value
        const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`)
        const data = await api_call.json()

        if(city && country) {
            this.setState({
                temperature: data.main.temp,
                feelsLike: data.main.feels_like,
                city: data.name,
                country: data.sys.country,
                humidity: data.main.humidity,
                pressure: data.main.pressure,
                description: data.weather[0].description,
                windSpeed: data.wind.speed,
                windDegree: data.wind.deg,
                visibility: data.visibility,
                error: ""
            })
            console.log(this.state)
        } else {
            this.setState({
                temperature: undefined,
                feelsLike: undefined,
                city: undefined,
                country: undefined,
                humidity: undefined,
                pressure: undefined,
                description: undefined,
                windSpeed: undefined,
                windDegree: undefined,
                visibility: undefined,
                error: "Please enter values"
              });
        }
    }

    getClassName = () => {
        const clouds = 'overcast clouds'
        var weather = this.state.description
        if(weather === undefined){
            weather = 'default-weather'
        } else if (weather==='clear sky'){
            weather = 'clear-sky'
        } else if (weather===clouds){
            weather = 'broken-clouds'
        }
        else if (weather==='haze'){
            weather = 'haze'
        }
        else{
            weather= 'default-weather'
        }
        console.log(weather)
        return weather
    }

    render() {
        const weatherClass = this.getClassName()
        return (
            <div className="container">
                <div className={weatherClass}>
                    <Title/>
                </div>
                <div className="weather-card">
                    <Form getWeather={this.getWeather}/>
                    <Weather
                        temperature={this.state.temperature}
                        feelsLike={this.state.feelsLike}
                        city={this.state.city}
                        country={this.state.country}
                        humidity={this.state.humidity}
                        pressure={this.state.pressure}
                        description={this.state.description}
                        windSpeed={this.state.windSpeed}
                        windDegree={this.state.windDegree}
                        visibility={this.state.visibility}
                        error={this.state.error}
                    />
                </div>
            </div>
        );
    }
}

export default App;