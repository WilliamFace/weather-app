// VARIABLES

    // Global variables

    var weatherApiKey = "APPID=b420e0ed43bc965c87b6eaff63e3bde8";
    var weatherApiUrl = "http://api.openweathermap.org/data/2.5/weather?";
    var tempCelcius = 0;
    var tempFahrenheit = 0;
    var weatherType = "";
    var finalWeatherApiUrl = "";

// OBJECTS

    var localWeather = {};


// EVENT LISTENERS

document.getElementById("try-me").addEventListener("click", userLocation);


// FUNCTIONS

    // Core functions

    function userLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getLocation)
        } else {
            console.log("Geo location is not supported in your broswer");
        }

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


    // Updating global variables

    function setWeatherData() {
        tempCelcius = localWeather.main.temp - 273.15;
        tempFahrenheit = tempCelcius * 1.8 + 32;
        weatherType = localWeather.weather[0].main;
    }

    // Update Location field with Name of locaiton

    function updateLocation() {
        document.getElementById("weather-location").value = localWeather.name;
    }

    
