// index.js

import "./styles.css";

import { fetchTimeline, fetchTimelineByCoords } from "./visualCrossingApi.js";
import { normalizeVisualCrossing } from "./normalizeWeather.js";
import { renderLoading, renderWeather, renderError } from "./renderWeather.js";
import { displayGif } from "./giphyApi.js";

let unitGroup = "us";
let currentCity = "";

let locationQuery = true;

const searchInput = document.getElementById('location-entry-text-box');

function capitalizeWords(str) {
    return str
        .toLowerCase()
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}


async function loadByCity(city) {
    try {
        renderLoading();
        const raw = await fetchTimeline(city, { unitGroup });
        const weather = normalizeVisualCrossing(raw, { unitGroup });
        currentCity = weather.location.name;
        // console.log(weather.location.name);
        searchInput.placeholder = weather.location.name;
        renderWeather(weather, unitGroup);
        locationQuery = false;
        displayGif(weather.current.icon, currentCity);
    } catch (e) {
        displayGif("error", "");
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
                weather.location.name = "Your Current Location";
                
                renderWeather(weather, unitGroup);
                displayGif(weather.current.icon, currentCity);
            } catch (e) {
                displayGif("error", "");
                renderError(e.message || "Not Found");
            }
        },
        () => {
            displayGif("error", "");
            renderError("Permission denied.");

        }
    );
}

function toggleUnits() {
    unitGroup = unitGroup === "us" ? "metric" : "us";
    if (locationQuery) loadByCurrentLocation();
    if (!locationQuery) loadByCity(currentCity);
}



searchInput.addEventListener("keydown", async (e) => {
    if (e.key !== "Enter") return;

    e.preventDefault();

    const city = capitalizeWords(searchInput.value.trim());
    if (!city) return;

    locationQuery = false;
    currentCity = city;
    loadByCity(city);

    
    searchInput.blur();
    searchInput.value = "";

    await loadByCity(city);
    
});

// searchInput.addEventListener("blur", () => {
//     const city = searchInput.value.trim();
//     if (!city) return;

//     locationQuery = false;
//     currentCity = city;
//     // searchInput.blur();
//     loadByCity(city);
// });

document.getElementById('change-units-button').addEventListener('click', () => {
    toggleUnits();
});

document.getElementById('find-current-location-button').addEventListener('click', async () => {
    locationQuery = true;
    searchInput.value = "";
    searchInput.placeholder = "Enter Location";

    const permission = await navigator.permissions.query({ name: "geolocation" });

    if (permission.state === "denied") {
      alert(
        "Location access is blocked. Please enable location services for this site in your browser settings."
      );
      return;
    }

    loadByCurrentLocation();
});

searchInput.value = "";
searchInput.placeholder = "Enter Location";
loadByCurrentLocation();