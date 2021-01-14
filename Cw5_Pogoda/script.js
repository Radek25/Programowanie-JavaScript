const key = '37300b07121f5e169e690b82550938f4';

const LSkey = 'Miasta';
let CityArray = [];
CityArray.push(...GetFromLocalStorage());

const content = {city: null, country: null, temp: null, cloud: null, wind: null, id: null};

const contentbox = document.querySelector('#content');
const searchIcon = document.querySelector('.fas');

//Pobranie miasta z input text
function LocationFromUserInput(){
    return document.querySelector('#weatherLocation').value;
}

//Przycisk wyszukaj
searchIcon.addEventListener('click', TakeData);

//Wyszukaj Enter
let input = document.querySelector('#weatherLocation');
input.addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        searchIcon.click();
    }
});

function TakeData(){
    //Dane przekazywane do LS
    let id = new Date().getTime();
    let city = LocationFromUserInput();
    let data = {id: id, city: city};
    //Dodanie danych do tablicy
    CityArray.push(data);
    //Przekazanie tablicy do LS
    SetToLocalStorage();
    contentbox.innerHTML ='';
    CityArray.forEach(element => GetWeather(element));
    
}

CityArray.forEach(element => GetWeather(element));

function GetWeather(element){
    let weather = `https://api.openweathermap.org/data/2.5/weather?q=${element.city}&lang=pl&APPID=${key}`;

    fetch(weather)
        .then(function(response){
            let data = response.json();
            return data;
        })
        //Przypisanie informacji pogodowych
        .then(function(data){
            content.city = data.name;
            content.country = data.sys.country;
            content.temp = Math.floor((data.main.temp - 273.15), 2);
            content.cloud = data.clouds.all;
            content.wind = Math.floor(data.wind.speed);
            content.id = data.weather[0].icon;
            CreateDivWithInfo(element);
        });
}

function CreateDivWithInfo(element){
    const weatherbox = document.createElement('div');
    weatherbox.classList.add('weatherbox');
    contentbox.appendChild(weatherbox);

        
    //WeatherBox Elements
    let deleteButton = document.createElement('div');
    deleteButton.classList.add('deleteButton');
    weatherbox.appendChild(deleteButton);
    deleteButton.innerHTML = '<i class="far fa-times-circle"></i>';

    const location = document.createElement('div');
    location.classList.add('location');
    weatherbox.appendChild(location);
    location.innerHTML = content.city + ', ' + content.country;

    const temp = document.createElement('div');
    temp.classList.add('temp');
    weatherbox.appendChild(temp);
    temp.innerHTML = content.temp + ' &deg' + 'C';

    const icon = document.createElement('img');
    icon.classList.add('icon');
    icon.src =  `http://openweathermap.org/img/wn/${content.id}@2x.png`;
    weatherbox.appendChild(icon);

    const info = document.createElement('div');
    info.classList.add('info');
    weatherbox.appendChild(info);

    const cloud = document.createElement('div');
    cloud.classList.add('cloud');
    info.appendChild(cloud);
    cloud.innerHTML = '<i class="fas fa-cloud"></i>' + content.cloud + '%';

    const wind = document.createElement('div');
    wind.classList.add('wind');
    info.appendChild(wind);
    wind.innerHTML = '<i class="fas fa-wind"></i>' + content.wind + ' m/s';   

    deleteButton.addEventListener('click', function W() {
        weatherbox.remove();
        RemoveCityFromCityArray(element.id);
    });
}

function RemoveCityFromCityArray(id) {
    for (let index = 0; index < CityArray.length; index++) {
        if (CityArray[index].id == id) {
            CityArray.splice(index,1);
        }
    }
    SetToLocalStorage();
}

//Funkcje Local Storage
function SetToLocalStorage(){
    localStorage.setItem(LSkey, JSON.stringify(CityArray));
}
function GetFromLocalStorage(){
    const GetCity = localStorage.getItem(LSkey);
    if (GetCity) {
        return JSON.parse(GetCity);
    }
    return[];
}
