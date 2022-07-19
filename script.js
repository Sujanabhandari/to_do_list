const button = document.querySelector("#buttonAdd");
const uList = document.querySelector("#todoUl");
const listItem = document.querySelector(".todoLi");
const myUl = document.querySelector("ul");
const inputTodo = document.querySelector("#todoInput")
const todoSection = document.querySelector("#todoSection")
let delButtons = document.querySelector(".delete-item")

const toDoArray = [];
const mydiv = document.querySelector("#addTodoS");

let undoButton = document.querySelector(".undoButton")
let doneButton = document.querySelector(".doneButton")


const createTodo = (todoTask, index) => {
    const newElement = document.createElement("div");
    newElement.setAttribute("id", `todo-${index}`);
    
    newElement.innerHTML = `<div class="row px-3 align-items-center todo-item rounded">
        <div class="col-auto m-1 p-0 d-flex align-items-center">
            <h2 class="m-0 p-0">
                <i class="bi bi-square text-primary btn m-0 p-0 undoButton" data-toggle="tooltip" data-placement="bottom" title="Mark as complete"></i>
                <i class="bi bi-check-square text-primary btn m-0 p-0 doneButton" data-toggle="tooltip" data-placement="bottom" title="Mark as todo"></i>  
            </h2>
        </div>
        <div class="col px-1 m-1 d-flex align-items-center" id="addTodoS">
            <input type="text" id="text-to-edit-${toDoArray.length}" class="form-control form-control-lg border-0 
            edit-todo-input bg-transparent rounded px-3" value="${todoTask.name}"/>  
        </div>
        
        <div class="col-auto m-1 p-0 todo-actions">
            <div class="row d-flex align-items-center justify-content-end">
                <h5 class="col m-0 p-0 px-2">
                    <button class=""edit-item" data-target="text-to-edit-${toDoArray.length}"><i class="bi bi-pencil text-info btn m-0 p-0" data-toggle="tooltip" 
                    data-placement="bottom" title="Edit todo"></i></button>
                </h5>
                <h5 class="col m-0 p-0 px-2">
                    <button data-id="${index}" class="delete-item"><i class="bi bi-trash-fill text-danger btn m-0 p-0"  
                    data-toggle="tooltip" data-placement="bottom" title="Delete todo"></i></button>
                </h5>
            </div>
        </div>
        </div>`;

    return newElement;
}

const renderTodo = (element) => { 
    todoSection.prepend(element);
}

const addItem = () => {
    
    const userInput = inputTodo.value;
    inputTodo.value = "";
    // Add to the memory 
    // Example [{status:"new", task:"clean apartment"},{status:"done", task:"cook food"}]
    const todoTask = {
        status: "new",
        name: userInput
    }

    toDoArray.push(todoTask);
    renderTodo(createTodo(todoTask, toDoArray.length - 1));

    delButtons = document.querySelector(".delete-item");
    delButtons.addEventListener("click", deleteItem)

    undoButton = document.querySelector(".undoButton")
    undoButton.addEventListener("click", markDone)
    doneButton = document.querySelector(".doneButton")

    editButton = document.querySelector(".edit-item");
    editButton.addEventListener("click", editText)
    
}

//click on the event 

const deleteItem = (event) => {
    console.log("Item is deleted");
    const index = parseInt(event.currentTarget.getAttribute("data-id"));
    toDoArray.splice(index, 1);
    document.querySelector(`#todo-${index}`).remove();
    // console.log(event.currentTarget.);
}

//keypress enter event

const inputEnter = (event) => {
    if(event.key === 'Enter'){
        event.preventDefault();
        button.click();
    }
}

const markDone = () => {
    console.log("Item is done");
    // const index = parseInt(event.currentTarget.getAttribute("data-id"));
    undoButton.style.display = "none";
    doneButton.style.display = "flex";
    // console.log(event.currentTarget.);
}

todoInput.addEventListener("keypress", inputEnter)
button.addEventListener("click", addItem)


const editText = (event) => {
    const dataTargetButtonClicked = event.target.getAttribute("data-target");
    const divisionToEdit = document.getElementById(dataTargetButtonClicked);
    divisionToEdit.contentEditable = true;
    const index = dataTargetButtonClicked.substr(13);
    divisionToEdit.addEventListener('keypress', (e) => {
        e.preventDefault();
        toDoArray[index] = divisionToEdit.textContent;
        if (e.key === 'Enter') {
            divisionToEdit.contentEditable = false;
        }
    })
    let editElem = document.getElementById(dataTargetButtonClicked);
    let userVersion = editElem.innerText;
    localStorage.userEdits = userVersion;  
}

/*

addTaskButton.addEventListener('click', () => {
    let newListItem = document.createElement('li');
    let newTextDivision = document.createElement('div');
    newTextDivision.innerText = `${myInput.value}`; 
    newTextDivision.id = `text-to-edit-${toDoArray.length}` ;
    let newButtonDivision = document.createElement('div');

    let deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.id = `delete-${toDoArray.length}`;
    let editButton = document.createElement('button');
    editButton.innerText = 'Edit';
    editButton.id = 'edit';
    editButton.id = `edit-${toDoArray.length}`;
    editButton.setAttribute("data-target", `text-to-edit-${toDoArray.length}`)
    editButton.addEventListener('click', editText);

    newButtonDivision.appendChild(deleteButton);
    newButtonDivision.appendChild(editButton);

    newListItem.appendChild(newTextDivision);
    newListItem.appendChild(newButtonDivision);
    toDoArray.push(newTextDivision.textContent);
    // console.log(toDoArray);
    myList.appendChild(newListItem);
})
*/
