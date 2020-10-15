import React from 'react';

import LocalStorage from './services/local-storage';
import fetchWeather from './services/fetch-weather';

import SearchForm from './components/SearchForm';
import SearchResuldCard from './components/SearchResultsCard';

import './App.css';


function App() {
  const [query, setQuery] = React.useState('');
  const initialCityValue = JSON.parse(LocalStorage.get('cities')) || [];
  const [cities, setCities] = React.useState(initialCityValue);

  const getWeather = options => {
    return fetchWeather(options).then(data => {
      const city = {
        name: data.city.name,
        country: data.city.country,
        forecast: data.list
      };

      const filtered = cities.filter(({ name }) => name !== city.name)

      const newCities = [city, ...filtered];

      LocalStorage.set('cities', JSON.stringify(newCities));
      setCities(newCities);
    })
  }
  React.useEffect(() => {
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(result => {
        const lat = result.coords.latitude;
        const lon = result.coords.longitude;
        getWeather({
          lon,
          lat
        })
      });
    }

  }, [])

  const onSubmitSeachFormCallback = event => {
    if (event) {
      event.preventDefault();
    }

    getWeather({
      q: query
    })
  }

  const onRemoveCity = index => {
    const formattedCities = cities.filter((currentCity, currentCityIndex) => {
      return index !== currentCityIndex;
    });

    setCities(formattedCities);
  };

  return (
    <>
      <SearchForm
        onSubmit={onSubmitSeachFormCallback}
        onChange={value => {
          console.log(value);
          setQuery(value);
        }}
        query={query}
      />

      {
        cities.map((city, index) => {
          return (
            <SearchResuldCard
              key={city.name}
              index={index}
              onRemove={onRemoveCity}
              {...city}
            />
          )
        })
      }

    </>

  );
}

export default App;
