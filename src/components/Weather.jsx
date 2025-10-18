import React, { useState, useEffect, useRef, useCallback } from 'react'
import './Weather.css'
import searchIcon from '../assets/search.png'
import clearIcon from '../assets/clear.png'
import cloudIcon from '../assets/cloud.png'
import drizzleIcon from '../assets/drizzle.png'
import humidityIcon from '../assets/humidity.png'
import rainIcon from '../assets/rain.png'
import snowIcon from '../assets/snow.png'
import windIcon from '../assets/wind.png'

const allIcons = {
  '01d': clearIcon,
  '01n': clearIcon,
  '02d': cloudIcon,
  '02n': cloudIcon,
  '03d': cloudIcon,
  '03n': cloudIcon,
  '04d': cloudIcon,
  '04n': cloudIcon,
  '09d': drizzleIcon,
  '09n': drizzleIcon,
  '10d': rainIcon,
  '10n': rainIcon,
  '11d': rainIcon,
  '11n': rainIcon,
  '13d': snowIcon,
  '13n': snowIcon,
}

const Weather = () => {
  const inputRef = useRef(null)
  const [weatherData, setWeatherData] = useState({
    humidity: '--',
    windSpeed: '--',
    temperature: '--',
    location: 'Loading…',
    icon: clearIcon,
  })

  const search = useCallback(async (city) => {
    if (!city) {
      alert('Please enter a city name')
      return
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        city
      )}&units=metric&appid=${import.meta.env.VITE_API_ID}`

      const response = await fetch(url)
      const data = await response.json()

      if (!response.ok || !data.weather || !data.weather[0]) {
        alert('City not found. Please try again.')
        return
      }

      const icon = allIcons[data.weather[0].icon] || clearIcon
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.round(data.main.temp),
        location: data.name,
        icon,
      })
    } catch (error) {
      console.error('Error fetching weather data:', error)
      alert('Unable to fetch weather data right now.')
    }
  }, [])

  useEffect(() => {
    search('Hong Kong')
  }, [search])

  return (
    <div className="weather">
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="Search..." />
        <img
          src={searchIcon}
          alt="Search"
          onClick={() => search(inputRef.current?.value?.trim() || '')}
        />
      </div>

      <img src={weatherData.icon} alt="" className="weather-icon" />
      <p className="temperature">{weatherData.temperature}°C</p>
      <p className="location">{weatherData.location}</p>

      <div className="weather-data">
        <div className="col">
          <img src={humidityIcon} alt="" />
          <div>
            <p>{weatherData.humidity}%</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col">
          <img src={windIcon} alt="" />
          <div>
            <p>{weatherData.windSpeed} km/h</p>
            <span>Wind</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Weather
