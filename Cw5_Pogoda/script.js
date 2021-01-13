const key = '37300b07121f5e169e690b82550938f4';

const LSkey = 'Miasta';
let CityArray = [];
CityArray.push(...GetFromLocalStorage());

const content = {city: null, country: null, temp: null, cloud: null, wind: null,};

const contentbox = document.querySelector('#content');
const searchIcon = document.querySelector('.fas');

//Pobranie miasta z input text
function LocationFromUserInput(){
    return document.querySelector('#weatherLocation').value;
}

//Przycisk wyszukaj
searchIcon.addEventListener('click', TakeData);

function TakeData(){
    CityArray.push(LocationFromUserInput());
    SetToLocalStorage();
    contentbox.innerHTML ='';
    CityArray.forEach(element => GetWeather(element));
}

CityArray.forEach(element => GetWeather(element));

function GetWeather(element){

    console.log(element);
    let weather = `https://api.openweathermap.org/data/2.5/weather?q=${element}&lang=pl&APPID=${key}`;

    fetch(weather)
        .then(function(response){
            let data = response.json();
            return data;
        })
        //Przypisanie informacji pogodowych
        .then(function(data){
            console.log(data);
            content.city = data.name;
            content.country = data.sys.country;
            content.temp = Math.floor((data.main.temp - 273.15), 2);
            content.cloud = data.clouds.all;
            content.wind = data.wind.speed;
            CreateDivWithInfo();
        });
}

function CreateDivWithInfo(){
    const weatherbox = document.createElement('div');
    weatherbox.classList.add('weatherbox');
    contentbox.appendChild(weatherbox);

        
    //WeatherBox Elements
    const location = document.createElement('div');
    location.classList.add('location');
    weatherbox.appendChild(location);
    location.innerHTML = content.city + ', ' + content.country;

    const temp = document.createElement('div');
    temp.classList.add('temp');
    weatherbox.appendChild(temp);
    temp.innerHTML = content.temp + ' &deg' + 'C';

    const icon = document.createElement('div');
    icon.classList.add('icon');
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

    const date = document.createElement('div');
    date.classList.add('date');
    weatherbox.appendChild(date);
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