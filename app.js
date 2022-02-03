// Define UI Vars
const form = document.querySelector('#task-form')
const taskList = document.querySelector('.collection')
const clearBtn = document.querySelector('.clear-tasks')
const filter = document.querySelector('#filter')
const taskInput = document.querySelector('#task')

// Load All Event Listeners
loadEventListeners();

function loadEventListeners(){
  // DOM Load Event
  document.addEventListener('DOMContentLoaded', getTasks)
  // Add Task
  form.addEventListener('submit', AddTask)
  // Remove Task
  taskList.addEventListener('click', removeTask)
  // Clear Tasks
  clearBtn.addEventListener('click', clearTasks)
  // Filter Tasks
  filter.addEventListener('keyup', filterTasks)
}
// Get Tasks from LS
function getTasks(){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = []
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }
  tasks.forEach(function(task){
    // Create li
  const li = document.createElement('li')
  // Create class
  li.className = 'collection-item'
  // Create a text node and append
  li.appendChild(document.createTextNode(task))
  // Create a new link 
  const link = document.createElement('a')
  // Add class
  link.className = 'delete-item secondary-content'
  // Add icon HTML
  link.innerHTML = '<i class="fa fa-remove"></i>'
  // Append link to li
  li.appendChild(link)
  // Append li to ul
  taskList.appendChild(li)
  // Add to Local Storage
  })
}

// Add task
function AddTask(e){
  if(taskInput.value === ''){
    alert('Add a task')
  }
  // Create li
  const li = document.createElement('li')
  // Create class
  li.className = 'collection-item'
  // Create a text node and append
  li.appendChild(document.createTextNode(taskInput.value))
  // Create a new link 
  const link = document.createElement('a')
  // Add class
  link.className = 'delete-item secondary-content'
  // Add icon HTML
  link.innerHTML = '<i class="fa fa-remove"></i>'
  // Append link to li
  li.appendChild(link)
  // Append li to ul
  taskList.appendChild(li)
  // Add to Local Storage
  storeTaskInLocalStorage(taskInput.value)
  // Clear
  taskInput.value = ''
  e.preventDefault()
}
// Store Task
function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = []
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }
  tasks.push(task)
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

// Remove Task
function removeTask(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are you sure?'))
    e.target.parentElement.parentElement.remove()
    // Remove from LS
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
  }
}

// Remove from LS
function removeTaskFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = []
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1)

    }
  })
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

// Clear tasks
function clearTasks(){
  // Slower
  // taskList.innerHTML = ''
  // Faster
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild)
  }
  // Clear tasks from LS
  clearTasksFromLocalStorage();
}
// Clear Tasks from LS
function clearTasksFromLocalStorage(){
  localStorage.clear()
}

// Filter Tasks
function filterTasks(e){
  const text = e.target.value.toLowerCase()
  document.querySelectorAll('li').forEach(function(task){
    const item = task.firstChild.textContent
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block'
    } else {
      task.style.display = 'none'
    }
  })
}


