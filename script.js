let tasks = [];
let taskIdCounter = 0;

// DOM elements
const taskInput = document.getElementById("new-task");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");
const filterTasks = document.getElementById("filter-tasks");

addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    addTask(taskText);
    taskInput.value = "";
  }
});

function addTask(text) {
  const task = {
    id: taskIdCounter++,
    text: text,
    completed: false,
  };
  tasks.push(task);
  renderTasks();
}

filterTasks.addEventListener("change", renderTasks);

function renderTasks() {
  const filter = filterTasks.value;
  taskList.innerHTML = "";

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "completed") return task.completed;
    if (filter === "incomplete") return !task.completed;
  });

  filteredTasks.forEach((task) => {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);

    const taskText = document.createElement("span");
    taskText.className = `task-text ${task.completed ? "completed" : ""}`;
    taskText.textContent = task.text;

    const taskActions = document.createElement("div");
    taskActions.className = "task-actions";

    const completeBtn = document.createElement("button");
    completeBtn.className = "complete-btn";
    completeBtn.textContent = task.completed ? "Unmark" : "Complete";
    completeBtn.addEventListener("click", () => toggleTaskCompletion(task.id));

    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => editTask(task.id));

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteTask(task.id));

    taskActions.appendChild(completeBtn);
    taskActions.appendChild(editBtn);
    taskActions.appendChild(deleteBtn);

    li.appendChild(taskText);
    li.appendChild(taskActions);
    taskList.appendChild(li);
  });
}

function toggleTaskCompletion(taskId) {
  const task = tasks.find((task) => task.id === taskId);
  if (task) {
    task.completed = !task.completed;
    renderTasks();
  }
}

function editTask(taskId) {
  const task = tasks.find((task) => task.id === taskId);
  if (task) {
    const newTaskText = prompt("Edit your task:", task.text);
    if (newTaskText !== null) {
      task.text = newTaskText.trim() ? newTaskText : task.text;
      renderTasks();
    }
  }
}

function deleteTask(taskId) {
  tasks = tasks.filter((task) => task.id !== taskId);
  renderTasks();
}
