import {format} from "date-fns";

class ToDo{

    //TODO: VALIDATE THE DATA COMING INTO THIS CLASS
    constructor(date, description, title, done, notes, project, priority=0){

        this.date = date;
        this.description = description;
        this.title = title;
        this.done = done;
        this.notes = notes;
        this.project = project;  
        this.priority = priority;   
        
    }

    toggleCheck(){

        if (this.done == true){
            this.done = false;
        }else{
            this.done = true;
        }
    }

    changePriority(n){

        if (Number.isInteger(n)){
            if (n >= 0 && n <= 5){
                this.priority = n;
            }else{
                throw new Error("Priority must be a number between 0 and 5");
            }

        }else{
            throw new Error("Priority Must be a Number");
        }
    }

    changeTitle(newTitle){

        if (typeof newTitle === "string"){
            if (newTitle.length <= 30){
                this.title = newTitle
            }else{
                throw new Error("Title must be 30 or less characters");
            }
        }else{
            throw new Error("Title must be a string");
        }
    }

    changeDescription(newDescription){

        if (typeof newDescription === "string"){
            this.description = newDescription;
        }else{
            throw new Error("Description must be a string");
        }
    }


}

//FOR TESTING

let dueDate = format(new Date(2025, 10, 3), "MM/dd/yyyy");
let myTodo = new ToDo(dueDate, "description", "title1", false, "notes", "projectLink");

console.log(myTodo);
myTodo.changeDescription("Charyou tree");
console.log(myTodo);








