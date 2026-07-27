class ADMVortexSystem {
    constructor() {
        this.feedrate = 100.0;
        this.baselineVibration = 1.5;
    }

    processTelemetry() {
        const vibration = +(Math.random() * (3.0 - 1.0) + 1.0).toFixed(2);
        const temp = +(Math.random() * (90.0 - 70.0) + 70.0).toFixed(1);
        const load = +(Math.random() * (75.0 - 20.0) + 20.0).toFixed(1);

        let logMsg = `[Telemetry] Vib: ${vibration}G | Temp: ${temp}°C | Load: ${load}%\n`;

        if (vibration > (this.baselineVibration * 1.5)) {
            logMsg += `🚨 [ALERT] Critical harmonic vibration! Reducing speed.\n`;
            this.adjustFeedrate(-35.0);
        } else if (load > 70.0 || temp > 85.0) {
            logMsg += `⚠️ [WARNING] High load/temp. Adjusting safety.\n`;
            this.adjustFeedrate(-10.0);
        } else {
            if (this.feedrate < 105.0) {
                logMsg += `✅ [OPTIMIZE] System stable. Boosting performance.\n`;
                this.adjustFeedrate(0.5);
            }
        }
        logMsg += `⚡ [Hardware] Feedrate: ${this.feedrate.toFixed(1)}%\n-----------------------------------\n`;
        return logMsg;
    }

    adjustFeedrate(delta) {
        this.feedrate = Math.max(10.0, Math.min(110.0, this.feedrate + delta));
    }
}

const vortex = new ADMVortexSystem();
const logBox = document.getElementById('console-log');

function startSimulation() {
    logBox.innerText = ">>> INITIATING VORTEX EDGE CYCLES <<<\n\n";
    for (let i = 1; i <= 3; i++) {
        setTimeout(() => {
            logBox.innerText += `--- Cycle #${i} ---\n` + vortex.processTelemetry();
        }, i * 400);
    }
}
