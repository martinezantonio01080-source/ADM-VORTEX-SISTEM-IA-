
const apiKey = "AQUÍ_TU_API_KEY_REAL"; // Reemplaza con tu llave de OpenWeatherMap

async function handleSearch() {
    const locationInput = document.getElementById('stateInput').value.trim();
    const resultDiv = document.getElementById('result');
    
    // Validación de campo vacío
    if (!locationInput) {
        resultDiv.innerHTML = `<div style="color: #f87171; background: rgba(248, 113, 113, 0.1); padding: 10px; border-radius: 8px;">Please enter any global location.</div>`;
        return;
    }
    
    // Mensaje de carga universal
    resultDiv.innerHTML = `<div style="color: #38bdf8;">Scanning global meteorological network...</div>`;
    
    try {
        // Paso 1: Usar la API de Geocodificación para encontrar cualquier ciudad/lugar del mundo
        const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(locationInput)}&limit=1&appid=${apiKey}`;
        const geoResponse = await fetch(geoUrl);
        const geoData = await geoResponse.json();
        
        if (!geoResponse.ok || geoData.length === 0) {
            throw new Error("Location not found anywhere on Earth.");
        }
        
        const { lat, lon, name, country, state } = geoData[0];
        const stateName = state ? `, ${state}` : '';
        
        // Paso 2: Consultar el clima exacto usando latitud y longitud (funciona para todo el planeta)
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();
        
        if (!weatherResponse.ok) {
            throw new Error("Could not retrieve weather metrics.");
        }
        
        // Extraer los datos meteorológicos
        const temp = Math.round(weatherData.main.temp);
        const feelsLike = Math.round(weatherData.main.feels_like);
        const humidity = weatherData.main.humidity;
        const windSpeed = weatherData.wind.speed;
        const condition = weatherData.weather[0].description;
        
        // Renderizar la información global en pantalla
        resultDiv.innerHTML = `
            <div style="font-size: 1.1rem; font-weight: bold; color: #38bdf8; margin-bottom: 8px;">📍 ${name}${stateName}, ${country}</div>
            <div style="font-size: 2.5rem; font-weight: 800; text-align: center; margin: 10px 0; color: #ffffff;">
                ${temp}°C
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 15px;">
                <div style="background: rgba(255,255,255,0.05); padding: 8px; border-radius: 6px; font-size: 0.9rem;">Feels Like: <strong style="display:block; color:#fff;">${feelsLike}°C</strong></div>
                <div style="background: rgba(255,255,255,0.05); padding: 8px; border-radius: 6px; font-size: 0.9rem;">Humidity: <strong style="display:block; color:#fff;">${humidity}%</strong></div>
                <div style="background: rgba(255,255,255,0.05); padding: 8px; border-radius: 6px; font-size: 0.9rem;">Wind Speed: <strong style="display:block; color:#fff;">${windSpeed} m/s</strong></div>
                <div style="background: rgba(255,255,255,0.05); padding: 8px; border-radius: 6px; font-size: 0.9rem; text-transform: capitalize;">Condition: <strong style="display:block; color:#fff;">${condition}</strong></div>
            </div>
        `;
        
    } catch (error) {
        console.error("Global search error:", error);
        let errorMsg = "An error occurred while fetching global weather.";
        if (error.message.includes("Location not found")) {
            errorMsg = "We couldn't find that place on the map. Try another location.";
        }
        resultDiv.innerHTML = `<div style="color: #f87171; background: rgba(248, 113, 113, 0.1); padding: 10px; border-radius: 8px;">⚠️ ${errorMsg}</div>`;
    }
}
