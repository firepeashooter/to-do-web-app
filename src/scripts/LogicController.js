import { Project } from "./Project";
import { ToDo } from "./ToDo";

export class LogicController{

    constructor(){
        this.projects = [];
        this.activeProject;
    }

    loadProjects(){

        //iterate through local storage
        for(let i = 0; i < localStorage.length; i++){
            const key = localStorage.key(i);

            if(key.startsWith("project:")){

                const projectData = JSON.parse(localStorage.getItem(key));

                console.log(projectData);


                //Converting todos back from JSON (JSON returns a raw object not a todo)
                const todos = projectData.todos.map(t => {
                    
                    const due = new Date(t.dueDate);
                    return new ToDo(due, t.description, t.title, t.done, t.priority)
                });

                let project = new Project(projectData.name);
                project.todos = todos;

                this.projects.push(project);

            }
        }

    }

    deleteProject(projectID){
        for(let i = 0; i < this.projects.length; i++){
            if (this.projects[i].id == projectID){
                localStorage.removeItem(`project:${projectID}`);
                this.projects.splice(i, 1);
                return;
            }
        }

        throw new Error("No such Project found");
    }

    addProject(project){
        this.projects.push(project);
        this.refreshStorage();
    }

    //save project (to localStorage)
    saveProject(project){
        const projectData = JSON.stringify(project);
        localStorage.setItem(`project:${project.id}`, projectData);
    }

    //Function to add all projects to local storage and update existing ones
    refreshStorage(){
        
        for (let i = 0; i < this.projects.length; i++){
            this.saveProject(this.projects[i]);
        }
    }

    //for debugging
    clearStorage(){
        localStorage.clear();
    }


   


    //Operations on the projects like sorting them could go here in future
}