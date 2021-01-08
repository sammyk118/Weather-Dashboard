var searchCity = $("search-city");
var searchBtn = $("#search-button");
var currTemp = $("#temperature");
var currHum = $("#humidity");
var currWind = $("#wind-speed");
var currUV = $(".uv-index");

var key = "dfaa5e58f81db9579a91fe56b2e69d8e";

var city = "";

function getCurrentWeather(city) {
    $("#city-name").text("Current Weather for: " + city);
    $("#temperature").text("test" + city);
    //var currURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + key;
    var currURL = "https://api.openweathermap.org/data/2.5/weather?q=London,uk" + "&APPID=" + key;
    var futureURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid="+key;
    $.ajax({
        url: currURL,
        method: "GET",
    }).then(function (response) {
        console.log(response);
        console.log(response.main.humidity);
        console.log(response.main.temp);
        console.log("wind: ", response.wind.speed);
        // (K − 273.15) × 9/5 + 32 
        var temp = Math.round(((response.main.temp - 273.15) * (9 / 5) + 32));
        console.log(temp);
        currTemp.text(temp);
        currHum.text(response.main.humidity);
        currWind.text(response.wind.speed);



    });
}
$("#search-button").on("click", function (event) {
    event.preventDefault();
    city = $(this).prev().val().trim();
    console.log("in the functiu");
    getCurrentWeather(city);
});

getCurrentWeather();