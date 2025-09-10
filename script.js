// -------------------------------
// script.js (Browser Code Only)
// -------------------------------

const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const filterSelect = document.getElementById('filterSelect');
const searchInput = document.getElementById('searchInput');
const toggleSwitch = document.getElementById('modeToggle');

// Load tasks from localStorage or start empty
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
renderTaskList();

// -------------------------------
// Dark/Light Mode Toggle
// -------------------------------
toggleSwitch.addEventListener('change', () => {
  document.body.classList.toggle('dark', toggleSwitch.checked);
});

// -------------------------------
// Add Task
// -------------------------------
addTaskBtn.addEventListener('click', () => {
  const text = taskInput.value.trim();
  if (!text) return;

  tasks.push({ text, completed: false });
  saveAndRender();
  taskInput.value = '';
});

// -------------------------------
// Edit Task
// -------------------------------
function editTask(index) {
  const newText = prompt("Edit task:", tasks[index].text);
  if (newText !== null && newText.trim() !== '') {
    tasks[index].text = newText.trim();
    saveAndRender();
  }
}

// -------------------------------
// Toggle Complete
// -------------------------------
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveAndRender();
}

// -------------------------------
// Delete Task with animation
// -------------------------------
function deleteTask(index) {
  const li = document.querySelectorAll('li')[index];
  li.style.animation = 'fadeOut 0.3s forwards';
  setTimeout(() => {
    tasks.splice(index, 1);
    saveAndRender();
  }, 300);
}

// -------------------------------
// Save & Render
// -------------------------------
function saveAndRender() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTaskList();
}

// -------------------------------
// Render Task List
// -------------------------------
function renderTaskList() {
  const filter = filterSelect.value;
  const search = searchInput.value.toLowerCase();

  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    if (filter === 'completed' && !task.completed) return;
    if (filter === 'pending' && task.completed) return;
    if (search && !task.text.toLowerCase().includes(search)) return;

    const li = document.createElement('li');
    li.textContent = task.text;
    if (task.completed) li.classList.add('completed');
    li.addEventListener('click', () => toggleComplete(index));

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.classList.add('edit-btn');
    editBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      editTask(index);
    });

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.classList.add('delete-btn');
    delBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      deleteTask(index);
    });

    li.appendChild(editBtn);
    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}

// -------------------------------
// Filter & Search events
// -------------------------------
filterSelect.addEventListener('change', renderTaskList);
searchInput.addEventListener('input', renderTaskList);
