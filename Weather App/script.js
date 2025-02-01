document.getElementById('search-btn').addEventListener('click', () => {
    const city = document.getElementById('city-input').value.trim();
    if (city) {
        getWeatherData(city);
    } else {
        displayError('Please enter a city name.');
    }
});

async function getWeatherData(city) {
    const apiKey = '907a5e34c0e74be1f45cd5f98399e7e0'; 
    const apiUrl = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${encodeURIComponent(city)}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (response.ok && data.current) {
            displayWeatherData(data);
        } else {
            displayError(data.error ? data.error.info : 'Unable to fetch weather data.');
        }
    } catch (error) {
        displayError('Unable to fetch weather data. Please try again later.');
    }
}

function displayWeatherData(data) {
    document.getElementById('city-name').textContent = `${data.location.name}, ${data.location.country}`;
    document.getElementById('temperature').textContent = `Temperature: ${data.current.temperature}°C`;
    document.getElementById('description').textContent = `Description: ${capitalizeFirstLetter(data.current.weather_descriptions[0])}`;
    document.getElementById('humidity').textContent = `Humidity: ${data.current.humidity}%`;
    document.getElementById('wind-speed').textContent = `Wind Speed: ${data.current.wind_speed} km/h`;
    document.getElementById('weather-icon').src = data.current.weather_icons[0];
    document.getElementById('weather-icon').alt = data.current.weather_descriptions[0];
    document.getElementById('error-message').textContent = ''; 
}

function displayError(message) {
    document.getElementById('error-message').textContent = message;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
