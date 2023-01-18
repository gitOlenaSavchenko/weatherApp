function showDate() {
  let date = new Date();
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
  let hour = [date.getHours()];
  let minutes = [date.getMinutes()];
  if (minutes < 9) {
    minutes = `0${minutes}`;
  }
  if (hour < 9) {
    hour = `0${hour}`;
  }
  let time = `${day}, ${hour}:${minutes}`;
  let dateHeading = document.querySelector("#date");
  dateHeading.innerHTML = `${time}`;
}

function showCityWeather(event) {
  event.preventDefault();
  let city = document.querySelector("#search").value;
  let apiKey = "b9ba0314a93083136d968577c718e31d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  function showTemperature(response) {
    document.querySelector("#temperature").innerHTML = Math.round(
      response.data.main.temp
    );
    document.querySelector("#description").innerHTML =
      response.data.weather[0].description;
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind").innerHTML = Math.round(
      response.data.wind.speed
    );
  }
  axios.get(apiUrl).then(showTemperature);
}
let cityWeatherSearch = document.querySelector(".input-group");
cityWeatherSearch.addEventListener("submit", showCityWeather);

function showLocalWeather() {
  function showLocalTemperature(response) {
    document.querySelector("#temperature").innerHTML = Math.round(
      response.data.main.temp
    );
    document.querySelector("#description").innerHTML =
      response.data.weather[0].description;
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind").innerHTML = Math.round(
      response.data.wind.speed
    );
  }
  function showPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    console.log(lat);
    console.log(lon);
    let apiKey = "b9ba0314a93083136d968577c718e31d";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showLocalTemperature);
  }
  navigator.geolocation.getCurrentPosition(showPosition);
  showDate();
}

let localWeatherCheck = document.querySelector("#button-local");
localWeatherCheck.addEventListener("click", showLocalWeather);
showDate();
showLocalWeather();
