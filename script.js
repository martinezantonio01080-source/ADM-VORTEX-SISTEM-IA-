async function handleSearch() {
    const state = document.getElementById('stateInput').value.trim();
    const country = document.getElementById('countryInput').value.trim();
    const resultDiv = document.getElementById('result');
    
    if (!state || !country) {
        resultDiv.innerHTML = `<div class="error-message">Please fill in both fields.</div>`;
        return;
    }
    
    resultDiv.innerHTML = `<div class="placeholder-text">Connecting to telemetry network...</div>`;
    
    // Simulación temporal para probar diseño en celular
    setTimeout(() => {
        resultDiv.innerHTML = `
            <div style="font-size: 1rem; font-weight: bold; color: #38bdf8; margin-bottom: 5px;">📍 ${state}, ${country.toUpperCase()}</div>
            <div style="font-size: 2.2rem; font-weight: 800; text-align: center; margin: 10px 0; color: #ffffff;">
                24.5°C
            </div>
            <div class="result-grid">
                <div class="metric-item">Feels Like<strong>26°C</strong></div>
                <div class="metric-item">Humidity<strong>45%</strong></div>
                <div class="metric-item">Wind Speed<strong>3.2 m/s</strong></div>
                <div class="metric-item" style="text-transform: capitalize;">Condition<strong>Clear sky</strong></div>
            </div>
        `;
    }, 1000);
}
