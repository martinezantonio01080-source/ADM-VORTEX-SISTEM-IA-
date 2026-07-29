async function getStateWeather(stateOrRegion, countryCode, apiKey) {
    const query = `${encodeURIComponent(stateOrRegion)},${encodeURIComponent(countryCode)}`;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=metric&lang=en`;
    
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Location not found or API error (${response.status})`);
    }
    
    const data = await response.json();
    const temp = data.main.temp;
    
    // Capa de seguridad anti-alucinaciones térmicas
    if (temp < -80 || temp > 60) {
        throw new Error("Temperature out of logical terrestrial physical ranges.");
    }
    
    return {
        location: `${data.name}, ${data.sys.country}`,
        temperature: temp,
        feelsLike: data.main.feels_like,
        humidity: data.main.humidity,
        condition: data.weather[0].description,
        windSpeed: data.wind.speed
    };
}

async function handleSearch() {
    const state = document.getElementById('stateInput').value.trim();
    const country = document.getElementById('countryInput').value.trim();
    const resultDiv = document.getElementById('result');
    
    if (!state || !country) {
        resultDiv.innerHTML = `<div class="error-message">Please fill in both fields.</div>`;
        return;
    }
    
    // Recuerda poner tu API Key de OpenWeatherMap aquí para las pruebas en vivo
    const apiKey = "TU_API_KEY_DE_OPENWEATHER"; 
    
    resultDiv.innerHTML = `<div class="placeholder-text">Connecting to telemetry network...</div>`;
    
    try {
        const data = await getStateWeather(state, country, apiKey);
        
        resultDiv.innerHTML = `
            <div style="font-size: 1rem; font-weight: bold; color: #38bdf8; margin-bottom: 5px;">📍 ${data.location}</div>
            <div style="font-size: 2.2rem; font-weight: 800; text-align: center; margin: 10px 0; color: #ffffff;">
                ${data.temperature}°C
            </div>
            <div class="result-grid">
                <div class="metric-item">Feels Like<strong>${data.feelsLike}°C</strong></div>
                <div class="metric-item">Humidity<strong>${data.humidity}%</strong></div>
                <div class="metric-item">Wind Speed<strong>${data.windSpeed} m/s</strong></div>
                <div class="metric-item" style="text-transform: capitalize;">Condition<strong>${data.condition}</strong></div>
            </div>
        `;
    } catch (error) {
        resultDiv.innerHTML = `<div class="error-message">⚠️ Error: ${error.message}</div>`;
    }
}
