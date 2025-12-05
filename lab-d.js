class MyWeatherApplication {
    constructor() {
        this.key = "7b8d2b95cfd9cc1c04d9fa87c2c72da9";
        this.lat = undefined;
        this.lon = undefined;
    }

    async getCoordinates(cityName) {
        await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${this.key}`)
            .then(async (response) => {
                return await response.json();
            })
            .then((data) => {
                this.lat = data[0].lat;
                this.lon = data[0].lon;
            })
            .catch((error) => {
                console.log('Error:', error);
                alert('Błąd w nazwie miasta!');
            });
    }

    getCurrentWeather() {
        let req = new XMLHttpRequest();
        req.open("GET", `https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lon}&appid=${this.key}&units=metric&lang=pl`, true);
        req.addEventListener("load", () => {
            let currentWeather = JSON.parse(req.responseText);
            const forecast = document.getElementById("forecast");
            this.drawWeatherBox(forecast, currentWeather, true);
            console.log(currentWeather);
        });
        req.send(null);
    }

    getForecast() {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${this.lat}&lon=${this.lon}&appid=${this.key}&units=metric&lang=pl`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                const forecast = document.getElementById("forecast");
                for (let index of data.list) {
                    this.drawWeatherBox(forecast, index, false);
                }
                console.log(data);
            })
            .catch((error) => {
                console.log('Error:', error);
            })
    }

    getWeather() {
        const forecast = document.getElementById("forecast");
        forecast.innerHTML = '';
        this.getCurrentWeather();
        this.getForecast();
    }

    drawWeatherBox(mount, data, isCurrentWeather) {
        const weatherBox = document.createElement("div");
        weatherBox.className = "weather-box";
        if (isCurrentWeather) {
            weatherBox.id = "current-weather";
        }
        weatherBox.innerHTML = ``;
        if (isCurrentWeather) {
            weatherBox.innerHTML += `<div class="date-time">${new Date(data.dt * 1000).toISOString().replace('T', ' ').replace('Z', ' ').slice(0,19)}</div>`;
        } else {
            weatherBox.innerHTML += `<div class="date-time">${data.dt_txt}</div>`;
        }
        weatherBox.innerHTML += `
            <div class="icon">
                <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather icon">
            </div>
            <div class="weather-details">
                <div class="temp">${data.main.temp} °C</div>
                <div class="feels-like">Odczuwalna: ${data.main.feels_like} °C</div>
                <div class="weather-text-description">${data.weather[0].description}</div>
            </div>
        `;
        mount.appendChild(weatherBox);
    }
}

const myWeatherApp = new MyWeatherApplication();

document.getElementById("search-form").addEventListener("submit", async function (event) {
    event.preventDefault();
    const cityName = document.getElementById("city-name").value;
    console.log(cityName);
    await myWeatherApp.getCoordinates(cityName);
    console.log(myWeatherApp.lat);
    console.log(myWeatherApp.lon);
    myWeatherApp.getWeather();
    //document.getElementById("city-name").value = "";
})