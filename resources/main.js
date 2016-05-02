// VARIABLES

    // Global variables

    var weatherApiKey = "APPID=b420e0ed43bc965c87b6eaff63e3bde8";
    var weatherApiUrl = "http://api.openweathermap.org/data/2.5/weather?";
    var tempCelcius = 0;
    var tempFahrenheit = 0;
    var weatherType = "";
    var finalWeatherApiUrl = "";

// Array

var weatherMainArr = {
    sunny: "ion-ios-sunny",
    cloudy: "ion-ios-cloudy",
    rainy: "ion-ios-rainy",
    thunderstorm: "thunderstorm",
    snow: "ion-ios-snowy"
};


// OBJECTS

    var localWeather = {};


// EVENT LISTENERS

document.getElementById("try-me").addEventListener("click", userLocation);



// FUNCTIONS

    // Updating global variables

    function setWeatherData() {
        tempCelcius = localWeather.main.temp - 273.15;
        tempFahrenheit = tempCelcius * 1.8 + 32;
        weatherType = localWeather.weather[0].main;
    }

    // Core functionality

    function userLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getLocation)
            window.onload = updateLocation();

        } else {
            console.log("Geo location is not supported in your broswer");
        }

    }

    function updateLocation() {
        document.getElementById("location-name").innerHTML = localWeather.name;
        document.getElementById("weather-icon").setAttribute("class", weatherMainArr.cloudy);
    }

    function getLocation(position) {
        finalWeatherApiUrl = weatherApiUrl + "lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&";
        finalWeatherApiUrl += weatherApiKey;
        $.getJSON(finalWeatherApiUrl, function (data) {
            localWeather = data;
            setWeatherData();
            updateLocation();
        });
    }
