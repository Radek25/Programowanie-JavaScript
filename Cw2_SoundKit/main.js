//1. Obsługa soundbox.
const keys = [
    { keyCode: 81, src: 'sounds/kick.wav', txt: 'KICK', txt2: 'Press Q' },
    { keyCode: 87, src: 'sounds/tom.wav', txt: 'TOM', txt2: ' Press W' },
    { keyCode: 69, src: 'sounds/snare.wav', txt: 'SNARE', txt2: 'Press E' },
    { keyCode: 82, src: 'sounds/hihat.wav', txt: 'HITHAT', txt2: 'Press R' },
    { keyCode: 84, src: 'sounds/openhat.wav', txt: 'OHITHAT', txt2: 'Press T' },
    { keyCode: 89, src: 'sounds/ride.wav', txt: 'RIDE', txt2: 'Press Y' },
    { keyCode: 85, src: 'sounds/boom.wav', txt: 'BOOM', txt2: 'Press U' },
    { keyCode: 73, src: 'sounds/tink.wav', txt: 'TINK', txt2: 'Press I' },
    { keyCode: 79, src: 'sounds/clap.wav', txt: 'CLAP', txt2: 'Press O' },
];
const parent = document.getElementById('bitboxsquare');
keys.forEach((element, index) => {
    const newDiv = document.createElement('div');
    newDiv.classList.add('elements');
    const audio = document.createElement('audio');
    audio.setAttribute('src', element.src);
    const text = document.createElement('span');
    const text2 = document.createElement('small');
    text.innerText = element.txt;
    text2.innerText = element.txt2;
    newDiv.appendChild(audio);
    newDiv.appendChild(text);
    newDiv.appendChild(text2);

    newDiv.addEventListener('mousedown', function () {
        playSound(index);
    });

    newDiv.addEventListener('mouseup', function () {
        pauseSound(index);
    });
   
    newDiv.addEventListener('touchstart', function () {
        playSound(index);
    });

    newDiv.addEventListener('touchend', function () {
        pauseSound(index);
    });
    parent.appendChild(newDiv);
});

const elements = document.getElementsByClassName('elements');
console.log(elements);
window.addEventListener('keydown', function (e) {
    console.log(e.keyCode);
    keys.forEach((element, index) => {
        if (e.keyCode == element.keyCode) {
            playSound(index);
        }
    });
});

function playSound(index) {
    elements[index].style.backgroundColor = 'greenyellow';
    elements[index].firstElementChild.play();
}

function pauseSound(index) {
    elements[index].style.backgroundColor = '#202020';
    elements[index].firstElementChild.pause();
    elements[index].firstElementChild.currentTime = 0;
}

window.addEventListener('keyup', function (e) {
    keys.forEach((element, index) => {
        if (e.keyCode == element.keyCode) {
            pauseSound(index);
        }
    });
});

//2. Metronom

const play = document.querySelector('#play');
play.addEventListener('click', playMetronom);

const pause = document.querySelector('#stop');
pause.addEventListener('click', stop);

function time() {
    play.firstElementChild.play();
}
//value
const wartość = document.querySelector('#wartość');
wartość.addEventListener('click', start);

//rekurencja
function getBMP() {
    const BMP = prompt('Podaj BMP');
    console.log(BMP);
    if (!BMP) {
        return null;
    } else if (isNaN(parseInt(BMP))) {
        return getBMP();
    }
    return parseInt(BMP);
}
let BMP = null;
let interval = null;
function start() {
    if (interval) {
        stop();
    }
    BMP = getBMP();
}

function stop() {
    clearInterval(interval);
    interval = null;
}

function playMetronom() {
    if (BMP && !interval) {
        time();
        interval = setInterval(time, (60 * 1000) / BMP);
    }
}
