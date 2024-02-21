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

  function showCity(event) {
    event.preventDefault();
    let city = document.querySelector(".input").value;
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=a49f0cad903e09dc8e1t8o40aab88ab3&units=metric`;

    axios.get(apiUrl).then(showTemperature);
  }
  let cityShow = document.querySelector(".search-input");
  cityShow.addEventListener("submit", showCity);

  function showTemperature(response) {
    let city = (document.querySelector(".city").innerHTML = response.data.city);
    let input = document.querySelector(".input");

    let cityTemp = (document.querySelector(".temperature").innerHTML =
      Math.round(response.data.temperature.current));
  }
});
