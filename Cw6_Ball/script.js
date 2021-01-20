let timer = document.querySelector('#timer');
let playGround = document.querySelector('#playground');

let RoundCounter = 1;
let StartTimer;

let HoleTop = 0;
let HoleLeft = 0;
let ball = document.querySelector('#ball');
let IsGameEnded= false;
let playGroundHeight = playGround.clientHeight;
let playGroundWidth = playGround.clientWidth;

let StartPage = document.querySelector('#startPage');
let PlayButton = document.querySelector('#icon');
let Sub = document.querySelector('#sub');
PlayButton.addEventListener('click', () => ShowGame());

function ShowGame() {
    PlayButton.style.display = 'none';
    Sub.style.display = 'none';
    let Count = document.createElement('div');
    Count.classList.add('count');
    StartPage.appendChild(Count);

    let count = 4;
    let Sec = setInterval(() => {
        count = count -1;
        Count.innerHTML = count;
        if (count == 0) {
            StartPage.style.visibility = 'hidden';
            clearInterval(Sec);
        }
        if (count == 1) {
            Timer();
            StartTimer =  new Date().getTime();
        }
    }, 1000);
}

//TIME COUNTER
function Timer() {
    let totalSeconds = -1;
    setInterval(countTimer, 1000);
    function countTimer() {
        ++totalSeconds;
        let hour = Math.floor(totalSeconds /3600);
        let minute = Math.floor((totalSeconds - hour*3600)/60);
        let seconds = totalSeconds - (hour*3600 + minute*60);
        if(minute < 10)
            minute = '0' + minute;
        if(seconds < 10)
            seconds = '0' + seconds;
        timer.innerHTML = minute + ' : ' + seconds;
    }
}

function GetRandomFromToX(min, max) {
    min = Math.ceil(15);
    max = Math.floor(70);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function GetRandomFromToY(min, max) {
    min = Math.ceil(5);
    max = Math.floor(80);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function HoleGenerator() {
    for (let index = 0; index < RoundCounter; index++) {
        let a = GetRandomFromToX();
        let b = GetRandomFromToY();

        // const holes = document.querySelector('.hole');
        // for (let i = 0; i < holes.length; i++) {
        //     const top = holes[i].style
        // }
        
        let hole = document.createElement('div');
        hole.classList.add('hole');
        playGround.appendChild(hole);

        hole.style.top = a +'%';
        hole.style.left = b +'%';
        HoleTop = hole.offsetTop;
        HoleLeft = hole.offsetLeft;
    }
}
HoleGenerator();

// window.setInterval(location.reload(true), 2000);

// eslint-disable-next-line no-undef
let acl = new Accelerometer({frequency: 60});

acl.addEventListener('reading', () => {
    // console.log('Acceleration along the X-axis ' + acl.x);
    // console.log('Acceleration along the Y-axis ' + acl.y);
    if (!IsGameEnded) {
        const ballTop = parseInt(ball.style.top || 0);
        const ballLeft = parseInt(ball.style.left || 0);
        const top = ballTop + acl.y;
        const left = ballLeft - acl.x;
    
        if(top > 0 && top < playGroundHeight - 20){
            ball.style.top = top + 'px';
        }
    
        if (left > 0 && left < playGroundWidth) {
            ball.style.left = left + 'px';
        }
    
        const IsInHoleTop = ballTop >= HoleTop && ballTop + 20 <= HoleTop + 50;
        const IsInHoleLeft = ballLeft >= HoleLeft && ballLeft + 20 <= HoleLeft + 50;
        
        if ( IsInHoleTop && IsInHoleLeft) {
            IsGameEnded = true;
            let StopTimer = new Date().getTime();
            
            document.querySelector('.count').style.display = 'none';
            StartPage.style.visibility = 'visible';
            let FinishTime = StopTimer - StartTimer;
            let m = Math.floor(FinishTime/60000);
            let s = Math.floor((FinishTime % 60000)/1000);

            let PlayAgain = document.createElement('div');
            PlayAgain.classList.add('playAgain');
            StartPage.appendChild(PlayAgain);

            let YourTime = document.createElement('div');
            YourTime.classList.add('yourTime');
            YourTime.innerHTML = 'Your Time';
            PlayAgain.appendChild(YourTime);
            let Time = document.createElement('div');
            Time.classList.add('time');
            Time.innerHTML = m + 'm ' + s+'s';
            PlayAgain.appendChild(Time);
            let Icon = document.createElement('div');
            Icon.classList.add('icon2');
            Icon.innerHTML = '<i class="fas fa-redo-alt"></i>';
            PlayAgain.appendChild(Icon);

            Icon.addEventListener('click', () => Again());
        }
    }
});

acl.start();

function Again() {
    console.log('click!');
    location.reload();
}

