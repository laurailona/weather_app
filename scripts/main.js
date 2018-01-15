$(document).ready(function() {
  const cityDisplay = document.getElementById("city-name");
  const weatherDisplay = document.getElementById("weather");
  const iconDisplay = document.getElementById("weather-icon");
  const content = document.getElementById("content");

  let weather;
  let temperature;
  let humidity;
  let city;
  let iconUrl;

  if ("geolocation" in navigator) {
      /* geolocation is available */
      navigator.geolocation.getCurrentPosition(function(position) {
          let latitude = position.coords.latitude;
          let longitude = position.coords.longitude;
          let url = "https://fcc-weather-api.glitch.me/api/current?lat=" + latitude + "&lon=" + longitude;
          $.getJSON(url, function(data) {
            console.log(data);
            weather = data.weather[0].main;
            temperature = data.main.temp;
            humidity = data.main.humidity;
            city = data.name;
            iconUrl = data.weather[0].icon;
            console.log("You are currently in " + city);
            console.log("WEATHER: " + weather + ", TEMPERATURE: " + temperature + ", HUMIDITY: " + humidity);

            content.classList.add("fadein");
            cityDisplay.textContent = city;
            weatherDisplay.textContent = "WEATHER: " + weather + ", TEMPERATURE: " + temperature + "°C, HUMIDITY: " + humidity + "%";
            iconDisplay.setAttribute("src", iconUrl);
        });
      });
  } 
  else {
      /* geolocation IS NOT available */
  }

});


