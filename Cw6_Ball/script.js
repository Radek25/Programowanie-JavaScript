let playGround = document.querySelector('#playground');
let RoundCounter = 1;

let HoleTop = 0;
let HoleLeft = 0;
let ball = document.querySelector('#ball');
let IsGameEnded= false;
let playGroundHeight = playGround.clientHeight;
let playGroundWidth = playGround.clientWidth;


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
    
        if(top > 0 && top < playGroundHeight){
            ball.style.top = top + 'px';
        }
    
        if (left > 0 && left < playGroundWidth) {
            ball.style.left = left + 'px';
        }
    
        const IsInHoleTop = ballTop >= HoleTop && ballTop + 20 <= HoleTop + 50;
        const IsInHoleLeft = ballLeft >= HoleLeft && ballLeft + 20 <= HoleLeft + 50;
        
        if ( IsInHoleTop && IsInHoleLeft) {
            IsGameEnded = true;
        }
    }
    else{
        //
    }
});

acl.start();