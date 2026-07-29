// API Configuration
const apiKey = "YOUR_REAL_API_KEY_HERE"; // Replace this with your actual OpenWeatherMap API key

async function handleSearch() {
    const locationInput = document.getElementById('stateInput').value.trim();
    const countryInput = document.getElementById('countryInput') ? document.getElementById('countryInput').value.trim() : '';
    const resultDiv = document.getElementById('result');
    
    // Validate empty fields
    if (!locationInput) {
        resultDiv.innerHTML = `<div class="error-message" style="color: #f87171; background: rgba(248, 113, 113, 0.1); padding: 10px; border-radius: 8px;">Please enter a location.</div>`;
        return;
    }
    
    // Initial loading message
    resultDiv.innerHTML = `<div class="placeholder-text" style="color: #38bdf8;">Connecting to telemetry network...</div>`;
    
    // Build query (attaches country if provided for higher accuracy)
    const query = countryInput ? `${locationInput},${countryInput}` : locationInput;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(query)}&units=metric&appid=${apiKey}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        // Validate if API responded with an error (e.g. 404 city not found, 401 invalid key)
        if (!response.ok) {
            throw new Error(data.message || "Failed to retrieve information.");
        }
        
        // Extract key data from response
        const cityName = data.name;
        const countryCode = data.sys.country;
        const temp = Math.round(data.main.temp);
        const feelsLike = Math.round(data.main.feels_like);
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;
        const condition = data.weather[0].description;
        
        // Render results visually in the card
        resultDiv.innerHTML = `
            <div style="font-size: 1.1rem; font-weight: bold; color: #38bdf8; margin-bottom: 8px;">📍 ${cityName}, ${countryCode}</div>
            <div style="font-size: 2.5rem; font-weight: 800; text-align: center; margin: 10px 0; color: #ffffff;">
                ${temp}°C
            </div>
            <div class="result-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 15px;">
                <div class="metric-item" style="background: rgba(255,255,255,0.05); padding: 8px; border-radius: 6px; font-size: 0.9rem;">Feels Like: <strong style="display:block; color:#fff;">${feelsLike}°C</strong></div>
                <div class="metric-item" style="background: rgba(255,255,255,0.05); padding: 8px; border-radius: 6px; font-size: 0.9rem;">Humidity: <strong style="display:block; color:#fff;">${humidity}%</strong></div>
                <div class="metric-item" style="background: rgba(255,255,255,0.05); padding: 8px; border-radius: 6px; font-size: 0.9rem;">Wind Speed: <strong style="display:block; color:#fff;">${windSpeed} m/s</strong></div>
                <div class="metric-item" style="background: rgba(255,255,255,0.05); padding: 8px; border-radius: 6px; font-size: 0.9rem; text-transform: capitalize;">Condition: <strong style="display:block; color:#fff;">${condition}</strong></div>
            </div>
        `;
        
    } catch (error) {
        // User-friendly error handling on screen
        console.error("Fetch error:", error);
        let errorMsg = "An error occurred while fetching the weather.";
        if (error.message.includes("city not found")) {
            errorMsg = "Location not found. Please check the name.";
        } else if (error.message.includes("Invalid API key")) {
            errorMsg = "The OpenWeatherMap API key is invalid or still activating.";
        }
        
        resultDiv.innerHTML = `<div class="error-message" style="color: #f87171; background: rgba(248, 113, 113, 0.1); padding: 10px; border-radius: 8px;">⚠️ ${errorMsg}</div>`;
    }
}
