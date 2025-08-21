import "../styles.css";


import { Project } from "./Project.js";
import { ToDo } from "./ToDo.js";
import { ScreenController } from "./ScreenController.js";
import { LogicController } from "./LogicController.js";




//Dialog Control
const addProjectModal = document.querySelector("#add--project--modal");
const addProjectForm = document.querySelector("#add--project--form");

const addTodoModal = document.querySelector("#add--todo--modal");
const addTodoForm = document.querySelector("#add--todo--form");

const editTodoModal = document.querySelector("#edit--todo--modal");
const editTodoForm = document.querySelector("#edit--todo--form");


//ADD PROJECT MODAL EVENT LISTENER
addProjectModal.addEventListener("click", (e) => {

    if (e.target.id == "close--project"){
        addProjectForm.reset();
        addProjectModal.close();
        addProjectModal.classList.remove("show");

    }else if (e.target.id == "save--project"){

        e.preventDefault();

        if (addProjectForm.checkValidity()){
            const formData = new FormData(addProjectForm);
            const data = Object.fromEntries(formData.entries());

            logiController.addProject(new Project(data.name));
            scrController.refreshScreen();

            addProjectForm.reset();
            addProjectModal.close();
            addProjectModal.classList.remove("show");
        }else{
            return;
        }
    }else{
        return;
    }

});


//TODO MODAL EVENT LISTENER
addTodoModal.addEventListener("click", (e) =>{

    if (e.target.id == "close--todo"){
        addTodoForm.reset();
        addTodoModal.close();
        addTodoModal.classList.remove("show");
    } else if (e.target.id == "save--todo"){

        e.preventDefault();

        if (addTodoForm.checkValidity()){
            const formData = new FormData(addTodoForm);
            const data = Object.fromEntries(formData.entries());

            console.log(new Date(data.dueDate));

            logiController.activeProject.addTodo(new ToDo(new Date(data.dueDate), data.description, data.title, false, parseInt(data.priority)));
            scrController.refreshScreen();

            addTodoForm.reset();
            addTodoModal.close();
            addTodoModal.classList.remove("show");
        }else{
            return;
        }

    }else{
        return;
    }

});

//TODO EDIT MODAL EVENT LISTENER

editTodoModal.addEventListener("click", (e) => {

    const todoID = editTodoModal.dataset.id;
    const todo = logiController.activeProject.todos.find(t => t.id === todoID);

    if (e.target.id == "close--todo--edit"){
        editTodoForm.reset();
        editTodoModal.close();
        editTodoModal.classList.remove("show");
    } else if (e.target.id == "save--todo--edit"){

        console.log("save button was pressed");

        e.preventDefault();

        

        if (editTodoForm.checkValidity()){
            const formData = new FormData(editTodoForm);
            const data = Object.fromEntries(formData.entries());

            console.log(new Date(data.dueDate));

            todo.changeTitle(data.title);
            todo.changeDescription(data.description);
            todo.changePriority(parseInt(data.priority));
            todo.changeDueDate(new Date(data.dueDate));

            scrController.refreshScreen();

            editTodoForm.reset();
            editTodoModal.close();
            editTodoModal.classList.remove("show");
        }else{
            return;
        }

    } 
});




//Event Delegation for sidebar
const sidebar = document.querySelector(".sidebar");

sidebar.addEventListener("click", (e) => {

    if (e.target.classList.contains("project--button")){

        const projectID = e.target.dataset.id;

        //finds the project
        const project = logiController.projects.find(p => p.id === projectID);

        if (project != undefined){

            scrController.renderProject(project);
            logiController.activeProject = project;
            scrController.refreshScreen();

        }else{
            throw new Error("Project not Found");
        }

    }else if (e.target.classList.contains("add--project--button")){
        
        addProjectModal.classList.add("show");
        addProjectModal.showModal();

    }else if (e.target.classList.contains("delete--project--button")){

        const projectID = e.target.dataset.id;
        
        logiController.deleteProject(projectID);

        //If you delete the project you are viewing redirect
        if (logiController.activeProject.id == projectID){
            logiController.activeProject = logiController.projects[0];
        }
        scrController.refreshScreen();
    }
  
});




//Event Delegation for Todo Object
const container = document.querySelector(".todo--container");

container.addEventListener("click", (e) => {

    if(e.target.classList.contains("delete--button")){

        const todoID = e.target.dataset.id;
        logiController.activeProject.deleteTodo(todoID);
        scrController.refreshScreen();

    } else if (e.target.classList.contains("edit--button")){

        const todoID = e.target.dataset.id;
        const todo = logiController.activeProject.todos.find(t => t.id === todoID);
        

        editTodoModal.classList.add("show");
        editTodoModal.dataset.id = todoID;
        editTodoModal.showModal();  

        //prefill the form 
        editTodoForm.title.value = todo.title;
        editTodoForm.description.value = todo.description;
        editTodoForm.dueDate.value = todo.getFormattedDate();
        editTodoForm.priority.value = todo.priority;

    } else if (e.target.classList.contains("add--todo--button")){

        addTodoModal.classList.add("show");
        addTodoModal.showModal();  

       

    } else if (e.target.classList.contains("check--button")){

        const todoID = e.target.dataset.id;
        const todo = logiController.activeProject.todos.find(t => t.id === todoID);
        const todoDiv = e.target.closest(".todo");

        if (todo != undefined){

            todo.toggleCheck();
            todoDiv.classList.toggle("highlight");

        }else{
            throw new Error("Project not Found");
        }
    }
});


//For testing


let dueDate = new Date(2025, 2, 3);
let secondDate = new Date(2026, 4, 5);
let myTodoOne = new ToDo(dueDate, "description", "title1", false, 5);
let myTodoTwo = new ToDo(secondDate, "seconddescription", "title1", false, 5);

let myTodoThree = new ToDo(new Date(2001, 5, 7), "description of new card", "title1", false, 5);
let myTodoFour = new ToDo(new Date(2004, 5, 7), "seconddescription of new card", "title2", false, 5);
let myTodoFive = new ToDo(new Date(2003, 2, 8), "description of third card", "title3", false, 5);
let myTodoSix = new ToDo(new Date(2017, 7, 7), "seconddescription of third card", "title4", false, 5);

let myProject = new Project("Main");
let mySecondProject = new Project("Bitch");

myProject.addTodo(myTodoOne);
myProject.addTodo(myTodoTwo);

console.log(`mytodo 1 id is ${myTodoOne.id}`);
console.log(`mytodo 2 id is ${myTodoTwo.id}`);


mySecondProject.addTodo(myTodoThree);
mySecondProject.addTodo(myTodoFour);
mySecondProject.addTodo(myTodoFive);
mySecondProject.addTodo(myTodoSix);


const logiController = new LogicController();


logiController.projects.push(myProject);
logiController.projects.push(mySecondProject);
logiController.activeProject = logiController.projects[0];

const scrController = new ScreenController(logiController);

scrController.initialRender();









