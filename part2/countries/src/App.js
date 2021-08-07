import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Countries = ({filter, setCountry, country}) => {
  if (country.length > 10 || country.length === 0) {
    return (
      <p>Too many matches, please specify another filter</p>
    )
  }
  else if ((country.length <= 10 && country.length > 1)){
    return(
      <ul>
        {country.filter(country => country.name.includes(filter)).map(country => <li key={country.name}>{country.name} <button onClick={() => setCountry([country])}>Show</button></li>)}
      </ul>
    )
  }
  else {
    return(
      <Country country={country[0]}/>
    )
  }
}

const Country = ({country}) => {
  const [weather, setWeather] = useState([])

  useEffect(() => {
    const params = {
      access_key: process.env.REACT_APP_API_KEY,
      query: country.capital
    }
      axios.get('http://api.weatherstack.com/current', {params})
      .then(response => {
        const apiResponse = response.data;
        setWeather(apiResponse)
        console.log(weather)
      }).catch(error => {
        console.log(error);
      })
  })


  return(
    <div>
      <h2> {country.name}</h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population} hab.</p>
      <h3>Languages:</h3>
      <ul>
        {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img src={country.flag} alt="flag" width="200"/>
      <h2>Weather in {country.capital}</h2>
      <p>Temperature: {weather.temperature}° Celcius</p>
      <img src={weather.weather_icons} alt="Weather icon"></img>
      <p>wind: {weather.wind_speed} mph direction {weather.wind_dir}</p>
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState([])
  const [filter, setFilter] = useState("")

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    setCountry(countries.filter(country => country.name.includes(event.target.value)).map(country => country))
  };

  return (
    <div>
      Find country : <input value={filter} onChange={handleFilterChange} />
      <Countries filter={filter} setCountry={setCountry} country={country} />
    </div>
  );
};

export default App;