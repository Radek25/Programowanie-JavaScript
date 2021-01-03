const Container = document.querySelector('#container');
function CreateSnowBox() {
    const SnowBox = document.createElement('div');
    SnowBox.id = 'SnowBox';
    SnowBox.classList.add('SnowBox');
    Container.appendChild(SnowBox);
    return SnowBox;
}
function CreateSnowFlake(SnowBox) {
    const SnowFlakeContainer = document.createElement('div');
    SnowFlakeContainer.id = 'SnowFlakeContainer';
    SnowFlakeContainer.classList.add('SnowFlakeContainer');

    const SnowFlake = document.createElement('div');
    SnowFlake.id = 'SnowFlake';
    SnowFlake.classList.add('SnowFlake');
    
    SnowFlakeContainer.style.left = `${Math.random() *100}%`;

    SnowFlakeContainer.appendChild(SnowFlake);
    SnowBox.appendChild(SnowFlakeContainer);

    setTimeout(CreateSnowFlake, 300, SnowBox);
}
const SnowBox = CreateSnowBox();
CreateSnowFlake(SnowBox);

//COUNTER//
let date = new Date('Dec 24, 2021 00:00:00').getTime();
setInterval(() => {
    let now = new Date().getTime();
    let distance = date - now;
    
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    //Display value
    document.querySelector('#D').innerHTML = days;
    document.querySelector('#H').innerHTML = hours;
    document.querySelector('#M').innerHTML = minutes;
}, 1000);