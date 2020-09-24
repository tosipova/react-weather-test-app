import React from 'react';
import SearchForm from './components/SearchForm';
import fetchWeather from './services/fetchWeather';
import SearchResuldCard from './components/SearchResultsCard'


function App() {
  const [query, setQuery] = React.useState('Mannheim');
  const [weather, setWeather] = React.useState({});

  const onInputChangeCallback = event => {
    setQuery(event.target.value)
  }
  const onSubmitSeachFormCallback = (event) => {
    event.preventDefault();
    fetchWeather(query).then(data => {
      setWeather({
        temp: Math.round(data.list[0].main.temp - 273.15),
        wind: data.list[0].wind,
        weatherType: data.list[0].weather[0].main
      })
    })
  }
  return (
    <>
      <SearchForm
        onSubmit={onSubmitSeachFormCallback}
        onChange={onInputChangeCallback}
        query={query}
      />
      {/* {
        query && weather.temp && (
          <div>Current Weather for {query} is {cel + '℃'} and wind speed is {weather.wind.speed}  and weather is {weather.weather}</div>
        )
      } */}
      <SearchResuldCard query={query} weather={weather} />
    </>

  );
}

export default App;
