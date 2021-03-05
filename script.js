
// variables

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];



const newTaskForm = document.querySelector('[data-new-task-form]');
const newTaskInput = document.querySelector('[data-new-task-input]');
const taskContainer = document.querySelector('[data-task-container]');
const taskTemplate = document.getElementById('task__template');
const countElement = document.querySelector('[data-count-element]');
const filterBtns = document.querySelectorAll('.filter__btn');
const allTasksBtn = document.querySelector('.all');
const themeSwitcher = document.querySelector('.theme__switcher');
const root = document.documentElement;



// functions

function createTask(name) {
    return {id: Date.now().toString(), name: name, complete: false};
}


function saveAndRender() {
    renderTasks(tasks);
    saveTasks();
}


function renderTasks(tList) {
    
    clearTaskContainer(taskContainer);
    
    tList.forEach(task => {
        const taskElement = document.importNode(taskTemplate.content, true);
        const checkbox = taskElement.querySelector('input');
        checkbox.id = task.id;
        checkbox.checked = task.complete;
        const label = taskElement.querySelector('label');
        label.append(task.name);
        label.htmlFor = task.id;
        taskContainer.appendChild(taskElement);
    });

    renderCount(tList);

}


function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function clearTaskContainer(element) {
    
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}


function renderCount(tList) {
    const count = tList.filter(task => !task.complete).length;
    const taskString = count === 1 ? 'task' : 'tasks';
    countElement.innerText = `${count} ${taskString} left`;
}


function clearCompletedTasks() {
    tasks = tasks.filter(task => !task.complete);
    saveAndRender();
}


function showActiveTasks() {
    let activeTasks = [...tasks];
    activeTasks = activeTasks.filter(task => !task.complete);
    renderTasks(activeTasks);
}


function showAllTasks() {
    renderTasks(tasks);
}


function updateCustomProperties(e) {
    const icon = e.currentTarget.firstChild;
    if (icon.getAttribute('src') === 'icon-sun.svg') {
        icon.setAttribute('src', 'icon-moon.svg');
        root.style.setProperty('--bg-image-desk', 'url(bg-desktop-light.jpg)');
        root.style.setProperty('--bg-image-mob', 'url(bg-mobile-light.jpg)');
        root.style.setProperty('--clr-vry-dark-ds-blue', 'rgb(255, 255, 255)');
        root.style.setProperty('--clr-light-grayish-blue', 'hsl(235, 24%, 19%)');
        root.style.setProperty('--clr-dark-blue', 'hsl(0, 0%, 98%)');
    } else {
        icon.setAttribute('src', 'icon-sun.svg'); 
        root.style.setProperty('--bg-image-desk', 'url(bg-desktop-dark.jpg)');
        root.style.setProperty('--bg-image-mob', 'url(bg-mobile-dark.jpg)');
        root.style.setProperty('--clr-vry-dark-ds-blue', 'hsl(235, 24%, 19%)');
        root.style.setProperty('--clr-light-grayish-blue', 'hsl(234, 39%, 85%)');
        root.style.setProperty('--clr-dark-blue', 'hsl(235, 21%, 11%)');
    }
    
}


function showCompletedTasks() {
    let completeTasks = [...tasks];
    completeTasks = completeTasks.filter(task => task.complete);
    renderTasks(completeTasks);
}


renderTasks(tasks);


// event listeners

newTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskName = newTaskInput.value;
    if (newTaskInput.value === null || newTaskInput.value === '') return;
    const task = createTask(taskName);
    newTaskInput.value = null;
    tasks.push(task);
    saveAndRender();
})


taskContainer.addEventListener('change', (e) => {

    if (e.target.tagName.toLowerCase() === 'input') {
        const selectedTask = tasks.find(task => task.id === e.target.id);
        selectedTask.complete = e.target.checked;
        saveTasks();
        renderCount(tasks);
    }
})

filterBtns.forEach(btn => btn.addEventListener('click', (e) => {
    if (e.target.classList.contains('all')) {
        showAllTasks();
    }

    if (e.target.classList.contains('active')) {
        showActiveTasks();
    }

    if (e.target.classList.contains('completed')) {
        showCompletedTasks();
    }

    if (e.target.classList.contains('clear__completed')) {
        clearCompletedTasks();
    } 
}))


themeSwitcher.addEventListener('click', updateCustomProperties);