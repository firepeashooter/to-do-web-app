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

}

//FOR TESTING
let myTodo = new ToDo("date", "description", "title1", false, "notes", "projectLink");

console.log(myTodo.title);
myTodo.changeTitle(69);
console.log(myTodo.title);






