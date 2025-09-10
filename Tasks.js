// tasks.js
let tasksArray = [];

function addTask(taskText) {
  tasksArray.push({ text: taskText, completed: false });
}

function deleteTask(taskText) {
  tasksArray = tasksArray.filter(t => t.text !== taskText);
}

function resetTasks() {
  tasksArray = [];
}

// Getter for tasks
function tasks() {
  return tasksArray;
}

module.exports = { addTask, deleteTask, resetTasks, tasks };
