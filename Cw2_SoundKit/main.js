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

    //Obsługa touch
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
window.addEventListener('keydown', function (e) {
    keys.forEach((element, index) => {
        if (e.keyCode == element.keyCode) {
            playSound(index);
        }
    });
});

//Zmienne do nagrywania
let timeStart = null;
let timeStop = null;
//Tablica do przechowywania indeksu i czasu trwania
let recordElement = { index: null, time: null };

function playSound(index) {
    timeStart = new Date().getTime();
    elements[index].style.backgroundColor = 'greenyellow';
    elements[index].firstElementChild.play();
}

function pauseSound(index) {
    timeStop = new Date().getTime();
    elements[index].style.backgroundColor = '#202020';
    elements[index].firstElementChild.pause();
    elements[index].firstElementChild.currentTime = 0;

    //Dodanie indeksu i czasu do tabeli
    const recordElement = {
        index: index,
        time: timeStop - timeStart,
    };

    console.log(recordElement);
    if (recordFlag1 == true) {
        firstRecord.push(recordElement);
        console.log('firstrec w if', firstRecord);
    } else if (recordFlag2 == true) {
        secondRecord.push(recordElement);
    } else if (recordFlag3 == true) {
        thirdRecord.push(recordElement);
    } else if (recordFlag4 == true) {
        fourthRecord.push(recordElement);
    }
}

window.addEventListener('keyup', function (e) {
    keys.forEach((element, index) => {
        if (e.keyCode == element.keyCode) {
            pauseSound(index);
        }
    });
});

//2. Metronom.

const play = document.querySelector('#play');
play.addEventListener('click', playMetronom);

const pause = document.querySelector('#stop');
pause.addEventListener('click', stop);

function time() {
    play.firstElementChild.play();
}

const value = document.querySelector('#value');
value.addEventListener('click', start);

//Rekurencja okna dialogowego
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

//3.Nagrywamie.

//Cztery tablice do przehcowywania nagrań dla każdej ścieżki
const firstRecord = [];
const secondRecord = [];
const thirdRecord = [];
const fourthRecord = [];

//Cztery flagi rozpoczęcia i zakończenia nagrywania dla każdej ścieżki
let recordFlag1 = false;
let recordFlag2 = false;
let recordFlag3 = false;
let recordFlag4 = false;

//Pierwsza ścieżka
document.querySelector('#recbutton1').addEventListener('click', Recording1);
function Recording1() {
    recordFlag1 = true;
    console.log('nagrywam1');
}

document
    .querySelector('#stopbutton1')
    .addEventListener('click', stopRecording1);
function stopRecording1() {
    recordFlag1 = false;
    console.log('koniec nagrywania1');
}

document
    .querySelector('#playbutton1')
    .addEventListener('click', playRecording1);

async function playRecording1() {
    console.log('odtwarzam1');

    // firstRecord.forEach(async (element) => {
    //     playSound(element.index);
    //     await setTimeout(() => {
    //         pauseSound(element.index);
    //     }, element.time);
    // });

    for (let index = 0; index < firstRecord.length; index++) {
        recordElement = firstRecord[index];
        console.log(firstRecord);
        console.log(recordElement.index, recordElement.time);
        playSound(recordElement.index);
        
        await new Promise((resolve) =>
            setTimeout(() => {
                pauseSound(recordElement.index);
                resolve();
            }, recordElement.time)
        );
        // await setTimeout(async () => {
        //     await pauseSound(recordElement.index);
        // }, recordElement.time);
    }
}

// //Druga ścieżka
// document.querySelector('#recbutton2').addEventListener('click', Recording2);
// function Recording2() {
//     recordFlag2 = true;
//     console.log('nagrywam2');
// }

// document.querySelector('#stopbutton2').addEventListener('click', stopRecording2);
// function stopRecording2() {
//     recordFlag2 = false;
//     console.log('koniec nagrywania2');
// }

// document.querySelector('#playbutton2').addEventListener('click', playRecording2);
// function playRecording2() {
//     console.log('tu bedzie odtwarzane2');
// }

// //Trzecia ścieżka
// document.querySelector('#recbutton3').addEventListener('click', Recording3);
// function Recording3() {
//     recordFlag3 = true;
//     console.log('nagrywam3');
// }

// document.querySelector('#stopbutton3').addEventListener('click', stopRecording3);
// function stopRecording3() {
//     recordFlag3 = false;
//     console.log('koniec nagrywania3');
// }

// document.querySelector('#playbutton3').addEventListener('click', playRecording3);
// function playRecording3() {
//     console.log('tu bedzie odtwarzane3');
// }

// //Czwarta ścieżka
// document.querySelector('#recbutton4').addEventListener('click', Recording4);
// function Recording4() {
//     recordFlag4 = true;
//     console.log('nagrywam4');
// }

// document.querySelector('#stopbutton4').addEventListener('click', stopRecording4);
// function stopRecording4() {
//     recordFlag4 = false;
//     console.log('koniec nagrywania4');
// }

// document.querySelector('#playbutton4').addEventListener('click', playRecording4);
// function playRecording4() {
//     console.log('tu bedzie odtwarzane4');
// }
