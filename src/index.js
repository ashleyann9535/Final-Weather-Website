function updateDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${formatTime(timestamp)}`;
}

function formatTime(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function displayTemp(response) {
  console.log(response.data);
  let cityTemp = document.querySelector("#degrees");
  let cityElement = document.querySelector("#city");
  let maxTempElement = document.querySelector("#maxTemp");
  let maxTemp = Math.round(response.data.main.temp_max);
  let minTempElement = document.querySelector("#minTemp");
  let minTemp = Math.round(response.data.main.temp_min);
  let feelsLikeElement = document.querySelector("#feelsLike");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#windSpeed");
  let dateElement = document.querySelector("#date");

  degrees = Math.round(response.data.main.temp);

  cityTemp.innerHTML = `${degrees}°`;
  cityElement.innerHTML = response.data.name;
  maxTempElement.innerHTML = `${maxTemp}°`;
  minTempElement.innerHTML = `${minTemp}°`;
  feelsLikeElement.innerHTML = Math.round(response.data.main.feels_like);
  humidityElement.innerHTML = response.data.main.humidity;
  windSpeedElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = updateDate(response.data.dt * 1000);
}

function dispalyHourForecast(response) {
  let hourlyForecastElement = document.querySelector("#hourlyForecast");
  hourlyForecast = null;
  hourlyForecastElement.innerHTML = null;

  for (let index = 0; index < 3; index++) {
    hourlyForecast = response.data.list[index];
    hourlyForecastElement.innerHTML += `<div class="row-cols-3"> <div class="col-2"> <div class="card" id="hourlyForecast" style="width: 6rem;">
          <i class="fas fa-cloud-sun"></i>
          <div class="card-body">
          <h5 class="card-title" id="hourlyTemp"> ${Math.round(
            hourlyForecast.main.temp
          )}</h5>
          <p class="card-text" id="hourlyTemp"> ${formatTime(
            hourlyForecast.dt * 1000
          )}
           </p>
      </div> 
      </div>
      </div>`;
  }
}

function search(city) {
  let apiKey = "d26daee782ed7569b86130dfdffeb3ee";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayTemp);

  apiUrlOne = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrlOne).then(dispalyHourForecast);
}

function formSubmit(event) {
  event.preventDefault();
  let citySearchElement = document.querySelector("#citySearch");
  search(citySearchElement.value);
}

function displayCelsius(event) {
  event.preventDefault();
  let degreesElement = document.querySelector("#degrees");
  linkC.classList.remove("inactive");
  linkF.classList.add("inactive");
  let tempC = Math.round((degrees - 32) * (5 / 9));
  degreesElement.innerHTML = `${tempC}°`;
}

function displayFahrenheit(event) {
  event.preventDefault();
  let degreesElement = document.querySelector("#degrees");
  linkF.classList.remove("inactive");
  linkC.classList.add("inactive");
  degreesElement.innerHTML = `${degrees}°`;
}

let form = document.querySelector("#searchForm");
form.addEventListener("submit", formSubmit);

let linkC = document.querySelector("#linkC");
linkC.addEventListener("click", displayCelsius);

let linkF = document.querySelector("#linkF");
linkF.addEventListener("click", displayFahrenheit);

let degrees = null;

search("Chicago");
