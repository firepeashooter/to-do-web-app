import "../styles.css";


import { Project } from "./Project.js";
import { ToDo } from "./ToDo.js";
import { ScreenController } from "./ScreenController.js";




//Dialog Control
const addProjectModal = document.querySelector("#add--project--modal");
const addProjectForm = document.querySelector("#add--project--form");




const addTodoModal = document.querySelector("#add--todo--modal");
const addTodoForm = document.querySelector("#add--todo--form")



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

            myController.projects.push(new Project(data.name));
            myController.refreshScreen();

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

            myController.activeProject.addTodo(new ToDo(new Date(data.dueDate), data.description, data.title, false, parseInt(data.priority)));
            myController.refreshScreen();

            
           

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




//Event Delegation for sidebar
const sidebar = document.querySelector(".sidebar");

sidebar.addEventListener("click", (e) => {

    if (e.target.classList.contains("project--button")){

        const projectID = e.target.dataset.id;

        //finds the project
        const project = myController.projects.find(p => p.id === projectID);

        if (project != undefined){

            myController.renderProject(project);
            myController.activeProject = project;
            myController.refreshScreen();

        }else{
            throw new Error("Project not Found");
        }

    }else if (e.target.classList.contains("add--project--button")){
        
        addProjectModal.classList.add("show");
        addProjectModal.showModal();

    }else{
        return;
    }
  
});




//Event Delegation for Todo Object
const container = document.querySelector(".todo--container");

container.addEventListener("click", (e) => {

    if(e.target.classList.contains("delete--button")){

        const todoID = e.target.dataset.id;
        myController.activeProject.deleteTodo(todoID);
        myController.refreshScreen();

    } else if (e.target.classList.contains("edit--button")){
        console.log('edit button pressed');
    } else if (e.target.classList.contains("add--todo--button")){

        addTodoModal.classList.add("show");
        addTodoModal.showModal();  
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


const myController = new ScreenController();

myController.projects.push(myProject);
myController.projects.push(mySecondProject);

myController.activeProject = myController.projects[0];
console.log(myController.activeProject);

myController.renderSidebar();









