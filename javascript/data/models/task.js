class Task{
    constructor(taskobj){
        // this.id = id;
        // this.title = title;
        // this.desc = desc;
        // this.color = color;
        // this.date = date;
        // this.url = url;
        for (const key in taskobj) {
            this[key] = taskobj[key];
        }
        this.ismarked = false
    }
}

export default Task;
// id,title,desc,color,date,url