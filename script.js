
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '2d06b7608cmshdf691fc939246dfp1b9e2djsn11688319ef99',
        'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
    }
};

const getWeather = (city) => {

    cityName.innerHTML = city;

    fetch('https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=' + city, options)
        .then(response => response.json())
        .then((response) => {
            console.log(response);

            cloud_pct.innerHTML = response.cloud_pct;
            // Check if response.temp exists before assigning to innerHTML
            if (response.temp) {
                temp.innerHTML = response.temp;
            } else {
                temp.innerHTML = "<small>Not Available</small>";
            }
            feels_like.innerHTML = response.feels_like;
            humidity.innerHTML = response.humidity;
            min_temp.innerHTML = response.min_temp;
            max_temp.innerHTML = response.max_temp;
            wind_speed.innerHTML = response.wind_speed;
            wind_degrees.innerHTML = response.wind_degrees;
            sunrise.innerHTML = response.sunrise;
            sunset.innerHTML = response.sunset;
        })
        .catch(err => console.error(err));

};

// Get user's current location
const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=32a6e52df330427d91fd8687dd51669d`)
                .then(response => response.json())
                .then((response) => {
                    const city = response.results[0].components.city;
                    getWeather(city);
                })
                .catch(err => console.error(err));
        });
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
};


submit.addEventListener("click", (e) => {
    e.preventDefault()
    getWeather(city.value)
})

// Get weather data for Delhi by default
// getWeather();

// Get weather data for the user's current location on page load
getLocation();


const getDate = () => {
    const date = new Date();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const day = days[date.getDay()];
    const year = date.getFullYear();
    const month = date.toLocaleString('default', { month: 'long' });
    const dateNum = date.getDate();
    return `${day}- ${month} ${dateNum}- ${year}`;
};

date.innerHTML = getDate();
