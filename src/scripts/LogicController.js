import { Project } from "./Project.js";
import { ToDo } from "./ToDo.js";
import { ScreenController } from "./ScreenController.js";

export class LogicController{

    constructor(){
        this.projects = [];
        this.activeProject;
    }

    deleteProject(projectID){
        for(let i = 0; i < this.projects.length; i++){
            if (this.projects[i].id == projectID){
                this.projects.splice(i, 1);
                return;
            }
        }

        throw new Error("No such Project found");
    }

    addProject(project){
        this.projects.push(project);
    }


    //Operations on the projects like sorting them could go here in future
}