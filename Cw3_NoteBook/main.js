//Array with data
let ContentArray = [];
const storageKey = 'notesFromJs';
//Get notes from local storage
ContentArray.push(...getToLocalStorage());
console.log(ContentArray);

//Adding new div
const AddButton = document.querySelector('#sendNoteButton');
const NotesBoard = document.querySelector('#notesBoard');
AddButton.addEventListener('click', AddNewDiv);

//Show all notes from ContentAray
for (let index = 0; index < ContentArray.length; index++) {
    AddNewDivToNotesBorder(ContentArray[index]);
}

function AddNewDiv() {
    //Data value
    const content = {id: new Date().getTime(), date: null, title: null, message: null };

    //Data setting
    let date = new Date();
    //Adding title and message to array
    let title = document.querySelector('#titleOfNote').value;
    let message = document.querySelector('#textareaOfNote').value;
    content.date = `${date.getDay()}.${date.getMonth()}.${date.getFullYear()}`;
    content.title = title;
    content.message = message;
    ContentArray.push(content);
    //ContentArray[ContentArray.length -1];
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
    console.log(ContentArray);
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