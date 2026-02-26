// const div = document.getElementById('weather-div');

export function renderLoading() {

    document.getElementById('weather-gif').src = "";
    document.getElementById('city-name').textContent = "Loading...";
    document.getElementById('city-temp').textContent = ""
    document.getElementById('city-feels-like').textContent = "";
    document.getElementById('city-humidity').textContent = "";
    document.getElementById('city-wind-speed').textContent = "";
    document.getElementById('city-conditions').textContent = "";

}

export function renderError(message = "No weather data.") {

    document.getElementById('city-name').textContent = "ERROR";
    document.getElementById('city-temp').textContent = ""
    document.getElementById('city-feels-like').textContent = "";
    document.getElementById('city-humidity').textContent = "";
    document.getElementById('city-wind-speed').textContent = "";
    document.getElementById('city-conditions').textContent = message;

}

export function renderWeather(weather, unitGroup) {
    
    document.getElementById('city-name').textContent = weather.location.name;
    document.getElementById('city-humidity').textContent = weather.current.humidity + "%";
    document.getElementById('city-conditions').textContent = weather.current.conditions;

    if (unitGroup == "metric") {
        document.getElementById('city-temp').textContent = weather.current.temp + "°C"
        document.getElementById('city-feels-like').textContent = weather.current.feelsLike + "°C";
        document.getElementById('city-wind-speed').textContent = weather.current.windSpeed + " KPH";
    } else if (unitGroup == "us") {
        document.getElementById('city-temp').textContent = weather.current.temp + "°F"
        document.getElementById('city-feels-like').textContent = weather.current.feelsLike + "°F";
        document.getElementById('city-wind-speed').textContent = weather.current.windSpeed + " MPH";
    
    }
}


    