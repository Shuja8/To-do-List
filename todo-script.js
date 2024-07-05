document.addEventListener('DOMContentLoaded', loadTasks);
document.querySelector('#task-form').addEventListener('submit', addTask);
document.querySelector('#task-list').addEventListener('click', handleTask);

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => displayTask(task));
}

function addTask(e) {
    e.preventDefault();
    const taskInput = document.querySelector('#new-task');
    const taskText = taskInput.value.trim();
    
    if (taskText) {
        const task = { text: taskText, completed: false };
        displayTask(task);
        saveTask(task);
        taskInput.value = '';
    }
}

function displayTask(task) {
    const taskList = document.querySelector('#task-list');
    const taskItem = document.createElement('li');
    taskItem.textContent = task.text;

    if (task.completed) {
        taskItem.classList.add('completed');
    }

    const completeBtn = document.createElement('button');
    completeBtn.textContent = task.completed ? 'Uncomplete' : 'Complete';
    completeBtn.classList.add('complete-btn');

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.classList.add('edit-btn');

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');

    taskItem.appendChild(completeBtn);
    taskItem.appendChild(editBtn);
    taskItem.appendChild(deleteBtn);

    taskList.appendChild(taskItem);
}

function saveTask(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function handleTask(e) {
    const button = e.target;
    const taskItem = button.parentElement;
    const taskText = taskItem.firstChild.textContent;
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    if (button.classList.contains('complete-btn')) {
        taskItem.classList.toggle('completed');
        const task = tasks.find(t => t.text === taskText);
        task.completed = !task.completed;
        button.textContent = task.completed ? 'Uncomplete' : 'Complete';
    }

    if (button.classList.contains('edit-btn')) {
        const newTaskText = prompt('Edit Task', taskText);
        if (newTaskText) {
            taskItem.firstChild.textContent = newTaskText;
            const task = tasks.find(t => t.text === taskText);
            task.text = newTaskText;
        }
    }

    if (button.classList.contains('delete-btn')) {
        taskItem.remove();
        const updatedTasks = tasks.filter(t => t.text !== taskText);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
}
