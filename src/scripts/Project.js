import { ToDo } from "./ToDo.js";

export class Project {

    constructor(name){
        this.name = name;
        this.todos = [];
        this.id = crypto.randomUUID();
    }

    addTodo(todo){
        this.todos.push(todo);
    }

    deleteTodo(id){
        for(let i = 0; i < this.todos.length; i++){
            if (this.todos[i].id == id){
                this.todos.splice(i, 1);
                return;
            }
        }

        throw new Error("No such ToDo item found");

    }

}

//Testing Purposes

let dueDate = new Date(2025, 2, 3);
let secondDate = new Date(2026, 4, 5);
let myTodoOne = new ToDo(dueDate, "description", "title1", false, 5);
let myTodoTwo = new ToDo(secondDate, "seconddescription", "title1", false, 5);

let myProject = new Project("School");

myProject.addTodo(myTodoOne);
myProject.addTodo(myTodoTwo);

myProject.deleteTodo(myTodoOne.id);



console.log(myProject);