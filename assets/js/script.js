let searchFormEl = document.querySelector("#city-search-form");
let searchInputEl = document.querySelector("#city-input");
// fetch weather information 

let getCityWeather = function(cityName){
    // execute a current weather get request from open weather api
    let apiKey = "4ac5ffd5c7ed9414f0435b0f9c15caa7";
    let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="+ cityName +"&appid=" + apiKey;

    //make request to url 
    fetch(apiUrl)
    .then(function(response){
        response.json().then(function(data){
            console.log(data);
        });
    });
};

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

searchFormEl.addEventListener("submit", formSubmitHandler);