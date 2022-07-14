// ola's section 
const myButton = document.querySelector('.add');
const myList = document.querySelector('.new-list');
const myInput = document.querySelector('#new');

const myArray = [];
myButton.addEventListener('click', () => {
    const newItem = document.createElement("li");

    newItem.innerText = `${myInput.value}`;
    myArray.push(newItem);
    console.log(myArray);
    newItem.setAttribute('class', 'list-item');
    myList.appendChild(newItem);
});

//myList.addEventListener('click', (e) => {
//    if (e.target.classList.contains('list-item')) logString();
//})
// Cemil's section
// Sujana's section