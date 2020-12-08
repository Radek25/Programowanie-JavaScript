//Array with data
let ContentArray = [];
const storageKey = 'notesFromJs';
//Get notes from local storage
ContentArray.push(...getToLocalStorage());


//Button of new note
const AddButton = document.querySelector('#sendNoteButton');
const NotesBoard = document.querySelector('#notesBoard');
AddButton.addEventListener('click', SendDataToVariable);



function SendDataToVariable() {
    //Data value
    const content = {id: new Date().getTime(), date: null, title: null, message: null };

    //Date setting
    let date = new Date();
    let day = String(date.getDate()).padStart(2, '0');
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let year = date.getFullYear();
    //Adding date to array
    content.date = `${day}.${month}.${year}`;

    //Adding title and message to array
    content.title = document.querySelector('#titleOfNote').value;
    content.message  = document.querySelector('#textareaOfNote').value;
    
    //Adding variable content to array ContantArray
    ContentArray.push(content);

    AddNewDivToNotesBorder(content);
    setToLocalStorage();
}

function AddNewDivToNotesBorder(note) {
    NotesBoard.style.visibility = 'visible';
    const NewDiv = document.createElement('div');
    NewDiv.classList.add('notes');
    NotesBoard.appendChild(NewDiv);

    //Add menu option to div
    const MenuOption = document.createElement('div');
    MenuOption.classList.add('menuOption');
    NewDiv.appendChild(MenuOption);
    //Add data field
    const DataField = document.createElement('div');
    DataField.classList.add('dataField');
    DataField.innerHTML = note.date;
    MenuOption.appendChild(DataField);

    //Add remove button
    let Remove = document.createElement('div');
    Remove.classList.add('removeButton');
    Remove.innerHTML = '<i class="far fa-times-circle"></i>';
    MenuOption.appendChild(Remove);

    //Remove note function
    Remove.addEventListener('click', RemoveNote);
    function RemoveNote() {
        NewDiv.remove();
        RemoveNoteFromContentArray(note.id);
    }

    //Add content field
    const ContentField = document.createElement('div');
    ContentField.classList.add('contentField');
    NewDiv.appendChild(ContentField);
    //Add title field
    const TitleField = document.createElement('div');
    TitleField.classList.add('titleField');
    TitleField.innerHTML = note.title;
    ContentField.appendChild(TitleField);
    //Add message field
    const MessageField = document.createElement('div');
    MessageField.classList.add('messageField');
    MessageField.innerHTML = note.message;
    ContentField.appendChild(MessageField);
}

function setToLocalStorage() {
    localStorage.setItem(storageKey, JSON.stringify(ContentArray));
}
function getToLocalStorage() {
    const GetNotes = localStorage.getItem(storageKey);
    if (GetNotes) {
        return JSON.parse(GetNotes);
    }
    return[];
}

function RemoveNoteFromContentArray(id) {
    for (let i = 0; i < ContentArray.length; i++) {
        if (ContentArray[i].id == id) {
            ContentArray.splice(i,1);
        }
    }
    setToLocalStorage();
}

//Show all notes from ContentAray
for (let index = 0; index < ContentArray.length; index++) {
    AddNewDivToNotesBorder(ContentArray[index]);
}