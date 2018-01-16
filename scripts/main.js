$(document).ready(function() {
  const cityDisplay = document.getElementById("city-name");
  const weatherDisplay = document.getElementById("weather");
  const iconDisplay = document.getElementById("weather-icon");
  const content = document.getElementById("content");
  const fahrenheitToggle = document.getElementById("fahrenheit-toggle");
  const fahrenheitText = document.getElementById("fahrenheit");
  const celsiusText = document.getElementById("celsius");

  let weather;
  let temperature;
  let humidity;
  let city;
  let iconUrl;
  let isFahrenheit = false;

  if ("geolocation" in navigator) {
      /* geolocation is available */
      navigator.geolocation.getCurrentPosition(function(position) {
          let latitude = position.coords.latitude;
          let longitude = position.coords.longitude;
          let url = "https://fcc-weather-api.glitch.me/api/current?lat=" + latitude + "&lon=" + longitude;
          $.getJSON(url, function(data) {
            console.log(data);
            weather = data.weather[0].description;
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

            let temperatureFahrenheit = temperature * 1.8 + 32; 
            function convertTemperature() {
              switch(isFahrenheit) {
                case false:
                weatherDisplay.textContent = "WEATHER: " + weather + ", TEMPERATURE: " + temperatureFahrenheit + "°C, HUMIDITY: " + humidity + "%";
                fahrenheitText.setAttribute("style", "color: #2196F3");
                celsiusText.setAttribute("style", "color: #fff");
                isFahrenheit = true;
                break;
                case true:
                weatherDisplay.textContent = "WEATHER: " + weather + ", TEMPERATURE: " + temperature + "°C, HUMIDITY: " + humidity + "%";
                celsiusText.setAttribute("style", "color: #2196F3");
                fahrenheitText.setAttribute("style", "color: #fff");
                isFahrenheit = false;
                break;
              };
            };
            fahrenheitToggle.addEventListener("change", convertTemperature);

        });
      });
  } 
  else {
      /* geolocation IS NOT available */
      content.classList.add("fadein");
      cityDisplay.textContent = "You need to allow acces to your location for this app to work.";
  }

});


