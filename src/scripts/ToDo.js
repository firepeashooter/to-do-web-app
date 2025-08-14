class ToDO{

    //TODO: VALIDATE THE DATA COMING INTO THIS CLASS
    constructor(date, description, title, done, notes, project){

        this.date = date;
        this.description = description;
        this.title = title;
        this.done = done;
        this.notes = notes;
        this.project = project;     
        
    }

    toggleCheck(){

        if (this.done == true){
            this.done = false;
        }else{
            this.done = true;
        }
    }


}



