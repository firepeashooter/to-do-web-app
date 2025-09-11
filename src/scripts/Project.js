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
                console.log("todo deleted");
                return;
            }
        }

        throw new Error("No such ToDo item found");

    }

}

