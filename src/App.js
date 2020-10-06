import React from 'react';
import SearchForm from './components/SearchForm';
import fetchWeather from './services/fetchWeather';
import SearchResuldCard from './components/SearchResultsCard';
import './App.css';


function App() {
  const [query, setQuery] = React.useState('Corfu');
  const [weather, setWeather] = React.useState({
    forecast: []
  });
  const [cities, setCities] = React.useState([]);

  const onInputChangeCallback = event => {
    setQuery(event.target.value)
  }
  const onSubmitSeachFormCallback = (event) => {
    event.preventDefault();
    fetchWeather(query).then(data => {
      const city = {
        query: query,
        country: data.city.country,
        forecast: data.list
      };

      const newCities = [city, ...cities];
      setWeather(city);
      setCities(newCities);
    })
  }
  return (
    <>
      <SearchForm
        onSubmit={onSubmitSeachFormCallback}
        onChange={onInputChangeCallback}
        query={query}
      />

      {
        cities.map(weather => <SearchResuldCard query={weather.query} weather={weather} />)
      }

    </>

  );
}

export default App;
