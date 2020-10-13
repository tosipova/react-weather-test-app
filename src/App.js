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

      const filtered = cities.filter((city) => city.name !== query)

      const newCities = [city, ...filtered]; // => [{}, ...[{}, {}, {}]]

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

  // TODO*: Добавь функцию, которая позволяет добавлять N городов при старте проекта

  // const onInputChangeCallback = query => {
  //   console.log(event.target.value);
  //   setQuery(query);
  // }
  const onSubmitSeachFormCallback = event => {
    if (event) {
      event.preventDefault();
    }

    getWeather({
      q: query
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
        // onChange={onInputChangeCallback}
        onChange={setQuery}

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
