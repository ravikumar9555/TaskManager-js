import TaskOperations from "./data/services/task-services.js";
window.addEventListener("load", init);
function init() {
  bindEvents();
  showCount();
}

function bindEvents() {
  const searchbox = document.querySelector("#searchbox");
  const form = document.querySelector(".formbox");
  document.getElementById("addbtn").addEventListener("click", () => {
    form.classList.add("showform");
  });

  document.getElementById("closeform").addEventListener("click", () => {
    form.classList.remove("showform");
  });
  document.querySelector("#search").addEventListener("click", search);
  document.getElementById("submittask").addEventListener("click", addtask);
  document.querySelector("#save").addEventListener("click", save);
  document.querySelector("#load").addEventListener("click", load);
  document.querySelector("#search").addEventListener("click", () => {
    searchbox.classList.toggle("showform");
    search;
  });
}

function addtask() {
  const fields = ["id", "title", "desc", "color", "date", "url"];
  // const id = document.getElementById('id').value;
  const taskobj = {};
  for (let field of fields) {
    let fieldvalue = document.getElementById(`${field}`).value;

    if (fieldvalue === "" || fieldvalue === undefined || fieldvalue === null) {
      return;
    } else {
      taskobj[field] = fieldvalue;
    }
  }
  TaskOperations.add(taskobj);
  printTask(taskobj);
  for (let field of fields) {
   document.getElementById(`${field}`).value = "";
  }
}
function edit() {
  const form = document.querySelector(".formbox");
  const icon = this;
  TaskOperations.update(icon.getAttribute("task-id"));
  form.classList.add("showform");
}
function toggleDelete() {
  const icon = this;
  let tr = icon.parentNode.parentNode;
  tr.classList.toggle("table-danger");
  if (confirm("Are you Sure...") == true) {
    TaskOperations.remove(icon.getAttribute("task-id"));
  } else {
    tr.classList.toggle("table-danger");
  }
}
function createicon(iconname, fn, taskid) {
  const icontag = document.createElement("i");
  icontag.className = `fa-solid ${iconname}`;
  icontag.addEventListener("click", fn);
  icontag.setAttribute("task-id", taskid);
  return icontag;
}

export function printTask(taskobj) {
  const tbody = document.querySelector("#itemstask");
  const tr = document.createElement("tr");

  for (let key in taskobj) {
    let td = tr.insertCell();
    td.innerText = taskobj[key];
  }
  let td = tr.insertCell();
  td.appendChild(createicon("fa-pen-to-square", edit, taskobj.id));
  td.appendChild(createicon("fa-trash-can", toggleDelete, taskobj.id));
  tbody.appendChild(tr);
  showCount();
}

function showCount() {
  document.querySelector("#total").innerText = TaskOperations.gettotalCount();
  document.querySelector("#marked").innerText = TaskOperations.gettotalCount();
  document.querySelector("#unmarked").innerText =
    TaskOperations.gettotalCount();
}

export function updateTask(obj) {
  const fields = ["id", "title", "desc", "color", "date", "url"];
  // const id = document.getElementById('id').value;

  for (let field of fields) {
    document.getElementById(`${field}`).value = obj[field];
  }
}
function save() {
  if (window.localStorage) {
    const alltask = TaskOperations.getalltask();
    localStorage.tasks = JSON.stringify(alltask);
    alert("Data Stored");
  } else {
    alert("Outdated Browser No Support of local storage");
  }
}
function load() {
  if (window.localStorage) {
    const alltask = localStorage.tasks;
    TaskOperations.setalltask(JSON.parse(alltask));
  } else {
    alert("Outdated Browser No Support of local storage");
  }
}

function search() {
  // document.querySelector('#searchbtn').addEventListener(
  //     'click',
  //     ()=>{
  //         const searchinput = document.querySelector("searchinput").value;

  //         if(searchinput == ""){
  //             alert("Write Id Or Task title");
  //         }
  //         else{
  //             TaskOperations.search(searchinput);
  //         }
  //     }
  // )
  const value = prompt("enter Id");
  if (value == "") {
    alert("Write Id Or Task title");
  } else {
    TaskOperations.search(value);
  }
}
