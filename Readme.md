# Beckwith Weather App

A browser-based weather application that displays current weather conditions for any city or for the user's current location. The application integrates multiple APIs to provide weather data and animated visual feedback.

## Screenshots

<p align="center">
    <img src="./screenshots/full-screen-location.png" width="100%">
    <img src="./screenshots/phone-view-location-search.png" width="30%">
    <img src="./screenshots/phone-view-c.png" width="30%">
</p>

## Live Demo

https://colettejbeckwith.github.io/Beckwith-Weather-App/

## Features

- Search weather by city name
- Retrieve weather for the user's current location using browser geolocation
- Toggle between Fahrenheit and Celsius units
- Displays temperature, humidity, wind speed, and current conditions
- Animated weather GIFs that correspond to current weather conditions
- Loading and error states for improved user feedback
- Responsive layout designed to fit within a single viewport

## Technologies Used

- JavaScript (ES6 modules)
- HTML5
- CSS3
- Visual Crossing Weather API
- Giphy API
- Browser Geolocation API
- Fetch API

### Module Responsibilities

**index.js**

Application controller. Handles application state, user interactions, and coordinates API calls and rendering.

**visualCrossingApi.js**

Responsible for requesting weather data from the Visual Crossing API.

**normalizeWeather.js**

Transforms raw API responses into a consistent data structure used throughout the application.

**renderWeather.js**

Updates the user interface based on the normalized weather data.

**giphyApi.js**

Fetches weather-related GIFs from the Giphy API to visually represent current weather conditions.

## How It Works

1. The user enters a city name or requests their current location.
2. The application fetches weather data from the Visual Crossing Weather API.
3. The raw API response is normalized into a simplified weather object.
4. The UI is updated with current conditions.
5. A weather-related GIF is requested from the Giphy API and displayed.

## Future Improvements

- City autocomplete suggestions
- Weather forecast for upcoming days
- Improved caching to reduce API requests
- Keyboard navigation for search suggestions
- Enhanced accessibility features
- Hide API keys behind back end

## Author

Colette Beckwith

GitHub: https://github.com/colettejbeckwith



