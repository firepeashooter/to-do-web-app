import {format, isValid} from "date-fns";

export class ToDo{

    constructor(dueDate, description, title, done, priority=0){

        if (isValid(dueDate)){
            this.dueDate = dueDate;
        }else{
            throw new Error("due Date must be a valid date");
        }

        if (typeof description === "string"){
            this.description = description;
        }else{
            throw new Error("Description must be a string");
        }

        if (typeof title === "string"){
            if (title.length <= 30){
                this.title = title;
            }else{
                throw new Error("Title must be 30 or less characters");
            }
        }else{
            throw new Error("Title must be a string");
        }

        if (typeof done === "boolean"){
            this.done = done;
        }else{
            throw new Error("Check must be a boolean value");
        }
        
         if (Number.isInteger(priority)){
            if (priority >= 0 && priority <= 5){
                this.priority = priority;
            }else{
                throw new Error("Priority must be a number between 0 and 5");
            }

        }else{
            throw new Error("Priority Must be a Number");
        }

        this.id == crypto.randomUUID();
        
    }

    toggleCheck(){
        this.done = !this.done;
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

    changeDueDate(newDate){

        if (isValid(newDate)){
            this.dueDate = newDate;

        }else{
            throw new Error("Due Date must be a valid date");
        }
    }

    getFormattedDate(){
        return format(this.dueDate, "MM/dd/yyyy");
    }


}







