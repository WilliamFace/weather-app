
// Global variables
var weatherApiKey = "APPID=b420e0ed43bc965c87b6eaff63e3bde8";
var weatherApiUrl = "http://api.openweathermap.org/data/2.5/weather?";
var tempCelcius = 0;
var tempFahrenheit = 0;
var x = document.getElementById("weather-location");
var finalWeatherApiUrl = "";

// Load in user location data
function userLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getLocation)

    } else {
        console.log("Geo location is not supported in your broswer");
    }
}

// !!!!IMPORTANT!!!!

// NEED TO ADD FUNCTIONALIY TO DYNAMICALLY INSERT IMAGE BASED ON data.weather[0].main value

function getWeather() {
    $.getJSON(finalWeatherApiUrl, function (data) {
        $.each(data.weather[0], function (key, value) {
            if(key == "main") {
                console.log(value);
            }
        })
    });
}



// Get & use user location
function getLocation(position) {
    finalWeatherApiUrl = weatherApiUrl + "lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&";
    finalWeatherApiUrl += weatherApiKey;
    $.getJSON(finalWeatherApiUrl, function (data) {
        $.each(data, function (key, value) {
            if(key == "name") {
                document.getElementById("weather-location").value = value;
            }
            tempCelcius = data.main.temp - 273.15;
            console.log(tempCelcius);
            getWeather();

        })
    });
}

// Unobtrusive click event

document.getElementById("try-me").addEventListener("click", userLocation);
