import Task from "../models/task.js";
import { printTask,updateTask } from "../../Controller.js";
const TaskOperations = {
    taskarr:[],
    getalltask(){
        return this.taskarr;
    },
    setalltask(newtaskarr){
        this.taskarr.join(newtaskarr);
        this.printArr();
    },
    gettotalCount(){
        return this.taskarr.length;
    },
    add(taskobj){
        // generic to specific
        let task = new Task(taskobj);
        this.taskarr.push(task);
        console.log(this.taskarr)
    },
    remove(id){
        this.taskarr = this.taskarr.filter((e)=>(e.id!==id));
        this.printArr();
       },
    search(taskid){
        const searchele =  this.taskarr.filter((e)=>(e.id===taskid));
        const tbody = document.querySelector('#itemstask');
    tbody.innerHTML = '';
        if(!searchele.length ==0){
            for (const key of searchele ) {
                printTask(key);
             }
        }
        
    },
    update(id){
        
        const obj = this.taskarr.find((e)=>(e.id===id));
        this.remove(id);
        updateTask(obj);
    },
    sort(){

    },
    printArr(){
        const tbody = document.querySelector('#itemstask');
    tbody.innerHTML = '';
        if(!this.taskarr.length ==0){
            for (const key of this.taskarr ) {
                printTask(key);
             }
        }
    }

}

export default TaskOperations;