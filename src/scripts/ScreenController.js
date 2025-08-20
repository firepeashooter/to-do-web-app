import { Project } from "./Project.js";
import { ToDo } from "./ToDo.js";

export class ScreenController{

    constructor(){
        this.projects = [];
    }

    
    renderSidebar(){
        const sidebar = document.querySelector(".sidebar");

        for (let i = 0; i < this.projects.length; i++){
            let projectButton = document.createElement("button");
            projectButton.classList.add("project--button");
            projectButton.textContent = this.projects[i].name;
            projectButton.dataset.id = this.projects[i].id;
            sidebar.appendChild(projectButton);
        }
    }


    renderProject(project){

        const main = document.querySelector(".todo--container");

        //Clear the current project
        main.textContent = '';

        for (let i = 0; i < project.todos.length; i++){

            main.appendChild(this.renderTodo(project.todos[i]));

        }
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





