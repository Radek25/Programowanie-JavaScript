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

