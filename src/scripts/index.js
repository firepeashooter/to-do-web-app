import "../styles.css";


import { Project } from "./Project.js";
import { ToDo } from "./ToDo.js";
import { ScreenController } from "./ScreenController.js";


//For testing


let dueDate = new Date(2025, 2, 3);
let secondDate = new Date(2026, 4, 5);
let myTodoOne = new ToDo(dueDate, "description", "title1", false, 5);
let myTodoTwo = new ToDo(secondDate, "seconddescription", "title1", false, 5);

let myProject = new Project("School");

myProject.addTodo(myTodoOne);
myProject.addTodo(myTodoTwo);

const container = document.querySelector(".todo--container");
const myController = new ScreenController();

container.appendChild(myController.renderTodo(myTodoOne));
container.appendChild(myController.renderTodo(myTodoTwo));
