const apiKey = "AQUÍ_TU_API_KEY_REAL"; // Reemplaza con tu llave activa de OpenWeatherMap

async function handleSearch() {
    const query = document.getElementById('locationInput').value.trim();
    const resultDiv = document.getElementById('result');
    
    if (!query) {
        resultDiv.innerHTML = `<div class="error-message">⚠️ Please enter a location query.</div>`;
        return;
    }
    
    resultDiv.innerHTML = `<div class="status-message">&gt; Scanning telemetry network...</div>`;
    
    try {
        const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=1&appid=${apiKey}`;
        const geoResponse = await fetch(geoUrl);
        const geoData = await geoResponse.json();
        
        if (!geoResponse.ok || geoData.length === 0) {
            throw new Error("Location not found.");
        }
        
        const { lat, lon, name, country, state } = geoData[0];
        const stateName = state ? `, ${state}` : '';
        
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();
        
        if (!weatherResponse.ok) {
            throw new Error("Weather metrics failed.");
        }
        
        const temp = Math.round(weatherData.main.temp);
        const feelsLike = Math.round(weatherData.main.feels_like);
        const humidity = weatherData.main.humidity;
        const windSpeed = weatherData.wind.speed;
        const condition = weatherData.weather[0].description;
        
        resultDiv.innerHTML = `
            <div class="location-header">📍 ${name}${stateName}, ${country}</div>
            <div class="temp-display">${temp}°C</div>
            <div class="condition-text">${condition}</div>
            <div class="weather-grid">
                <div class="weather-item">Feels Like: <strong>${feelsLike}°C</strong></div>
                <div class="weather-item">Humidity: <strong>${humidity}%</strong></div>
                <div class="weather-item">Wind Speed: <strong>${windSpeed} m/s</strong></div>
            </div>
        `;
        
    } catch (error) {
        console.error("Search error:", error);
        resultDiv.innerHTML = `<div class="error-message">⚠️ Target not found. Check query syntax.</div>`;
    }
}
