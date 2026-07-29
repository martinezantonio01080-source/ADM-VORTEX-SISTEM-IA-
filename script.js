async function getRealWeather(city, apiKey) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=en`;
    
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
            city: data.name,
            temperature: temp,
            feelsLike: data.main.feels_like,
            humidity: data.main.humidity,
            condition: data.weather[0].description
        };
        
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
}

// Example usage:
// getRealWeather("New York", "YOUR_API_KEY")
//     .then(result => console.log(result));
