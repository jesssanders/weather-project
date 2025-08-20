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
  cityField.innerHTML = response.data.city;
  let countryField = document.querySelector("#country");
  countryField.innerHTML = response.data.country;
  let weatherIconField = document.querySelector("#weather-icon");
  let weatherIcon = response.data.condition.icon_url;
  let weatherIconAltText = response.data.condition.icon;
  weatherIconField.innerHTML = `<img src=${weatherIcon} alt=${weatherIconAltText} />`;
  let statusField = document.querySelector("#status");
  statusField.innerHTML = response.data.condition.description;
  let humidityField = document.querySelector("#humidity-number");
  humidityField.innerHTML = response.data.temperature.humidity;
  let windField = document.querySelector("#wind-number");
  windField.innerHTML = Math.round(response.data.wind.speed);
  let temperatureField = document.querySelector("#temperature");
  temperatureField.innerHTML = Math.round(response.data.temperature.current);
  let feelsLikeField = document.querySelector("#feels-like-number");
  feelsLikeField.innerHTML = Math.round(response.data.temperature.feels_like);
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
  let lowTempField = document.querySelector("#low-temp-number");
  lowTempField.innerHTML = Math.round(
    response.data.daily[0].temperature.minimum
  );
  let highTempField = document.querySelector("#high-temp-number");
  highTempField.innerHTML = Math.round(
    response.data.daily[0].temperature.maximum
  );

  // Forecast
  const forecastData = response.data.daily;

  forecastData.forEach((dayData, index) => {
    const dayElement = document.querySelector(`#day${index + 1}`);
    const dateElement = document.querySelector(`#day${index + 1}Date`);
    const minElement = document.querySelector(`#day${index + 1}Low`);
    const maxElement = document.querySelector(`#day${index + 1}High`);
    const iconElement = document.querySelector(`#day${index + 1}Icon`);
    const iconURL = dayData.condition.icon_url;
    const iconAltText = dayData.condition.icon;

    const date = new Date();
    date.setDate(date.getDate() + index);
    const formattedDay = date.toLocaleDateString("en-AU", {
      weekday: "short",
    });
    const formattedDate = date.toLocaleDateString("en-AU", {
      day: "numeric",
    });
    const minTemp = Math.round(dayData.temperature.minimum);
    const maxTemp = Math.round(dayData.temperature.maximum);
    const icon = `<img class="forecast-weather-icon" src=${iconURL} alt=${iconAltText} />`;

    if (index === 0) {
      dayElement.innerHTML = "Today";
      dateElement.innerHTML = formattedDate;
      minElement.innerHTML = minTemp;
      maxElement.innerHTML = maxTemp;
      iconElement.innerHTML = icon;
    } else {
      dayElement.innerHTML = formattedDay;
      dateElement.innerHTML = formattedDate;
      minElement.innerHTML = minTemp;
      maxElement.innerHTML = maxTemp;
      iconElement.innerHTML = icon;
    }
  });
}

searchCity("Canberra");
