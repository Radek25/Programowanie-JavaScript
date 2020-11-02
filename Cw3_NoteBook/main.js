let isOpen = false;
const openButton = document.querySelector('#menu2');
openButton.addEventListener('click', openMenu);
const nav = document.querySelector('#navField');

function openMenu() {
    // const menu1 = document.querySelector('#menu1');
    // isOpen ? (isOpen = false) : (isOpen = true);
    if (isOpen) {
        nav.classList.remove('active');

        isOpen = false;
    } else {
        nav.classList.add('active');

        isOpen = true;
    }
    //waruek ? jeśli jes spełniony : jeśli nie jest spełniowny
}
