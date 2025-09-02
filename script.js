let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearchSubmit);

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchValue = document.querySelector("#search-bar").value;
  searchCity(searchValue);
}

function searchCity(city) {
  let apiKey = "36a020bd802233oee28f5e56a4tb2a2d";
  let currentWeatherAPIURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  let forecastWeatherAPIURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

  axios.get(currentWeatherAPIURL).then(getWeather);
  axios.get(forecastWeatherAPIURL).then(getForecast);
  formatDate();
}

function getWeather(response) {
  console.log("response", response);

  let cityField = document.querySelector("#city");
  let countryField = document.querySelector("#country");
  let temperatureField = document.querySelector("#temperature");
  let feelsLikeField = document.querySelector("#feels-like");
  let humidityField = document.querySelector("#humidity");
  let windField = document.querySelector("#wind");
  let statusField = document.querySelector("#status");
  let weatherIconField = document.querySelector("#weather-icon");

  let temperature = Math.round(response.data.temperature.current);
  let feelsLike = Math.round(response.data.temperature.feels_like);
  let weatherIcon = `${response.data.condition.icon_url}`;
  let weatherIconAltText = response.data.condition.icon;

  cityField.innerHTML = `${response.data.city}`;
  countryField.innerHTML = `${response.data.country}`;
  temperatureField.innerHTML = `${temperature}°C`;
  feelsLikeField.innerHTML = `feels like ${feelsLike}°C`;
  humidityField.innerHTML = `💧 Humidity: ${response.data.temperature.humidity}%,`;
  windField.innerHTML = `💨 Wind: ${Math.round(response.data.wind.speed)} m/s`;
  statusField.innerHTML = `${response.data.condition.description},`;
  weatherIconField.innerHTML = `<img src=${weatherIcon} alt=${weatherIconAltText} class="weather-icon" />`;
}

function formatDate() {
  const now = new Date();
  let currentDay = now.getDay();
  let currentDate = now.getDate();
  let currentMonth = now.getMonth();
  let currentHour = now.getHours();
  let currentMinutes = now.getMinutes();

  let dayField = document.querySelector("#day");
  let dateField = document.querySelector("#date");
  let monthField = document.querySelector("#month");
  let hourField = document.querySelector("#hour");
  let minuteField = document.querySelector("#minutes");
  let ampmField = document.querySelector("#ampm");

  console.log(
    "day",
    currentDay,
    "date",
    currentDate,
    "month",
    currentMonth,
    "hour",
    currentHour,
    "minutes",
    currentMinutes
  );

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  dayField.innerHTML = days[currentDay];
  dateField.innerHTML = currentDate;
  monthField.innerHTML = months[currentMonth];

  let formattedMinutes =
    currentMinutes < 10 ? `0${currentMinutes}` : currentMinutes;
  minuteField.innerHTML = formattedMinutes;

  if (currentHour > 12) {
    let hours12 = currentHour % 12;
    console.log("hours 12", hours12);
    hourField.innerHTML = hours12;
    ampmField.innerHTML = "pm";
  } else if (currentHour === 12) {
    hourField.innerHTML = currentHour;
    ampmField.innerHTML = "pm";
  } else {
    currentHour = currentHour === 0 ? 12 : currentHour;
    hourField.innerHTML = currentHour;
    ampmField.innerHTML = "am";
  }
}

function getForecast(response) {
  console.log("response.data", response.data);
  // Today High & Low
  let lowTempField = document.querySelector("#low-temp");
  let lowTemp = Math.round(response.data.daily[0].temperature.minimum);
  lowTempField.innerHTML = `⬇️ Low: ${lowTemp}°C`;
  let highTempField = document.querySelector("#high-temp");
  let highTemp = Math.round(response.data.daily[0].temperature.maximum);
  highTempField.innerHTML = `⬆️ High: ${highTemp}°C,`;

  // Forecast
  const forecastData = response.data.daily;

  let forecastHTML = "";

  forecastData.forEach(function (dayData, index) {
    if (index < 7 && index > 0) {
      let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      const date = new Date(dayData.time * 1000);
      const forecastFormattedDay = days[date.getDay()];
      const forecastFormattedDate = date.getDate();
      const forecastMinTemp = Math.round(dayData.temperature.minimum);
      const forecastMaxTemp = Math.round(dayData.temperature.maximum);
      const forecastIconURL = dayData.condition.icon_url;
      const forecastIconAltText = dayData.condition.icon;

      forecastHTML =
        forecastHTML +
        `
    <div class="forecast-column">
      <span class="forecast-day">${forecastFormattedDay}</span>
      <div class="forecast-date">${forecastFormattedDate}</div>
      <div class="forecast-icon">
        <img class="forecast-weather-icon" src=${forecastIconURL} alt=${forecastIconAltText} />
      </div>
      <div>
        <div>
          <span>H: </span>
          <span class="forecast-high">${forecastMaxTemp}</span>
          <span class="small-unit">°C</span>
        </div>
        <div>
          <span>L: </span>
          <span class="forecast-low">${forecastMinTemp}</span>
          <span class="small-unit">°C</span>
        </div>
      </div> 
    </div>
    `;

      let forecastArea = document.querySelector(".forecast-grid");
      forecastArea.innerHTML = forecastHTML;
    }
  });
}

searchCity("Canberra");
