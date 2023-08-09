// DOM element references
const container = document.querySelector('.container');
const searchButton = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

// API key for the weather data source
const APIKey = '9f1166115be4d7da7d9be31d2d85dc8d';

// Add event listener to the search button to initiate weather search on click
searchButton.addEventListener('click', searchForWeather);

/**
 * Initiates a search for weather data based on the input city
 */
function searchForWeather() {
    // Get city input value
    const city = document.querySelector('.search-box input').value;

    // Return early if no city is entered
    if (city === '') return;

    // Construct the API endpoint URL
    const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`;
    
    // Make the fetch request to get weather data
    fetch(endpoint)
        .then(response => response.json())
        .then(json => handleWeatherResponse(json));
}

/**
 * Handles the weather response. Either shows error or the weather info.
 * @param {Object} json - The weather data fetched from the API
 */
function handleWeatherResponse(json) {
    if (json.cod === '404.png') {
        showNotFoundError();
    } else {
        displayWeatherInfo(json);
    }
}

// Shows the not found error UI
function showNotFoundError() {
    updateDisplayElements('400px', 'none', 'none', 'block', 'fadeIn');
}

// Populates and displays the weather UI with the data
function displayWeatherInfo(json) {
    // Parse necessary data from the JSON
    const imageSrc = getWeatherImage(json.weather[0].main);
    const temperatureValue = `${parseInt(json.main.temp)}<span>°C</span>`;
    const descriptionValue = json.weather[0].description;
    const humidityValue = `${json.main.humidity}%`;
    const windValue = `${parseInt(json.wind.speed)}Km/h`;

    // Set the parsed data to the DOM
    setWeatherDetails(imageSrc, temperatureValue, descriptionValue, humidityValue, windValue);
    updateDisplayElements('590px', '', '', 'none', 'fadeIn');
}

// Maps weather type to its respective image
function getWeatherImage(weatherType) {
    const weatherImages = {
        'Clear': 'clear.png',
        'Rain': 'rain.png',
        'Snow': 'snow.png',
        'Clouds': 'cloudd.png',
        'Mist': 'mist.png'
    };

    return weatherImages[weatherType] || '';
}

// Sets the parsed weather data to the DOM elements
function setWeatherDetails(imageSrc, temperature, description, humidity, wind) {
    document.querySelector('.weather-box img').src = imageSrc;
    document.querySelector('.weather-box .temperature').innerHTML = temperature;
    document.querySelector('.weather-box .description').innerHTML = description;
    document.querySelector('.weather-details .humidity span').innerHTML = humidity;
    document.querySelector('.weather-details .wind span').innerHTML = wind;
}

// Updates the UI based on whether data is found or not
function updateDisplayElements(containerHeight, weatherBoxDisplay, weatherDetailsDisplay, errorDisplay, animationClass) {
    container.style.height = containerHeight;
    weatherBox.style.display = weatherBoxDisplay;
    weatherDetails.style.display = weatherDetailsDisplay;
    error404.style.display = errorDisplay;
    
    // Handle animations for weather info
    if (animationClass) {
        weatherBox.classList.add(animationClass);
        weatherDetails.classList.add(animationClass);
    } else {
        weatherBox.classList.remove('fadeIn');
        weatherDetails.classList.remove('fadeIn');
    }
}
