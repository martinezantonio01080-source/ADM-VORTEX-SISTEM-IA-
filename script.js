async function getStateWeather(stateOrRegion, countryCode, apiKey) {
    // OpenWeatherMap allows searching by state/region and country code using geocoding or direct query formatting
    const query = `${encodeURIComponent(stateOrRegion)},${encodeURIComponent(countryCode)}`;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=metric&lang=en`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`API Error: ${response.status} - ${response.statusText}`);
        }
        
        const data = await response.json();
        const temp = data.main.temp;
        
        // Strict safety validation layer against thermal hallucinations
        if (temp < -80 || temp > 60) {
            throw new Error("Temperature out of logical terrestrial physical ranges.");
        }
        
        return {
            success: true,
            location: `${data.name}, ${data.sys.country}`,
            temperature: temp,
            feelsLike: data.main.feels_like,
            humidity: data.main.humidity,
            condition: data.weather[0].description,
            windSpeed: data.wind.speed
        };
        
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
}

// Example usage:
// getStateWeather("Jalisco", "MX", "YOUR_API_KEY")
//     .then(result => console.log(result));
