// eslint-disable-next-line no-unused-vars
const lightbox = document.querySelector('.lightbox');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next'); 
let selectImg = 0;

const imgs = document.querySelectorAll('.galeria img');
for (let index = 0; index < imgs.length; index++) 
{
    const img = imgs[index];
    img.addEventListener('click', (event) => showLightbox(event, index));
}

function showLightbox (event, index) 
{
    const lightbox = document.querySelector('.lightbox'); //Wybranie i wyświetlenie zdjęcia
    const img = document.querySelector('.img img');
    selectImg = index;
    const imgUrl = event.target.src;
    img.src = imgUrl;
    lightbox.classList.add('visible');
    console.log(index);
    
    const close = document.querySelector('.close'); //Zamknięcie Lightbox
    close.addEventListener('click', hideLightbox);
    function hideLightbox () 
    {
        lightbox.classList.remove('visible');
    }
    
    next.addEventListener('click', nextIMG); //Przewijanie zdjęć
    function nextIMG() 
    {
        event.stopPropagation;
        const img = document.querySelector('.img img');
        if (selectImg + 1 < imgs.length) 
        {
            const nextElement = imgs[++selectImg];
            img.src = nextElement.src;
        }
    }
    prev.addEventListener('click', prevIMG);
    function prevIMG()
    {
        event.stopPropagation;
        const img = document.querySelector('.img img');
        if (selectImg -1 < imgs.length) 
        {
            const prevElement = imgs[--selectImg];
            img.src = prevElement.src;
        }
    }
}

