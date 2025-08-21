import { add } from "date-fns";
import { Project } from "./Project.js";
import { ToDo } from "./ToDo.js";

export class ScreenController{

    constructor(){
        this.projects = [];
        this.activeProject;
    }

    
    renderSidebar(){
        const sidebar = document.querySelector(".sidebar");

        //refresh the sidebar
        sidebar.textContent = '';
        

        const sidebarHeader = document.createElement("h2");
        sidebarHeader.textContent = "Projects";

        sidebar.appendChild(sidebarHeader);

        //Renders all project buttons
        for (let i = 0; i < this.projects.length; i++){
            let projectButton = document.createElement("button");
            projectButton.classList.add("project--button");
            projectButton.textContent = this.projects[i].name;
            projectButton.dataset.id = this.projects[i].id;

            //If active project we highlight it
            if (this.projects[i].id == this.activeProject.id){
                projectButton.classList.add("active");
            }
            sidebar.appendChild(projectButton);
        }

        //renders add project button
        const addProject = document.createElement("button");
        addProject.classList.add("add--project--button");
        addProject.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>'

        sidebar.appendChild(addProject);

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

        let header = document.createElement("div");
        header.classList.add("todo--header");

        let title = document.createElement("h3");
        title.textContent = todo.title;

        let dueDate = document.createElement("h3");
        dueDate.textContent = `Due Date: ${todo.getFormattedDate()}`;

        let priority = document.createElement("h3");
        priority.textContent = todo.priority;

        let buttonContainer = document.createElement("div");
        buttonContainer.classList.add("todo--button--container");

        let check = document.createElement("button");
        check.dataset.id = todo.id;
        check.classList.add("check--button");
        check.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>'


        let edit = document.createElement("button");
        edit.dataset.id = todo.id;
        edit.classList.add("edit--button");
        edit.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" /></svg>';

        let del = document.createElement("button");
        del.dataset.id = todo.id;
        del.classList.add("delete--button");
        del.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>';

        
        header.appendChild(title);
        header.appendChild(priority);
        
        main.appendChild(header);
        main.appendChild(dueDate);
       

        buttonContainer.appendChild(edit);
        buttonContainer.appendChild(check);
        buttonContainer.appendChild(del);

        main.appendChild(buttonContainer);

        return main;

    }

    //rerenders the active project
    refreshScreen(){

        this.renderProject(this.activeProject);
        this.renderSidebar();

    }


}





