import { add } from "date-fns";
import { Project } from "./Project.js";
import { ToDo } from "./ToDo.js";

export class ScreenController{

    constructor(){
        this.projects = [];
        this.activeProject = this.projects[0];
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

        const addButton = document.createElement("button");
        addButton.classList.add("add--todo--button");
        addButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>';
        main.appendChild(addButton);
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

        let del = document.createElement("button");
        del.dataset.id = todo.id;
        del.classList.add("delete--button");
        del.textContent = "Delete";

        main.appendChild(title);
        main.appendChild(description);
        main.appendChild(edit);
        main.appendChild(del);

        return main;

    }


}





