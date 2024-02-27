document.addEventListener("DOMContentLoaded", () => {
  let date = new Date();
  console.log(date);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  day = days[day];

  let hours = date.getHours();

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  } else {
    `${minutes}`;
  }

  let showDateTime = document.querySelector(".time");
  showDateTime.innerHTML = `${day} ${hours}:${minutes} `;

  function showCity(city) {
    let apiKey = "a49f0cad903e09dc8e1t8o40aab88ab3";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

    axios.get(apiUrl).then(showDetails);
  }

  function submitCity(event) {
    event, preventDefault();
    let searchInput = document.querySelector(".search-input");

    showCity(searchInput.value);
  }
  citySearchForm = document.querySelector(".search-input");
  citySearchForm.addEventListener("submit", showCity);

  function showDetails(response) {
    let city = (document.querySelector(".city").innerHTML = response.data.city);
    let input = document.querySelector(".input");

    let cityTemp = (document.querySelector(".temperature").innerHTML =
      Math.round(response.data.temperature.current));

    let description = (document.querySelector(".description").innerHTML =
      response.data.condition.description);
    let humidity = (document.querySelector(".humidity").innerHTML = Math.round(
      response.data.temperature.humidity
    ));
    let wind = (document.querySelector(".wind").innerHTML = Math.round(
      response.data.wind.speed
    ));
    let mainIcon = document.querySelector(".main-icon");
    mainIcon.setAttribute("src", response.data.condition.icon_url);
  }

  function displayForecast() {
    let forecastHtml = `<div class="row">`;
    let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
    days.forEach(function (day) {
      forecastHtml =
        forecastHtml +
        `
        <div class="weather-forecast m-4 p-3">
          <h3>${day}</h3>
          <img src="./weathericon.png" alt="weather icon" width="60px" />
          <p>5°<strong>22°</strong></p>
          </div>
          
          
      `;
      forecastHtml = forecastHtml + `</div>`;
    });
    let forecast = document.querySelector("#forecast");
    forecast.innerHTML = forecastHtml;
  }

  showCity("london");
  displayForecast();
});
