// normalizeWeather.js

export function normalizeVisualCrossing(data, { unitGroup = "metric" } = {}) {

    const current = data.currentConditions ?? {};
    const days = Array.isArray(data.days) ? data.days : [];

    return {
        location: {
            name: data.resolvedAddress ?? data.address ?? "Unknown location",
            lat: data.latitude,
            lon: data.longitude,
            timezone: data.timezone,
        },
        current: {
            temp: current.temp,
            feelsLike: current.feelslike,
            humidity: current.humidity,
            windSpeed: current.windspeed,
            conditions: current.conditions,
            icon: current.icon,
        },
        forecast: days.slice(0, 7).map((d) => ({
            date: d.datetime,
            high: d.tempmax,
            low: d.tempmin,
            conditions: d.conditions,
            icon: d.icon,
        })),
        meta: {
            unitGroup,
            fetchedAt: Date.now(),
        },
    };
}