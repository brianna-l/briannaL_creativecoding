let actualTemperature = null;
let actualHour = null;

document.addEventListener("DOMContentLoaded", function() {
    initialize();
    updateText();
    updateBackgroundColor(new Date().getHours());
});

function initialize() {
    getData();
    updateActualTime();
    setInterval(updateActualTime, 3600000);

    const currentHour = new Date().getHours();
    updateBackgroundColor(currentHour);
}

function updateText() {
    const userInput = document.getElementById('userInput').value || 'nature';
    const typein = document.getElementById('typein');
    typein.textContent = userInput;

    document.documentElement.style.setProperty('--typein-content', `"${userInput}"`);
}

function updateCurrentTimeDisplay(hour, minute = 0) {
    document.getElementById('currentTimeDisplay').textContent = `Current Time: ${formatTime(hour, minute)}`;
}

function formatTime(hour, minute) {
    return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
}

function updateBackgroundColor(hour) {
    const colors = [
        { hour: 0, color: [158, 194, 255] },
        { hour: 4, color: [255, 162, 120] },
        { hour: 7, color: [255, 223, 186] },
        { hour: 10, color: [120, 208, 255] },
        { hour: 14, color: [255, 247, 120] },
        { hour: 18, color: [212, 120, 95] },
        { hour: 23, color: [158, 194, 255] },
    ];

    const selectedColor = interpolateTimeBasedColor(hour, colors);
    document.body.style.setProperty('--typein-before-color',  `rgb(${selectedColor.join(", ")})`);
}

function interpolateTimeBasedColor(hour, colors) {
    for (let i = 0; i < colors.length - 1; i++) {
        if (hour >= colors[i].hour && hour < colors[i + 1].hour) {
            const ratio = (hour - colors[i].hour) / (colors[i + 1].hour - colors[i].hour);
            return interpolateColor(colors[i].color, colors[i + 1].color, ratio);
        }
    }
    return colors[colors.length - 1].color;
}

function interpolateColor(color1, color2, ratio) {
    return color1.map((start, index) => Math.round(start + (color2[index] - start) * ratio));
}

function updateActualTime() {
    const currentTime = new Date();
    actualHour = currentTime.getHours();
    document.getElementById('timeSlider').value = actualHour;

    updateCurrentTimeDisplay(actualHour, currentTime.getMinutes());
    setSkewXAngle(actualHour);
}

function adjustTime() {
    const sliderValue = parseInt(document.getElementById('timeSlider').value);
    updateCurrentTimeDisplay(sliderValue);
    setSkewXAngle(sliderValue);
    updateBackgroundColor(sliderValue);
}

function setSkewXAngle(hour) {
    const skewValue = map(hour, 0, 23, -30, 30);
    document.documentElement.style.setProperty('--skew-x-angle', `${skewValue}deg`);
}

function applyEffects(temperature) {
    const changeElm = document.getElementById('typein');
    changeElm.style.transform = `rotateY(${map(temperature, -20, 50, 0, 70)}deg)`;

    const gradientColor = getGradientColor(temperature, -20, 10, 50, [0, 0, 255], [255, 255, 255], [255, 0, 0]);
    changeElm.style.color = `rgb(${gradientColor.join(", ")})`;

    changeElm.style.fontWeight = Math.round(map(temperature, 0, 40, 200, 900));
}

function updateTemperatureDisplay(temperature) {
    document.getElementById('temperatureDisplay').textContent = `Current Temp: ${temperature.toFixed(1)}°C`;
}

function adjustTemp() {
    const sliderValue = parseFloat(document.getElementById('tempSlider').value);
    updateTemperatureDisplay(sliderValue);
    applyEffects(sliderValue);
}

async function getData() {
    const myUrl = "https://api.openweathermap.org/data/2.5/weather?lat=40.730610&lon=-73.935242&appid=dd5e56c491cc41e677b12f4481570d82";
    try {
        const response = await fetch(myUrl);
        const data = await response.json();
        actualTemperature = data.main.temp - 273.15;

        console.log("Temperature (Celsius):", actualTemperature);
        updateTemperatureDisplay(actualTemperature);
        document.getElementById('tempSlider').value = actualTemperature.toFixed(1);
        applyEffects(actualTemperature);
    } catch (error) {
        console.error(error.message);
    }
}

function resetToActual() {
    if (actualTemperature !== null) {
        updateTemperatureDisplay(actualTemperature);
        document.getElementById('tempSlider').value = actualTemperature.toFixed(1);
        applyEffects(actualTemperature);
    }

    if (actualHour !== null) {
        document.getElementById('timeSlider').value = actualHour;
        updateCurrentTimeDisplay(actualHour);
        setSkewXAngle(actualHour);
        updateBackgroundColor(actualHour);
    }
}

function map(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

function getGradientColor(temp, minTemp, midTemp, maxTemp, startColor, midColor, endColor) {
    let ratio;
    let color = [];
    if (temp <= midTemp) {
        ratio = (temp - minTemp) / (midTemp - minTemp);
        color = interpolateColor(startColor, midColor, ratio);
    } else {
        ratio = (temp - midTemp) / (maxTemp - midTemp);
        color = interpolateColor(midColor, endColor, ratio);
    }
    return color;
}
