import "../styles.css";
import { Project } from "./Project.js";
import { ToDo } from "./ToDo.js";
import { ScreenController } from "./ScreenController.js";
import { LogicController } from "./LogicController.js";




//Dialog Control
const addProjectModal = document.querySelector("#add--project--modal");
const addProjectForm = document.querySelector("#add--project--form");

const addTodoModal = document.querySelector("#add--todo--modal");
const addTodoForm = document.querySelector("#add--todo--form");

const editTodoModal = document.querySelector("#edit--todo--modal");
const editTodoForm = document.querySelector("#edit--todo--form");



//ADD PROJECT MODAL EVENT LISTENER
addProjectModal.addEventListener("click", (e) => {

    if (e.target.id == "close--project"){
        addProjectForm.reset();
        addProjectModal.close();
        addProjectModal.classList.remove("show");

    }else if (e.target.id == "save--project"){

        e.preventDefault();

        if (addProjectForm.checkValidity()){
            const formData = new FormData(addProjectForm);
            const data = Object.fromEntries(formData.entries());

            logiController.addProject(new Project(data.name));
            scrController.refreshScreen();

            addProjectForm.reset();
            addProjectModal.close();
            addProjectModal.classList.remove("show");
        }else{
            return;
        }
    }else{
        return;
    }

});


//TODO MODAL EVENT LISTENER
addTodoModal.addEventListener("click", (e) =>{

    if (e.target.id == "close--todo"){
        addTodoForm.reset();
        addTodoModal.close();
        addTodoModal.classList.remove("show");
    } else if (e.target.id == "save--todo"){

        e.preventDefault();

        if (addTodoForm.checkValidity()){
            const formData = new FormData(addTodoForm);
            const data = Object.fromEntries(formData.entries());

            console.log(new Date(data.dueDate));

            logiController.activeProject.addTodo(new ToDo(new Date(data.dueDate), data.description, data.title, false, parseInt(data.priority)));

            //refresh screen and storage
            logiController.refreshStorage();
            scrController.refreshScreen();

            addTodoForm.reset();
            addTodoModal.close();
            addTodoModal.classList.remove("show");
        }else{
            return;
        }

    }else{
        return;
    }

});

//TODO EDIT MODAL EVENT LISTENER
editTodoModal.addEventListener("click", (e) => {

    const todoID = editTodoModal.dataset.id;
    const todo = logiController.activeProject.todos.find(t => t.id === todoID);

    if (e.target.id == "close--todo--edit"){
        editTodoForm.reset();
        editTodoModal.close();
        editTodoModal.classList.remove("show");
    } else if (e.target.id == "save--todo--edit"){

        console.log("save button was pressed");

        e.preventDefault();

        if (editTodoForm.checkValidity()){
            const formData = new FormData(editTodoForm);
            const data = Object.fromEntries(formData.entries());

            console.log(new Date(data.dueDate));

            todo.changeTitle(data.title);
            todo.changeDescription(data.description);
            todo.changePriority(parseInt(data.priority));
            todo.changeDueDate(new Date(data.dueDate));

            //Refresh Screen and Storage
            scrController.refreshScreen();
            logiController.refreshStorage();


            editTodoForm.reset();
            editTodoModal.close();
            editTodoModal.classList.remove("show");
        }else{
            return;
        }

    } 
});




//Event Delegation for sidebar
const sidebar = document.querySelector(".sidebar");

sidebar.addEventListener("click", (e) => {

    if (e.target.classList.contains("project--button")){

        const projectID = e.target.dataset.id;

        //finds the project
        const project = logiController.projects.find(p => p.id === projectID);

        if (project != undefined){

            scrController.renderProject(project);
            logiController.activeProject = project;
            scrController.refreshScreen();

        }else{
            throw new Error("Project not Found");
        }

    }else if (e.target.classList.contains("add--project--button")){
        
        addProjectModal.classList.add("show");
        addProjectModal.showModal();

    }else if (e.target.classList.contains("delete--project--button")){

        const projectID = e.target.dataset.id;
        
        logiController.deleteProject(projectID);

        //If you delete the project you are viewing redirect
        if (logiController.activeProject.id == projectID){
            logiController.activeProject = logiController.projects[0];
        }
        scrController.refreshScreen();
    }
  
});




//Event Delegation for Todo Object
const container = document.querySelector(".todo--container");

container.addEventListener("click", (e) => {

    if(e.target.id === "delete--button"){

        const todoID = e.target.dataset.id;
        logiController.activeProject.deleteTodo(todoID);
        scrController.refreshScreen();

    } else if (e.target.id === "edit--button"){

        const todoID = e.target.dataset.id;
        const todo = logiController.activeProject.todos.find(t => t.id === todoID);
        

        editTodoModal.classList.add("show");
        editTodoModal.dataset.id = todoID;
        editTodoModal.showModal();  

        //prefill the form 
        editTodoForm.title.value = todo.title;
        editTodoForm.description.value = todo.description;
        editTodoForm.dueDate.value = todo.getFormattedDate();
        editTodoForm.priority.value = todo.priority;

    } else if (e.target.classList.contains("add--todo--button")){

        addTodoModal.classList.add("show");
        addTodoModal.showModal();  

       

    } else if (e.target.id === "check--button"){

        const todoID = e.target.dataset.id;
        const todo = logiController.activeProject.todos.find(t => t.id === todoID);
        const todoDiv = e.target.closest(".todo");

        if (todo != undefined){

            todo.toggleCheck();
            todoDiv.classList.toggle("highlight");

        }else{
            throw new Error("Project not Found");
        }
    } else if (e.target.classList.contains("todo--ellipsis--menu--button")){

        const todoItem = e.target.closest(".todo");
        
        const ellipsisMenu = todoItem.querySelector(".todo--ellipsis--menu");

        ellipsisMenu.classList.toggle("show");
    }
});



const logiController = new LogicController();
const scrController = new ScreenController(logiController);
scrController.initialRender();
















