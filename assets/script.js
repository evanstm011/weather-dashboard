
//pseudocode:
//The app will come up with a search field where the user will enter the location and click 'search'
//start with 2 columns (3/9). First column is going to have a search box with "Search for a City:" and below it links to 8 largest cities in US. Austin TX, Chicago IL, New York NY, Orlando FL, San Francisco CA, Seattle WA, Denver CO, Atlanta GA.
//Searched location is added to the search history, which will add the city searched to the left column (append).
//When user clicks on location previously searched, they are presented with current and future conditions for that location. 
//The app then displays the current and future weather conditions: city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index (color indicative)
//the 2nd column is going to show the last search that was made by the user. 
//5 day forecast will have the following: date, an icon representation of weather conditions, the temperature, and the humidity

$(document).ready(function () {
    var cities = JSON.parse(localStorage.getItem("cities")) || []
    $("#submitCity").on("click", function (event) {
        event.preventDefault();
        var newCity = $("#city-input").val().trim();
        cities.push(newCity);
        localStorage.setItem("cities", JSON.stringify(cities));
        renderButtons();
        displayCityInfo(newCity);
    })

    function displayCityInfo(city) {

        console.log(city);
        var queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=13e9fbf6cdd1cefdcc71d3f155dfcdc7`;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            console.log(response);
        });
    }

    function getUVIndex(lat, lon) {
        $.ajax({
            type: "GET",
            url: `http://api.openweathermap.org/data/2.5/uvi?q=${city}&appid=13e9fbf6cdd1cefdcc71d3f155dfcdc7` + lat + "&lon-" + lon,
            dataType: "json",
        }.then(function (data) {
            var uv = $("<p>").text("UV Index: ");
            var btn = $("<span>").addClass("btn btn-sm").text(data.value);
            if (data.value < 3) {
                btn.addClass("btn-success");
            }
            else if (data.value < 7) {
                btn.addClass("btn-warning");
            }
            else {
                btn.addclass("btn-danger");
            }

            $("#today .card-body").append(uv.append(btn));

        }));
    }
    function renderButtons() {
        $("#cityHistory").empty();
        for (var i = 0; i < cities.length; i++) {
            var a = $("<li>");
            a.addClass("city");
            var cityButton = $("<button>");
            cityButton.addClass("btn rounded");
            cityButton.text(cities[i]);
            cityButton.on("click", function () {
                displayCityInfo($(this).text());

            })
            a.append(cityButton)
            $("#cityHistory").prepend(a);
        }
    }
    renderButtons();
})