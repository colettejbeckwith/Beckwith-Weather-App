// visualCrossingApi.js

const BASE = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";

export async function fetchTimeline(location, { unitGroup = "metric" } = {}) {

    // const key = "CQFX6K4NG3K3VKECYBU7EDXKA";
    const key = "JHW97WUXV8FALBFURQM78NRC4";
    const url = `${BASE}/${encodeURIComponent(location)}?unitGroup=${unitGroup}&key=${key}&contentType=json`;

    const res = await fetch(url);
    
    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`Bad Request`);
    }

    return res.json();
}

export async function fetchTimelineByCoords(lat, lon, opts) {
    return fetchTimeline(`${lat},${lon}`, opts);
}