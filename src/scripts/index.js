import "../styles.css";


import { Project } from "./Project.js";
import { ToDo } from "./ToDo.js";
import { ScreenController } from "./ScreenController.js";


//Event Delegation for sidebar
const sidebar = document.querySelector(".sidebar");

sidebar.addEventListener("click", (e) => {

    if (e.target.matches("button")){

        const projectID = e.target.dataset.id;

        //clears all active buttons
        sidebar.querySelectorAll(".project--button").forEach(b => b.classList.remove("active"));
        

        //finds the project
        const project = myController.projects.find(p => p.id === projectID);

        if (project != undefined){

            myController.renderProject(project);
            e.target.classList.add("active");
            myController.activeProject = project;

            console.log(myController.activeProject.name);
            

        }else{
            throw new Error("Project not Found");
        }



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
        myController.renderProject(myController.activeProject);




    }
})


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

myController.renderSidebar();









