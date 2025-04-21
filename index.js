//API parameters
const apiKey = "2012f74f9da9d705a460adcbbd0c6442";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
let city = document.getElementById('city');
let humidity = document.getElementById('humidity-data');
let temperature = document.getElementById('windspeed-data');
let wind = document.getElementById('wind-data');


// Get the search input field
let searchInput = document.getElementById('search-input');

// Get the search search button
let searchButton = document.getElementById('search-btn');

// Get the weather container
let weatherIcon = document.getElementById('weather-icon');

//Get notification elements
let notification = document.getElementById('notification');

// Get the error message element
let errorMessage = document.querySelector(".error");

// Get the weather section element
let weatherSection = document.querySelector(".weather-section");


// Focus on the input field when the page loads
window.onload = function () {
    searchInput.focus();
    notification.style.visibility = "visible";
};



// Add an event listener to the input field to listen for the Enter key
searchInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        let inputedCity = searchInput.value;
        console.log(inputedCity)
        checkWeather(inputedCity);
    }
});
async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        console.log(response);

        if (!response.ok) {
            if (response.status === 404) {
                document.querySelector(".error").style.visibility = "visible";
                document.querySelector(".weather-section").style.visibility = "hidden";
                notification.style.visibility = "hidden";

            } else {
                console.error(`Error: Received status code ${response.status}`);
                console.log("An unexpected error occurred. Please try again later.");
            }
            return;
        }

        const data = await response.json();
        console.log(data);

        if (!data || !data.main || !data.weather || !data.wind) {
            console.error("Error: Invalid data structure received from API");
            console.log("Unexpected data format. Please try again later.");
            return;
        }

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity-data").innerHTML = data.main.humidity + "%";
        document.querySelector(".windspeed-data").innerHTML = data.wind.speed + "km/";
        document.querySelector(".weather-name").innerHTML =  data.weather[0].description;;

        if (data.weather[0].main === "Clouds") {
            weatherIcon.src = "images/cloud.svg";
        } else if (data.weather[0].main === "Clear") {
            weatherIcon.src = "images/clear.png";
        } else if (data.weather[0].main === "Rain") {
            weatherIcon.src = "images/rain.png";
        } else if (data.weather[0].main === "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
        } else if (data.weather[0].main === "Mist") {
            weatherIcon.src = "images/mist.png";
        }

        document.querySelector(".weather-section").style.visibility = "visible";
        document.querySelector(".error").style.visibility = "hidden";
        notification.style.visibility = "hidden";
        weatherSection.style.visibility = "visible";
        weatherSection.style.display = "block"; // Show the weather section
        searchInput.value = ""; // Clear the input field after fetching data
    
    } catch (error) {
        console.error("Error: Unable to fetch weather data", error);
        console.log("Failed to fetch weather data. Please check your internet connection and try again.");
    }
}

// Add an event listener to the search button
searchButton.addEventListener("click", function () {
    let inputedCity = searchInput.value;
    console.log(inputedCity)
    checkWeather(inputedCity);
})




// if (data.weather[0].main === "Clouds") {
//     weatherIcon.innerHTML = "images/cloud.svg";
// } else if (data.weather[0].main === "Clear") {
//     weatherIcon.innerHTML = "images/clear sun.svg";
// } else if (data.weather[0].main === "Rain") {
//     weatherIcon.innerHTML = "images/rain.svg";
// } else if (data.weather[0].main === "Drizzle") {
//     weatherIcon.innerHTML = "images/drizzle.svg";
// } else if (data.weather[0].main === "Mist") {
//     weatherIcon.innerHTML = "images/mist.svg";
// }