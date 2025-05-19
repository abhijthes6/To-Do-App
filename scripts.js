const input = document.querySelector("#task");
const addButton = document.querySelector("#add");
const taskList = document.querySelector("#taskList");
const clearButton = document.querySelector("#clear");

let n = localStorage.length;

addButton.onclick = () => {
    if(input.value){
        event.preventDefault();
        const task = document.createElement("li");
        task.textContent = input.value;
        taskList.appendChild(task);
        task.className = "task";
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete";
        task.appendChild(deleteButton);

        saveTasks();
        input.value = "";
    }
    stats();
}
clearButton.onclick = () => {
    event.preventDefault();
    localStorage.clear();
    n = 0;
    taskList.innerHTML = "";
    stats();
}



const saveTasks = () => {
    localStorage.setItem("data", taskList.innerHTML);
}
const loadTasks = () => {
    taskList.innerHTML = localStorage.getItem("data");
    console.log(localStorage.getItem("data"));
    console.log(taskList.innerHTML);
}
loadTasks();

taskList.onclick = (e) => {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
    }else if (e.target.className === "delete") {
        e.target.parentElement.remove();
    }
    saveTasks();
stats();

}

const stats = () =>
{
    if(localStorage.length === 0){
        document.getElementById("totalTasks").innerHTML = "Total tasks: 0";
        document.getElementById("completedTasks").innerHTML = "Tasks completed: 0";
        document.getElementById("progress-bar").style.width = "0%";
        return;
    }
    const tasks = document.getElementsByClassName("task");
    const checkedTasks = document.getElementsByClassName("checked");
    let totalTasks = tasks.length;
    let completedTasks = checkedTasks.length;
    document.getElementById("totalTasks").innerHTML = "Total tasks:" + totalTasks;
    document.getElementById("completedTasks").innerHTML = "Tasks completed:" + completedTasks;
    let percent = (completedTasks / totalTasks) * 100;
    document.getElementById("progress-bar").style.width = percent + "%";
}
stats();