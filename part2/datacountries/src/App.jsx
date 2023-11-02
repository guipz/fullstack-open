import { useState, useEffect } from 'react'
import countryDataService from './countryDataService'
import './App.css'

function App() {
  const [filteredName, setFilteredName] = useState('')
  const [allCountriesData, setAllCountriesData] = useState([])
  const [countryWeather, setCountryWeather] = useState(null)
  const [filteredCountriesByName, setFilteredCountriesByName] = useState([])
  const [exactMatch, setExactMatch] = useState(-1)

  const handleFilteredNameChange =  (t) => { 
    let newFiltered = allCountriesData.filter(c => c.name.common.toUpperCase().includes(t.toUpperCase()))
    let newExact = newFiltered.findIndex((c) => c.name.common === t)
    if (!newExact) {
      newFiltered = [newFiltered[newExact]]
    }
    setExactMatch(newExact)
    setFilteredName(t)
    setFilteredCountriesByName(newFiltered)
  }

  useEffect(() => {
    if (filteredCountriesByName.length == 1) {
      setCountryWeather(null)
      countryDataService.getCountryWeatherData(filteredCountriesByName[0]).then(r => setCountryWeather(r))
    }
  }, [exactMatch])

  useEffect(() => {countryDataService.getAllCountries().then(r => {
    setAllCountriesData(r)
    setFilteredCountriesByName(r)
  })}, [])

  return (
    <>
      <Header text='Country Search' />
      <InputWithPlaceholder placeholder='Enter country name' value={filteredName} onValueChange={e => handleFilteredNameChange(e.target.value)} />
      <Warning text={filteredCountriesByName.length > 10 && filteredName.length != 0 ? 'Too many matches, specify another filter' : null} />
      <Warning text={filteredCountriesByName.length == 0 && allCountriesData.length > 0 ? 'No matches found, specify another filter' : null} />
      <CountryDetails country={filteredCountriesByName.length == 1 ? {...filteredCountriesByName[0], weather: countryWeather} : null} />
      <CountriesList countries={filteredCountriesByName.length <= 10 && filteredCountriesByName.length != 1 ? filteredCountriesByName : null}
        onViewCountryClick={n => handleFilteredNameChange(n)}
      />
    </>
  )
}

function CountryDetails({ country }) {
  if (country)
    return (
      <>
        <Header text={country.name.common} />
        <p>Capital: {country.capital.reduce((p, c) => `${p}, ${c}`)}</p>
        <p>Area: {country.area} Km<sup>2</sup></p>
        <SubHeader text='Languages'/>
        <p>{Object.values(country.languages).reduce((p, c) => `${p}, ${c}`)}</p>
        <img src={country.flags.png} />
        <SubHeader text={`Weather in ${country.name.common}`}/>
        <CountryWeather weather={country.weather}/>
      </>
    )
  else
    return null
}

function CountryWeather({ weather }) {
  if (weather) 
    return (
      <>
        <p>Temperature: {weather.main.temp} °C</p>
        <img src={countryDataService.getIconImgURL(weather.weather[0].icon)}/>
        <p>Wind: {weather.wind.speed} M/s</p>
      </>
    )
  else
    return <p>No weather data found.</p>
}

function Warning({ text }) {
  return text ? <p>{text}</p> : null
}

function CountriesList({ countries, onViewCountryClick }) {
  return countries ? countries.map(c => <p key={c.name.common}>{c.name.common}<button onClick={() => onViewCountryClick(c.name.common)}>View</button></p>) : null
}

function InputWithPlaceholder({ placeholder, value, onValueChange }) {
  return <input placeholder={placeholder} value={value} onChange={onValueChange}></input>
}

function SubHeader({ text }) {
  return <h3>{text}</h3>
}

function Header({ text }) {
  return <h2>{text}</h2>
}

export default App
