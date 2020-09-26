import React, { useState } from 'react';
import './App.css';
import { WiDaySunny, WiCloud, WiRain, WiDayHaze, WiSnow } from 'weather-icons-react';

const api = {
  key: 'e1206bf3140def21425fd1facf07c16f',
  base: 'https://api.openweathermap.org/data/2.5/',
};
function App() {
  const [weather, setWeather] = useState({});
  const [query, setQuery] = useState('');

  const search = (e) => {
    if (e.key === 'Enter') {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((response) => response.json())
        .then((result) => {
          setWeather(result );
          setQuery('');
          console.log(result);
          //console.log(result.weather[0].main);
        });
    }
  };

  const dateCreate = (d) => {
    let months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    let days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();


    return `${day} ${date} ${month} ${year}`;

  };

const hourCreate = (h) => {
    let minute =h.getMinutes();
    let hour = h.getHours();
    if (minute.toString().length===1){
      return `${hour+1}:0${minute}`;
    }
    else{
      return `${hour+1}:${minute}`;
    }
    
 }
  

  return (
    <div className={(typeof weather.main !== "undefined") ? ( (weather.main.temp > 15) ? 'App warm' : 'App') : 'App' }>
      <main>
        <div className='search-box'>
          <input
            type='text'
            className='search-bar'
            placeholder='Search...'
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main !== "undefined") ? (
          <div>
            <div className='location-box'>
              <div className='location'>{weather.name}, {weather.sys.country}</div>
              <div className='date'>{dateCreate(new Date())}</div>
            </div>
            <div className='weather-box'>
              <div className='temp'>{Math.round(weather.main.temp)}°</div>
              <div className='weather'>{(weather.weather[0].main.toLowerCase() === 'clouds' ? <WiCloud size={100} color='lightgrey' /> : 
                                        weather.weather[0].main.toLowerCase() === 'clear' ? <WiDaySunny size={100} color='yellow' /> : 
                                        weather.weather[0].main.toLowerCase() === 'rain' ? <WiRain size={100} color='lightgrey' /> :
                                        weather.weather[0].main.toLowerCase() === 'haze' ? <WiDayHaze size={100} color='lightgrey' /> :
                                        weather.weather[0].main.toLowerCase() === 'snow' ? <WiSnow size={100} color='lightgrey' /> :
                                        'nem jo')}</div>
              <div className='description'>{weather.weather[0].description}</div>
              <div className="humidity">Humidity: {weather.main.humidity} %</div>
              <div className="sunrise">Sunrise: {hourCreate(new Date((weather.sys.sunrise+weather.timezone-7200-3600)*1000))}</div>
              <div className="sunset">Sunset: {hourCreate(new Date((weather.sys.sunset+weather.timezone-7200-3600)*1000))}</div>
              
            </div>
          </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;

