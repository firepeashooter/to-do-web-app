import { add } from "date-fns";
import { Project } from "./Project.js";
import { ToDo } from "./ToDo.js";
import { LogicController } from "./LogicController.js";

export class ScreenController{

    constructor(controller){
        this.controller = controller;
    }

    initialRender(){
        this.controller.loadProjects();

        if (this.controller.activeProject){
            this.renderProject(this.controller.activeProject);
        } else{
            this.controller.activeProject = this.controller.projects[0];
            this.renderProject(this.controller.activeProject);
        }

        this.renderSidebar();
   
    }

    
    renderSidebar(){
        const sidebar = document.querySelector(".sidebar");

        //refresh the sidebar
        sidebar.textContent = '';
        
        const sidebarHeader = document.createElement("h2");
        sidebarHeader.textContent = "Projects";

        sidebar.appendChild(sidebarHeader);
        console.log(this.controller.projects.length);
        console.log(this.controller.projects);

        //Renders all project buttons if there are projects in the project array

        if (this.controller.projects.length >= 1){

            for (let i = 0; i < this.controller.projects.length; i++){
                let projectButton = document.createElement("button");
    
                projectButton.classList.add("project--button");
                projectButton.textContent = this.controller.projects[i].name;
                projectButton.dataset.id = this.controller.projects[i].id;
    
    
    
                let deleteProjectButton = document.createElement("button");
                deleteProjectButton.dataset.id = this.controller.projects[i].id;
                deleteProjectButton.classList.add("delete--project--button");
                deleteProjectButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>';
    
                let projectDiv = document.createElement("div");
                projectDiv.classList.add("project--div");
    
    
                //If active project we highlight it
                if (this.controller.projects[i].id == this.controller.activeProject.id){
                    projectButton.classList.add("active");
                }
    
                projectDiv.appendChild(projectButton);
                projectDiv.appendChild(deleteProjectButton);
                sidebar.appendChild(projectDiv);
            }
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

        //if there is at least one project
        if (this.controller.projects.length >= 1){

            for (let i = 0; i < project.todos.length; i++){
    
                main.appendChild(this.renderTodo(project.todos[i]));
    
            }
            
            const addButton = document.createElement("button");
            addButton.classList.add("add--todo--button");
            addButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>';
            main.appendChild(addButton);
        }
         
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

        let menuButton = document.createElement("button");
        menuButton.classList.add("todo--ellipsis--menu--button");
        menuButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6" width="32" height="32"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" /></svg>'

        let menu = document.createElement("div");
        menu.classList.add("todo--ellipsis--menu");
        

        let check = document.createElement("button");
        check.dataset.id = todo.id;
        check.classList.add("dropdown--button");
        check.id = "check--button";
        check.textContent = "Complete";


        let edit = document.createElement("button");
        edit.dataset.id = todo.id;
        edit.classList.add("dropdown--button");
        edit.id = "edit--button";
        edit.textContent = "Edit";

        let del = document.createElement("button");
        del.dataset.id = todo.id;
        del.classList.add("dropdown--button");
        del.id = "delete--button";
        del.textContent = "Delete";

        
        header.appendChild(title);
        header.appendChild(menuButton);
        
        main.appendChild(header);
        main.appendChild(dueDate);
        
        
        menu.appendChild(edit);
        menu.appendChild(check);
        menu.appendChild(del);
        
        main.appendChild(menu);
        

        return main;

    }

    //rerenders the active project
    refreshScreen(){

        if (this.controller.activeProject){
            this.renderProject(this.controller.activeProject);
        } else{
            this.controller.activeProject = this.controller.projects[0];
            this.renderProject(this.controller.activeProject);
        }
        
        this.renderSidebar();

    }


}





