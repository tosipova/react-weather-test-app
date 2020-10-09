import React from 'react';
import SearchForm from './components/SearchForm';
import fetchWeather from './services/fetchWeather';
import SearchResuldCard from './components/SearchResultsCard';
import './App.css';


function App() {
  const [query, setQuery] = React.useState('Corfu');
  const [cities, setCities] = React.useState([]);

  // TODO*: Добавь функцию, которая позволяет добавлять N городов при старте проекта

  const onInputChangeCallback = event => {
    setQuery(event.target.value)
  }
  const onSubmitSeachFormCallback = (event) => {
    event.preventDefault();
    fetchWeather(query).then(data => {
      const city = {
        name: query,
        country: data.city.country,
        forecast: data.list
      };

      // TODO: Если у нас уже есть город === query, его не добавлять в массив
      const newCities = [city, ...cities];
      setCities(newCities);
    })
  }

  const onRemoveCity = index => {
    // const formattedCities = [...cities];
    // formattedCities.splice(index, 1);

    // const formattedCities = [...cities.slice(0, index), ...cities.slice(index + 1)];

    const formattedCities = cities.filter((currentCity, currentCityIndex) => {
      // index === currentCityIndex => false
      // index !== currentCityIndex => true

      return index !== currentCityIndex;

    });

    setCities(formattedCities);
  };


  return (
    <>
      <SearchForm
        onSubmit={onSubmitSeachFormCallback}
        onChange={onInputChangeCallback}
        query={query}
      />


      {
        cities.map((city, index) => <SearchResuldCard
          key={city.name}
          name={city.name}
          country={city.country}
          forecast={city.forecast}
          index={index}
          onRemove={onRemoveCity}
        />)
      }

    </>

  );
}

export default App;
