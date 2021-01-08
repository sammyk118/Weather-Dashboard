var searchCity = $("search-city");
var searchBtn = $("#search-button");
var currTemp = $("#temperature");
var currHum = $("#humidity");
var currWind = $("#wind-speed");
var currUV = $("#uv-index");

var key = "dfaa5e58f81db9579a91fe56b2e69d8e";

var city = "";

function getCurrentWeather(city) {
    $("#city-name").text("Current Weather for: " + city);
    var currURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + key;
    // var currURL = "https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=" + key;
     var futureURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + key;
    // var futureURL = "https://api.openweathermap.org/data/2.5/forecast?q=London,uk&appid=" + key;
    
    $.ajax({
        url: currURL,
        method: "GET",
    }).then(function (response) {
        // (K − 273.15) × 9/5 + 32 
        var temp = Math.round(((response.main.temp - 273.15) * (9 / 5) + 32));
        currTemp.text(temp);
        currHum.text(response.main.humidity);
        currWind.text(response.wind.speed);

        var lat = response.coord.lat;
        var lon = response.coord.lon;
        var uvURL="https://api.openweathermap.org/data/2.5/uvi?appid="+ key + "&lat=" + lat + "&lon="+lon;
        
        $.ajax({
            url: uvURL,
            method: "GET",
        }).then(function (response) {
            currUV.text(response.value);
        })
    });

    $.ajax({
        url: futureURL,
        method: "GET",
    }).then(function (response) {
        console.log(response);
        dayNum = 0;
        for (i = 0; i < response.list.length; i++){
            if (response.list[i].dt_txt.split(" ")[1] == "12:00:00") {
                $("#date" + dayNum).text(response.list[i].dt_txt.split(" ")[0]);
                var temp = Math.round(((response.list[i].main.temp - 273.15) * (9 / 5) + 32));
                $("#temp" + dayNum).text(temp);
                $("#humidity" + dayNum).text(response.list[i].main.humidity);
                console.log(response.list[i].main.humidity);
                dayNum++;
            }
            

                    
        }
    })
}
$("#search-button").on("click", function (event) {
    event.preventDefault();
    city = $(this).prev().val().trim();
    console.log("in the function");
    getCurrentWeather(city);
});
