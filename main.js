const taskInput = document.getElementById("task");
const form = document.getElementById("form");
const taskDiv = document.querySelector(".tasks");


let tasks = [];






// We'll check the local storage, if we find tasks in it, we'll retrieve them and re create tasks.
function checkLocalStorage(){
  if (localStorage.getItem("tasks")) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
}

checkLocalStorage()


// Handling form
function formHandling () {
  form.onsubmit = (e) => e.preventDefault();
  taskInput.onchange = (e) => {
    if (e.target.value !== "") {
      tasks.push({title: e.target.value, isDone: false});
      e.target.value = "";
    }
    createTask()
  };

};



function createTask() {
  formHandling()
  taskDiv.textContent = "";
  tasks.map((task, index) => {
    const div = document.createElement("div");
    div.classList.add("task");
    div.id = index
    const h1 = document.createElement("h1");
    const btnDiv = document.createElement("div");
    btnDiv.classList.add("btnDiv");
    const deleteBtn = document.createElement("input");
    deleteBtn.type = "submit";
    deleteBtn.value = "Delete"
    deleteBtn.classList.add("deleteBtn");
    const updateBtn = document.createElement("input");
    updateBtn.type = "submit";
    updateBtn.value = "Update"
    updateBtn.classList.add("updateBtn");
    const doneBtn = document.createElement("input");
    doneBtn.type = "submit";
    doneBtn.value = "Done"
    doneBtn.classList.add("doneBtn");
    h1.textContent = task.title;
    btnDiv.appendChild(deleteBtn)
    btnDiv.appendChild(updateBtn)
    btnDiv.appendChild(doneBtn)
    div.appendChild(h1);
    div.appendChild(btnDiv);
    taskDiv.appendChild(div);
    handleFinishedTasks(div, index, task)
    saveTask()
});
}





function handleFinishedTasks(taskDiv, index, task){
  if(task.isDone && parseInt(taskDiv.id) === index) {
    taskDiv.classList.add("task-is-done")
  }
}

createTask()

function deleteTask() {
taskDiv.addEventListener("click", e => {
  if(e.target.classList.contains("deleteBtn")) {
    const parentElement = e.target.parentElement.parentElement
    parentElement.remove()
    tasks = tasks.filter((task, index) => parseInt(parentElement.id) !== index);
    saveTask()
    createTask()
  }
})
}


function updateTask() {
  taskDiv.addEventListener("click", e => {
    if(e.target.classList.contains("updateBtn")){
      const parentElement = e.target.parentElement.parentElement
      e.target.disabled = "disabled"
      parentElement.classList.toggle("ready");
      updateDiv(parentElement, e.target, parentElement.childNodes[0])

    }
  })
}
deleteTask()


function updateDiv(parentElement, updateBtn, title) {
  const editDiv = document.createElement("div");
  editDiv.classList.add("editDiv");
  const editInput = document.createElement("input");
  editInput.type = "text";
  parentElement.appendChild(editInput);
  const submitInput = document.createElement("input");
  submitInput.type = "submit";
  submitInput.value = "Submit";
  editDiv.appendChild(editInput)
  editDiv.appendChild(submitInput)
  parentElement.appendChild(editDiv);
  editInput.value = title.textContent
  submitInput.onclick = () => {
    updateBtn.disabled = ""
    editDiv.remove()
      title.textContent = editInput.value
      tasks = tasks.map((task, index) => {
        if(parseInt(parentElement.id) === index) {
          task.title = editInput.value
          saveTask()
        }
        return task
      })

  }
}

updateTask()

function markTask() {
  taskDiv.addEventListener("click", e => {
    if(e.target.classList.contains("doneBtn")){
      const parentElement = e.target.parentElement.parentElement
      parentElement.classList.toggle("task-is-done")
      tasks = tasks.map((task, index) => {
        // parseInt(parentElement.id) == index ? task.isDone = true : task.isDone = false
        if(parseInt(parentElement.id) == index){
          task.isDone ? task.isDone = false : task.isDone = true
        }
        return task
      })
      saveTask()
    }
  })
}
markTask()

function saveTask(){
window.localStorage.setItem("tasks", JSON.stringify(tasks))
}
