import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Countries = ({filter, setCountry, country}) => {
  if (country.length > 10 || country.length === 0) {
    return (
      <p>Too many matches, please specify another filter</p>
    )
  }
  else if ((country.length < 10 && country.length > 1)){
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
  console.log(country)
  return(
    <div>
      <h2> {country.name}</h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h3>Languages:</h3>
      <ul>
        {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img src={country.flag} alt="flag" width="200"/>
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
      <Countries countries={countries} filter={filter} setCountry={setCountry} country={country} />
    </div>
  );
};

export default App;