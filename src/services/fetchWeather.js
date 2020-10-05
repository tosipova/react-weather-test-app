// api.openweathermap.org/data/2.5/forecast?q=London,us&mode=xml
// api.openweathermap.org/data/2.5/forecast?lat=35&lon=139

// api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}

const API_KEY = '804bf2ec76299d632228ceb96b6fd7ff';
const BASE_API_URL = 'https://api.openweathermap.org/'

export default function fetchWeather(query) {
    const fullApiUrl = `${BASE_API_URL}data/2.5/forecast?q=${query}&appid=${API_KEY}&units=metric`

    return fetch(fullApiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            return data;
        });
}