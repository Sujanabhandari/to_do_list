const button = document.querySelector("#buttonAdd");
const uList = document.querySelector("#todoUl");
const listItem = document.querySelector(".todoLi");

const inputTodo = document.querySelector("#todoInput")
const todoSection = document.querySelector("#todoSection")
let delButtons = document.querySelector(".delete-item")
let arrayVisual = document.querySelector(".arrayVisual")

/**
 * Create todo html element from given parameters.
 * @param {Object} todoTask 
 * @param {Int} index
 */

const createTodo = (todoTask, index) => {
    const newElement = document.createElement("div");
    newElement.setAttribute("id", `todo-${index}`);   
    newElement.innerHTML = `<div class="row px-3 align-items-center todo-item rounded" data-id="${index}">
        <div class="col-auto m-1 p-0 d-flex align-items-center">
            <h2 class="m-0 p-0">
                <i class="bi bi-square text-primary btn m-0 p-0 checkButton" data-toggle="tooltip" data-placement="bottom" title="Mark as complete"></i>
                <i class="bi bi-check-square text-primary btn m-0 p-0 d-none checkButton" data-toggle="tooltip" data-placement="bottom" title="Mark as todo"></i>  
            </h2>
        </div>
        <div class="col px-1 m-1 d-flex align-items-center">
            <input type="text" data-id="${index}" class="form-control form-control-lg border-0 edit-todo-input bg-transparent rounded px-3" readonly value="${todoTask.name}"/>  
        </div>
        
        <div class="col-auto m-1 p-0 todo-actions">
            <div class="row d-flex align-items-center justify-content-end">
                <h5 class="col m-0 p-0 px-2">
                    <button class="editButton"><i class="bi bi-pencil text-info btn m-0 p-0" data-toggle="tooltip" data-placement="bottom" title="Edit todo"></i></button>
                </h5>
                <h5 class="col m-0 p-0 px-2">
                    <button data-id="${index}" class="delete-item"><i class="bi bi-trash-fill text-danger btn m-0 p-0"  data-toggle="tooltip" data-placement="bottom" title="Delete todo"></i></button>
                </h5>
            </div>
        </div>
        </div>`;
    
    
    return newElement;

}
/** 
* Brief description of the function here.
* @summary If the description is long, write your summary here. Otherwise, feel free to remove this.
* @param {ParamDataTypeHere} parameterNameHere - Brief description of the parameter here. Note: For other notations of data types, please refer to JSDocs: DataTypes command.
* @return {ReturnValueDataTypeHere} Brief description of the returning value here.
*/

const renderTodo = (element) => {
    
    todoSection.prepend(element);
}

const addItem = () => {
    const userInput = inputTodo.value;
    inputTodo.value = "";

    const todoTask = {
        status: "New",
        name: userInput
    }

    toDoArray.push(todoTask);
    // Use Index of the array while editing 
    // Create new element and render
    renderTodo(createTodo(todoTask, toDoArray.length - 1));

    // localStorage.setItem("items", JSON.stringify(toDoArray));

    localStorage.setItem("toDoItems", JSON.stringify(toDoArray));
    // JSON.parse(localStorage.getItem("toDoItems"))

    delButtons = document.querySelector(".delete-item");
    delButtons.addEventListener("click", deleteItem)

    const checkButton = document.querySelectorAll(".checkButton")
    checkButton.forEach((e) => e.addEventListener("click", markDone))
    // doneButton = document.querySelector(".doneButton")
    
    //edit option
    const editButton = document.querySelector(".editButton")
    editButton.addEventListener("click", editItemFunction)

    console.log(toDoArray)


}

 
const deleteItem = (event) => {
    // console.log("Item is deleted");
    const index = parseInt(event.currentTarget.getAttribute("data-id"));
    console.log(index);
    toDoArray.splice(index, 1);
    document.querySelector(`#todo-${index}`).remove();
    localStorage.setItem("toDoItems", JSON.stringify(toDoArray));
    // console.log(event.currentTarget.);
}

const inputEnter = (event) => {
    if(event.key === 'Enter'){
        event.preventDefault();
        button.click();
    }

}

const markDone = (event) => {
    const targetNode = event.currentTarget;
    const parentNode = targetNode.closest('.todo-item');
    const index = parseInt(parentNode.getAttribute("data-id"));
    
    if (targetNode.classList.contains("bi-square")) {
        parentNode.querySelector(".edit-todo-input").classList.add("textStrike");
        targetNode.classList.toggle("d-none");
        parentNode.querySelector(".bi-check-square").classList.toggle("d-none");
        toDoArray[index].status = "Done";
        console.log(toDoArray[index])
    }
    else {
        parentNode.querySelector(".edit-todo-input").classList.remove("textStrike");
        targetNode.classList.toggle("d-none");
        parentNode.querySelector(".bi-square").classList.toggle("d-none");
        toDoArray[index].status = "New";
        console.log(toDoArray[index])
    }
    localStorage.setItem("toDoItems", JSON.stringify(toDoArray));
 
}

const editItemFunction = (event) => {

    console.log(event.currentTarget)
    const targetNode = event.currentTarget;
    const parentNode = targetNode.closest('.todo-item');
    const inputItem = parentNode.querySelector(".edit-todo-input")
    inputItem.readOnly = false;
    //task: Focous on Input when edit is created.
    inputItem.focus();
    inputItem.select();
    inputItem.addEventListener("keypress", editedItems)
  
}

const editedItems = (event) => {
    const index = parseInt(event.currentTarget.getAttribute("data-id"));
    if(event.key === 'Enter'){
        event.currentTarget.blur();
        inputTodo.focus();
        const editedValue = event.currentTarget.value;
        toDoArray[index].name = editedValue;
        event.currentTarget.readOnly = true;
        console.log("update array" + toDoArray) 
        localStorage.setItem("toDoItems", JSON.stringify(toDoArray));
    }
}


// editInput.addEventListener("keypress", keyVakue);
todoInput.addEventListener("keypress", inputEnter);
button.addEventListener("click", addItem);

//When application is initialized.
//When DOM is ready cheack if there is local storage .
//And parse the values from local storage.
//Render the array
const toDoArray = JSON.parse(localStorage.getItem("toDoItems")) || [];
console.log(toDoArray);
toDoArray.forEach((item, index) => {
    renderTodo(createTodo(item, index));
});

delButtons = document.querySelectorAll(".delete-item");
delButtons.forEach((e) => e.addEventListener("click", deleteItem))

const checkButton = document.querySelectorAll(".checkButton")
checkButton.forEach((e) => e.addEventListener("click", markDone))
// doneButton = document.querySelector(".doneButton")

//edit option
const editButton = document.querySelectorAll(".editButton")
editButton.forEach((e) => e.addEventListener("click", editItemFunction))
