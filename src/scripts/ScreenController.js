import { Project } from "./Project.js";
import { ToDo } from "./ToDo.js";

export class ScreenController{

    constructor(){
        this.projects = [];
    }


    renderProject(project){

        //for each todo in project.todos
            //call render toDo

    }

    //Returns a complete ToDo Div
    renderTodo(todo){

        let main = document.createElement("div");
        main.classList.add("todo");

        let title = document.createElement("h3");
        title.textContent = todo.title;

        let description = document.createElement("p");
        description.classList.add("card--description");
        description.textContent = todo.description;

        let edit = document.createElement("button");
        edit.classList.add("edit--button");
        edit.textContent = "edit";

        main.appendChild(title);
        main.appendChild(description);
        main.appendChild(edit);

        return main;

    }


}





