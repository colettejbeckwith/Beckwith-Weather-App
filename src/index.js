// index.js

import "./styles.css";

import { fetchTimeline, fetchTimelineByCoords } from "./visualCrossingApi.js";
import { normalizeVisualCrossing } from "./normalizeWeather.js";
import { renderLoading, renderWeather, renderError } from "./renderWeather.js";
import { displayGif } from "./giphyApi.js";

let unitGroup = "us";
let currentCity = "";

let locationQuery = false;


async function loadByCity(city) {
    try {
        renderLoading();
        const raw = await fetchTimeline(city, { unitGroup });
        const weather = normalizeVisualCrossing(raw, { unitGroup });
        currentCity = city;
        renderWeather(weather, unitGroup);
        // displayGif(weather.current.icon);
    } catch (e) {
        renderError(e.message || "Something went wrong.");
    }
}

async function loadByCurrentLocation() {
    renderLoading();
    
    navigator.geolocation.getCurrentPosition(
        async (pos) => {
            try {
                const { latitude, longitude } = pos.coords;
                const raw = await fetchTimelineByCoords(latitude, longitude, { unitGroup });
                const weather = normalizeVisualCrossing(raw, { unitGroup });
                currentCity = weather.location.name;
                weather.location.name = "📍 Your Location";
                renderWeather(weather, unitGroup);
            } catch (e) {
                renderError(e.message || "Couldn't load weather for your location.");
            }
        },
        () => {
            renderError("Location permission denied. Search by city instead.");
        }
    );
}

function toggleUnits() {
    unitGroup = unitGroup === "us" ? "metric" : "us";
    if (locationQuery) loadByCurrentLocation();
    if (!locationQuery) loadByCity(currentCity);
}

document.getElementById('change-units-button').addEventListener('click', () => {
    toggleUnits();
});

document.getElementById('find-current-location-button').addEventListener('click', () => {
    locationQuery = true;
    loadByCurrentLocation();
});

loadByCity("Chicago, IL");