async function obtenerClimaReal(ciudad, apiKey) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(ciudad)}&appid=${apiKey}&units=metric&lang=es`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error en la API: ${response.status} - ${response.statusText}`);
        }
        
        const data = await response.json();
        const temp = data.main.temp;
        
        // Capa de validación estricta de seguridad contra alucinaciones térmicas
        if (temp < -80 || temp > 60) {
            throw new Error("Temperatura fuera de rangos físicos terrestres lógicos.");
        }
        
        return {
            exito: true,
            ciudad: data.name,
            temperatura: temp,
            sensacionTermica: data.main.feels_like,
            humedad: data.main.humidity,
            condicion: data.weather[0].description
        };
        
    } catch (error) {
        return {
            exito: false,
            error: error.message
        };
    }
}

// Ejemplo de uso:
// obtenerClimaReal("Ciudad de México", "TU_API_KEY")
//     .then(resultado => console.log(resultado));
