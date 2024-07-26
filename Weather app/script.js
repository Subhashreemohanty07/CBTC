const searchBar = document.querySelector('.search-bar');
const searchBtn = document.getElementById('searchBtn');
const weatherImg = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const windspeed = document.getElementById('wind-speed');
const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');

async function checkWeather(city) {
    // const api_key = "4cd0eee81294c867b4bc4cfc64e998c5";
    // const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
    const api_key = "2292610f0aeb1584e2d24e877e543625";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;
    const weather_data = await fetch(`${url}`).then(response => response.json());

    if(weather_data.cod === `404`){
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        console.log("error");
        return;
    }
    console.log("run");
    location_not_found.style.display = "none";
    weather_body.style.display = "flex";

    // console.log(weather_data);
    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
    description.innerHTML = `${weather_data.weather[0].description}`;

    humidity.innerHTML = `${weather_data.main.humidity}%`;
    windspeed.innerHTML = `${weather_data.wind.speed}Km/Hr`;
    switch(weather_data.weather[0].main){
        case 'Clouds':
            weatherImg.src = "/images/cloudy.png";
            break;
        case 'Clear':
            weatherImg.src = "/images/clear.png";
            break;
        case 'Rain':
            weatherImg.src = "/images/rain.png";
            break;
        case 'Mist':
            weatherImg.src = "/images/mist.png";
            break;
        case 'Snow':
            weatherImg.src = "/images/snow.png";
            break;

    }

    console.log(weather_data);
}
 

searchBtn.addEventListener('click', () => {
    checkWeather(searchBar.value);
});
