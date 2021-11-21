let searchFormEl = document.querySelector("#city-search-form");
let searchInputEl = document.querySelector("#city-input");
let currentWeatherEl = document.querySelector("#current-weather-container");
let fiveDayForcastEl = document.querySelector("#five-day-forecast");

// weather api key
let apiKey = "4ac5ffd5c7ed9414f0435b0f9c15caa7";

// fetch weather information 
let getCityWeather = function(cityName){
    // execute a current weather get request from open weather api
    let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="+ cityName +"&units=imperial&appid=" + apiKey;

    //make request to url 
    fetch(apiUrl)
    .then(function(response){
        response.json().then(function(data){
             // call lat and long api
            let latitude = data.coord.lat;
            let longitude = data.coord.lon;
            let uvApiUrl =  "https://api.openweathermap.org/data/2.5/onecall?lat="+ latitude +"&lon="+ longitude +"&units=imperial&exclude=minutely,hourly,alerts&appid="+apiKey
            console.log(uvApiUrl);
            fetch(uvApiUrl)
            .then(function(response){
                response.json().then(function(data){
                    displayCurrentWeather(data,cityName);
                    displayForecastWeather(data,cityName);
                });
            });
        });
    });
};

// search button function 
let formSubmitHandler = function(event){
    event.preventDefault();
    let city = searchInputEl.value.trim();

    if(city){
        getCityWeather(city);
        searchInputEl.value = "";
    } else {
        alert("Please Enter a city");
    }
};

// display current weather
let displayCurrentWeather = function(currentWeather, searchCity){
    console.log(currentWeather);
    console.log(searchCity);
    currentWeatherEl.textContent = "";

    // create city name 
    let currentCityNameEl = document.createElement("h2");
    currentCityNameEl.textContent = searchCity +" ";
    currentCityNameEl.id = "current-city-name";
    let todaysdate = document.createElement("span");
    todaysdate.textContent = moment().format("l");
    currentWeatherEl.appendChild(currentCityNameEl);
    currentCityNameEl.appendChild(todaysdate);

    // create weather icon 
    let weatherIconCode = currentWeather.current.weather[0].icon;
    let weatherIconUrl = "https://openweathermap.org/img/wn/"+ weatherIconCode +"@2x.png";
    let currentWeatherIcon = document.createElement("img");
    currentWeatherIcon.src = weatherIconUrl;
    currentWeatherIcon.id = "current-weather-icon"
    currentCityNameEl.appendChild(currentWeatherIcon);

    //create temperature 
    let currentWeatherTempText = document.createElement("p");
    currentWeatherTempText.textContent = "Temp: ";
    currentWeatherTempText.className = "current-weather-text";
    let currentWeatherTemp = document.createElement("span");
    currentWeatherTemp.textContent = currentWeather.current.temp + "\u00B0";
    currentWeatherTemp.className = "current-weather-text";
    currentWeatherEl.appendChild(currentWeatherTempText);
    currentWeatherTempText.appendChild(currentWeatherTemp);

    //create wind 
    let currentWindSpeedText = document.createElement ("p");
    currentWindSpeedText.textContent = "Wind: ";
    currentWindSpeedText.className = "current-weather-text";
    let currentWindSpeed = document.createElement("span");
    currentWindSpeed.textContent = currentWeather.current.wind_speed + " MPH";
    currentWindSpeed.className = "current-weather-text";
    currentWeatherEl.appendChild(currentWindSpeedText);
    currentWindSpeedText.appendChild(currentWindSpeed);
    
    //create humidity
    let currentHumidityText = document.createElement ("p");
    currentHumidityText.textContent = "Humidity: ";
    currentHumidityText.className = "current-weather-text";
    let currentHumidity = document.createElement("span");
    currentHumidity.textContent = currentWeather.current.humidity + "%";
    currentWeatherEl.appendChild(currentHumidityText);
    currentHumidityText.appendChild(currentHumidity);
    
   // create UV index 
    let currentUvIndexText = document.createElement("p");
    currentUvIndexText.textContent = "UV Index: ";
    currentUvIndexText.className = "current-weather-text";
    let currentUvIndex = document.createElement("span");
    currentUvIndex.textContent = currentWeather.current.uvi;
    currentWeatherEl.appendChild(currentUvIndexText);
    currentUvIndexText.appendChild(currentUvIndex);
        if(currentUvIndex = 0 && currentUvIndex <= 2){
            currentUvIndex.id = "low-uv-index";
        } else if (currentUvIndex >= 3 && currentUvIndex <= 5){
            currentUvIndex.id = "moderate-uv-index";
        } else if (currentUvIndex >= 6){
            currentUvIndex.id = "high-uv-index";
        }
}
let displayForecastWeather = function(currentWeather, searchCity){
    fiveDayForcastEl.textContent = "";

    console.log(currentWeather.daily.length);

    let forecastElText = document.createElement("h3");
        forecastElText.textContent = "5-Day Forecast";
        fiveDayForcastEl.prepend(forecastElText);


    for(let i = 0; i < (currentWeather.daily.length - 3); i++){
            // day one forecast 
        let dayOneForecastCardSize = document.createElement("div");
            dayOneForecastCardSize.className = "col-2"
            fiveDayForcastEl.appendChild(dayOneForecastCardSize);

        let dayOneForecastCard = document.createElement("div");
            dayOneForecastCard.className = "card";
            dayOneForecastCardSize.appendChild(dayOneForecastCard);

        let dayOneForecastCardBody = document.createElement("div");
            dayOneForecastCardBody.className = "card-body";
            dayOneForecastCard.appendChild(dayOneForecastCardBody);

        let dayOneForecastDate = document.createElement("h4");
            dayOneForecastDate.textContent = moment().add(1,'d').format("l");
            dayOneForecastDate.className = "card-title";
            dayOneForecastCardBody.appendChild(dayOneForecastDate);

        let weatherIconCode = currentWeather.daily[i].weather[0].icon;
        let weatherIconUrl = "https://openweathermap.org/img/wn/"+ weatherIconCode +"@2x.png";
        let dayOneForecastIcon = document.createElement("img");
            dayOneForecastIcon.src = weatherIconUrl;
            dayOneForecastIcon.id = "forecast-weather-icon"
            dayOneForecastCardBody.appendChild(dayOneForecastIcon);

        let dayOneForecastTemp = document.createElement("p");
            dayOneForecastTemp.textContent = "Temp: " + currentWeather.daily[i].temp.day;
            dayOneForecastTemp.id = "forecast-temp";
            dayOneForecastCardBody.appendChild(dayOneForecastTemp);

        let dayOneForecastWind = document.createElement("p");
            dayOneForecastWind.textContent = "Wind: " + currentWeather.daily[i].wind_speed + " MPH";
            dayOneForecastWind.id = "forecast-wind";
            dayOneForecastCardBody.appendChild(dayOneForecastWind);

        let dayOneForecastHumidity = document.createElement("p");
            dayOneForecastHumidity.textContent = "Humidty: " + currentWeather.daily[i].humidity + "%";
            dayOneForecastHumidity.id = "forecast-humidity";
            dayOneForecastCardBody.appendChild(dayOneForecastHumidity) 
    }
};
searchFormEl.addEventListener("submit", formSubmitHandler);
