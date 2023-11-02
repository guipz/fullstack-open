import axios from 'axios'


const api_key = import.meta.env.VITE_SOME_KEY

function getAllCountries(){
    return axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
        .then((r) => r.data)
}

function getCountryWeatherData(country) {
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${api_key}`)
        .then((r) => r.data)
}

export default {
    getAllCountries,
    getCountryWeatherData
}