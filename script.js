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

  axios.get(currentWeatherAPIURL).then(getWeather);
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

searchCity("Canberra");
