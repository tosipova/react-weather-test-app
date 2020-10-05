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

  const onInputChangeCallback = event => {
    setQuery(event.target.value)
  }
  const onSubmitSeachFormCallback = (event) => {
    event.preventDefault();
    fetchWeather(query).then(data => {
      setWeather({
        country: data.city.country,
        forecast: data.list
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

      {query && (
        <SearchResuldCard query={query} weather={weather} />
      )}
    </>

  );
}

export default App;
