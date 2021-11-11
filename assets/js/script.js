let citySearchInputEl = "#search-btn";
// fetch weather information 

let getCityWeather = function(cityName){
    // execute a current weather get request from open weather api
    let apiKey = "4ac5ffd5c7ed9414f0435b0f9c15caa7";
    let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=detroit&appid="+apiKey;

    //make request to url 
    fetch(apiUrl);
};
