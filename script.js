// ola's section 
const addTaskButton = document.querySelector('.btn-primary');
const myList = document.querySelector('.new-list');
const myInput = document.querySelector('#new');

const myArray = [];

const editText = (event) => {
    const dataTargetButtonClicked = event.target.getAttribute("data-target");
    const divisionToEdit = document.getElementById(dataTargetButtonClicked);
    divisionToEdit.contentEditable = true;
    const index = dataTargetButtonClicked.substr(13);
    divisionToEdit.addEventListener('keypress', (e) => {
        e.preventDefault();
        myArray[index] = divisionToEdit.textContent;
        if (e.key === 'Enter') {
            divisionToEdit.contentEditable = false;
        }
    })
    let editElem = document.getElementById(dataTargetButtonClicked);
    let userVersion = editElem.innerText;
    localStorage.userEdits = userVersion;  
}

addTaskButton.addEventListener('click', () => {
    let newListItem = document.createElement('li');
    let newTextDivision = document.createElement('div');
    newTextDivision.innerText = `${myInput.value}`; 
    newTextDivision.id = `text-to-edit-${myArray.length}` ;
    let newButtonDivision = document.createElement('div');

    let deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.id = `delete-${myArray.length}`;
    // deleteButton.setAttribute("data-target", `text-to-edit-${myArray.length}`)
    let editButton = document.createElement('button');
    editButton.innerText = 'Edit';
    editButton.id = 'edit';
    editButton.id = `edit-${myArray.length}`;
    editButton.setAttribute("data-target", `text-to-edit-${myArray.length}`)
    editButton.addEventListener('click', editText);

    newButtonDivision.appendChild(deleteButton);
    newButtonDivision.appendChild(editButton);

    newListItem.appendChild(newTextDivision);
    newListItem.appendChild(newButtonDivision);
    myArray.push(newTextDivision.textContent);
    // console.log(myArray);
    myList.appendChild(newListItem);
})













