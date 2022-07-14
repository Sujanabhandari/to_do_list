// ola's section 
const addTaskButton = document.querySelector('.btn-primary');
const myList = document.querySelector('.new-list');
const myInput = document.querySelector('#new');

const myArray = [];

addTaskButton.addEventListener('click', () => {
    let newItem = document.createElement('li');
    newItem.innerText = `${myInput.value}`;
    let newDivision = document.createElement('div');

    let deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    let editButton = document.createElement('button');
    editButton.innerText = 'Edit';

    newDivision.appendChild(deleteButton);
    newDivision.appendChild(editButton);

    newItem.appendChild(newDivision);
    myArray.push(newItem);
    myList.appendChild(newItem);
})







