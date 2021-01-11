const contentbox = document.querySelector('#content');
const searchIcon = document.querySelector('.fas');
let weatherCounter = 0;
searchIcon.addEventListener('click', function(){
    if (weatherCounter < 4) {
        const weatherbox = document.createElement('div');
        weatherbox.classList.add('weatherbox');
        contentbox.appendChild(weatherbox);
        weatherCounter++;

        //WeatherBox Elements
        const location = document.createElement('div');
        location.classList.add('location');
        weatherbox.appendChild(location);

        const temp = document.createElement('div');
        temp.classList.add('temp');
        weatherbox.appendChild(temp);

        const icon = document.createElement('div');
        icon.classList.add('icon');
        weatherbox.appendChild(icon);

        const info = document.createElement('div');
        info.classList.add('info');
        weatherbox.appendChild(info);

        const date = document.createElement('div');
        date.classList.add('date');
        weatherbox.appendChild(date);
    }
    else if (weatherCounter == 4){
        alert ('Zbyt wiele lokalizacji! Usuń nieużywane!');
    }
});


