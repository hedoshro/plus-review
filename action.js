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

    getForecast(response.data.city);
  }

  function getForecast(city) {
    let apiKey = "a49f0cad903e09dc8e1t8o40aab88ab3";
    let apiUrlForecast = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
    axios.get(apiUrlForecast).then(displayForecast);
  }

  function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[date.getDay()];
  }

  function displayForecast(response) {
    console.log(response);
    let forecastHtml = `<div class="row">`;
    let dailyForecast = response.data.daily;
    dailyForecast.forEach(function (day, index) {
      if (index < 5) {
        forecastHtml =
          forecastHtml +
          `
        <div class="weather-forecast m-4 p-4">
          <h3>${formatDay(day.time)}</h3>
          <img src="${day.condition.icon_url}"alt="weather icon" width="60px" />
          <p>${Math.round(
            day.temperature.minimum
          )}°<strong class="p-2">${Math.round(
            day.temperature.maximum
          )}°</strong></p>
          </div>
          
          
      `;
        forecastHtml = forecastHtml + `</div>`;
      }
    });
    let forecast = document.querySelector("#forecast");
    forecast.innerHTML = forecastHtml;
  }

  showCity("london");
});
