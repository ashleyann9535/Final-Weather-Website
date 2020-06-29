function updateDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
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
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function displayTemp(response) {
  console.log(response.data);
  let cityTemp = document.querySelector("#degrees");
  let degrees = Math.round(response.data.main.temp);
  let cityElement = document.querySelector("#city");
  let maxTempElement = document.querySelector("#maxTemp");
  let maxTemp = Math.round(response.data.main.temp_max);
  let minTempElement = document.querySelector("#minTemp");
  let minTemp = Math.round(response.data.main.temp_min);
  let feelsLikeElement = document.querySelector("#feelsLike");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#windSpeed");
  let dateElement = document.querySelector("#date");

  cityTemp.innerHTML = `${degrees}°`;
  cityElement.innerHTML = response.data.name;
  maxTempElement.innerHTML = `${maxTemp}°`;
  minTempElement.innerHTML = `${minTemp}°`;
  feelsLikeElement.innerHTML = Math.round(response.data.main.feels_like);
  humidityElement.innerHTML = response.data.main.humidity;
  windSpeedElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = updateDate(response.data.dt * 1000);
}

function search(city) {
  let apiKey = "d26daee782ed7569b86130dfdffeb3ee";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayTemp);
}

function formSubmit(event) {
  event.preventDefault();
  let citySearchElement = document.querySelector("#citySearch");
  search(citySearchElement.value);
}

let form = document.querySelector("#searchForm");
form.addEventListener("submit", formSubmit);

search("Chicago");
