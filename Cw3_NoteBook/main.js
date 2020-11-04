// 1.Menu opcji
let isOpen = false;
const openButton = document.querySelector('#menu2');
openButton.addEventListener('click', openMenu);
const nav = document.querySelector('#navField');

function openMenu() {
    if (isOpen) {
        nav.classList.remove('active');
        isOpen = false;
    } else {
        nav.classList.add('active');
        isOpen = true;
    }
}

// 2.Dodawnie notatek
const notion = [];

let empty = false;

//Dodawanie treści do tablicy
const addButton = document.querySelector('.fa-plus-square');
const formWindow = document.querySelector('#form');
let title = document.getElementById('title').value;
let content = document.getElementById('content').value;
addButton.addEventListener('click', addTitleAndMessageToNotion);
function addTitleAndMessageToNotion() {
    formWindow.style.visibility = 'visible';
    const addNoteButton = document.querySelector('button');
    addNoteButton.addEventListener('click', addNoteFromForm);
    function addNoteFromForm() {
        const newNotion = {
            title,
            content,
            id: notion.length  == 0 ? 0 : notion[notion.length - 1].id + 1
        };
        notion.push(newNotion);
        formWindow.style.visibility = 'hidden';
        createDiv(newNotion);
    }
}
  
function createDiv(newNotionToAdd) {
    empty = true;
    //Napis - brak notatek 
    if (empty == true) {
        const noNote = document.querySelector('#info');
        noNote.style.display = 'none'; 
    }

    //Tworzenie okienka notatki
    const newNote = document.createElement('div');
    newNote.id = `notion${newNotionToAdd.id}`;
    newNote.classList.add('noteOption');
    const div = document.querySelector('#mainBoard');
    div.appendChild(newNote);
    console.log('notatka stworzona');
    console.log('w tablicy mamy to:', notion);

    //Usówanie notatek
    let deleteFlag = false;
    let deleteOption;
    const deleteButton = document.querySelector('#removeNote');
    deleteButton.addEventListener('click', deleteOptions);
    
    function deleteNote() {
        console.log(newNote.id);
        const notionElement = notion.find(element=>newNote.id === `notion${element.id}`);
        const index = notion.indexOf(notionElement);
        console.log(notion, index, notion.slice(index, 1));
        newNote.remove();
        notion.splice(index, 1);
    }
    
    function deleteOptions() {
        if (deleteFlag == false) {
            deleteFlag = true;

            deleteOption = document.createElement('div');
            deleteOption.classList.add('deleteOption');

            deleteOption.addEventListener('click', deleteNote);

            newNote.appendChild(deleteOption);
        } else if (deleteFlag == true) {
            deleteFlag = false;
            console.log('usuwam!', deleteOption);
            deleteOption.remove();
        }
    }
}

