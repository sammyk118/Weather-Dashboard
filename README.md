# 06 server-Side APIs: Weather Dashboard

This project is about creating a webpage that lets you search for a location, and view the weather data such as current temperature, uv index, or weather forcasts, for that location. Then, your search is saved in a list of locally stored locations that you can access again.

## Technologies used

- HTML
- CSS
- Javascript
- OpenWeatherMap API
- Bootstrap
- JQuery
- Git
- GitHub

[Website](https://sammyk118.github.io/Weather-Dashboard/)

## Features

- a search form that takes a city name, and does multiple API searches to get the relevant information

* current weather data

```javascript
    $.ajax({
        url: currURL,
        method: "GET",
    }).then(function (response) {
        // (K − 273.15) × 9/5 + 32
        var temp = Math.round(((response.main.temp - 273.15) * (9 / 5) + 32));
        currTemp.text(temp);
        currHum.text(response.main.humidity);
        currWind.text(response.wind.speed);
```

- UV data

```javascript
var lat = response.coord.lat;
var lon = response.coord.lon;
var uvURL =
  "https://api.openweathermap.org/data/2.5/uvi?appid=" +
  key +
  "&lat=" +
  lat +
  "&lon=" +
  lon;

$.ajax({
  url: uvURL,
  method: "GET",
}).then(function (response) {
  currUV.text(response.value);
});
```

* Future weather data

```javascript
        dayNum = 0;
        for (i = 0; i < response.list.length; i++){
            //only gets data from noon of each day
            if (response.list[i].dt_txt.split(" ")[1] == "12:00:00") {
                $("#date" + dayNum).text(response.list[i].dt_txt.split(" ")[0]);
                var temp = Math.round(((response.list[i].main.temp - 273.15) * (9 / 5) + 32));
                $("#temp" + dayNum).text(temp);
                $("#humidity" + dayNum).text(response.list[i].main.humidity);
                console.log(response.list[i].main.humidity);
                dayNum++;
            }
```

* post-midnight additions:
local storage for the search history, and a changing uv-index background.

## Author

**Sammy Kroner**

[LinkedIn](www.linkedin.com/in/samuel-kroner-44aa11169)

[GitHub](https://github.com/sammyk118)

## Acknowledgements

UC Berkeley Extension program
