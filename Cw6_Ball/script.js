let playGround = document.querySelector('#playground');

let hole = document.createElement('div');
hole.classList.add('hole');
playGround.appendChild(hole);

function GetRandomFromToX(min, max) {
    min = Math.ceil(15);
    max = Math.floor(90);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function GetRandomFromToY(min, max) {
    min = Math.ceil(5);
    max = Math.floor(85);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let a = GetRandomFromToX();
let b = GetRandomFromToY();
hole.style.top = a +'vh';
hole.style.left = b +'vw';


//Akcelelator
function onSuccess(acceleration) {
    alert('Acceleration X: ' + acceleration.x + '\n' +
          'Acceleration Y: ' + acceleration.y + '\n' +
          'Acceleration Z: ' + acceleration.z + '\n' +
          'Timestamp: '      + acceleration.timestamp + '\n');
};

function onError() {
    alert('onError!');
};

var options = { frequency: 3000 };  // Update every 3 seconds

let watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
console.log(watchID);