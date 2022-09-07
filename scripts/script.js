const themeIcon = document.querySelector('#theme-icon');
const bgImageDesktop = document.querySelector('#bg-img-desktop');
const bgImageMobile = document.querySelector('#bg-img-mobile');
const inputField = document.querySelector('#input-field');
const taskList = document.querySelector('.task-list');
const noTasksMsg = document.querySelector('.no-tasks-toShow');
const itemsLeft = document.querySelector('.items-left');
const viewAllDesktop = document.querySelector('.view-all-desktop');
const viewActiveDesktop = document.querySelector('.view-active-desktop');
const viewCompletedDesktop = document.querySelector('.view-completed-desktop');
const viewAllMobile = document.querySelector('.view-all-mobile');
const viewActiveMobile = document.querySelector('.view-active-mobile');
const viewCompletedMobile = document.querySelector('.view-completed-mobile');
const clearCompletedTasks = document.querySelector('.clear-completed-tasks');

function changeTheme() {
    if ((themeIcon.src).includes('moon')) {
        themeIcon.src = 'images/icon-sun.svg';
        bgImageDesktop.src = 'images/bg-desktop-dark.jpg';
        bgImageMobile.src = 'images/bg-mobile-dark.jpg';
        document.body.removeAttribute('class');
        document.body.setAttribute('class', 'dark-theme');
    }
    else if ((themeIcon.src).includes('sun')) {
        themeIcon.src = 'images/icon-moon.svg';
        bgImageDesktop.src = 'images/bg-desktop-light.jpg';
        bgImageMobile.src = 'images/bg-mobile-light.jpg';
        document.body.removeAttribute('class');
        document.body.setAttribute('class', 'light-theme');
    }
}

themeIcon.addEventListener('click', changeTheme);

let taskId = 0;
let numberOfTasksLeft = 0;

function addTaskToList() {
    const task = document.createElement('div');
    task.setAttribute('class', 'task');
    task.setAttribute('draggable', 'true');
    taskId++;
    task.setAttribute('id', `task${taskId}`);
    task.innerHTML =
    `<label class='checkbox-container'>
        <input type='checkbox' class='entered-task-check'>
        <span class='checkmark'></span>
    </label>
    <p class='entered-task-text'>${inputField.value}</p>
    <img class='x-icon' src='images/icon-cross.svg' draggable='false'>`;
    taskList.appendChild(task);
    numberOfTasksLeft++;
}

function updateNumberOfTasksLeft() {
    itemsLeft.textContent = `${numberOfTasksLeft} items left`;
}

function toggleNoTasksMsg() {
    if (taskList.childElementCount > 0) {
        noTasksMsg.style.display = 'none';
    }
    else {
        noTasksMsg.style.display = 'block';
    }
}

function callFunctionsForInputField(e){
    if (e.key === 'Enter' && inputField.value != '') {
        addTaskToList();
        updateNumberOfTasksLeft();
        toggleNoTasksMsg();
        inputField.value = '';
    }
}

inputField.addEventListener('keydown', callFunctionsForInputField);

function removeTask(e) {
    const taskDivChildNodes = e.target.parentNode.childNodes;
    e.target.parentNode.remove();
    if (!taskDivChildNodes[0].childNodes[1].checked) {
        numberOfTasksLeft--;
    }
    updateNumberOfTasksLeft();
    toggleNoTasksMsg();
}

function taskChecked(e) {
    const taskDivChildNodes = e.target.parentNode.parentNode.childNodes;
    taskDivChildNodes.forEach(child => {
        if (child.tagName === 'P') {
            child.classList.toggle('checked-task');
        }
    });
    if (e.target.checked) {
        numberOfTasksLeft--;
        updateNumberOfTasksLeft();
    }
    else {
        numberOfTasksLeft++;
        updateNumberOfTasksLeft();
    }
}

taskList.addEventListener('click', function (e) {
    if (e.target.className === 'x-icon') {
        removeTask(e);
    }
    if (e.target.className === 'entered-task-check') {
        taskChecked(e);
    }
});

function changeCssOfViewOption(activeBtn, UnactiveBtn1, UnactiveBtn2) {
    activeBtn.classList.add('active-view-option');
    activeBtn.classList.remove('non-active-view-option');
    UnactiveBtn1.classList.add('non-active-view-option');
    UnactiveBtn1.classList.remove('active-view-option');
    UnactiveBtn2.classList.add('non-active-view-option');
    UnactiveBtn2.classList.remove('active-view-option');
}

function showAllTasks() {
    const tasks = taskList.childNodes;
    tasks.forEach(task => {
        if (task.tagName === 'DIV') {
            task.style.display = 'flex';
        }
    });
}

function showActiveTasks() {
    const tasks = taskList.childNodes;
    tasks.forEach(task => {
        if (task.tagName === 'DIV') {
            if (task.childNodes[0].childNodes[1].checked) {
                task.style.display = 'none';
            }
            if (!task.childNodes[0].childNodes[1].checked) {
                task.style.display = 'flex';
            }
        }
    });
}

function showCompletedTasks() {
    const tasks = taskList.childNodes;
    tasks.forEach(task => {
        if (task.tagName === 'DIV') {
            if (!task.childNodes[0].childNodes[1].checked) {
                task.style.display = 'none';
            }
            if (task.childNodes[0].childNodes[1].checked) {
                task.style.display = 'flex';
            }
        }
    });
}

viewAllDesktop.addEventListener('click', function(e){
    changeCssOfViewOption(e.target, viewActiveDesktop, viewCompletedDesktop);
    showAllTasks();
    toggleNoTasksMsg();
});

viewActiveDesktop.addEventListener('click', function(e){
    changeCssOfViewOption(e.target, viewAllDesktop, viewCompletedDesktop);
    showActiveTasks();
    toggleNoTasksMsg();
});

viewCompletedDesktop.addEventListener('click', function(e){
    changeCssOfViewOption(e.target, viewAllDesktop, viewActiveDesktop);
    showCompletedTasks();
    toggleNoTasksMsg();
});

viewAllMobile.addEventListener('click', function(e){
    changeCssOfViewOption(e.target, viewActiveMobile, viewCompletedMobile);
    showAllTasks();
    toggleNoTasksMsg();
});

viewActiveMobile.addEventListener('click', function(e){
    changeCssOfViewOption(e.target, viewAllMobile, viewCompletedMobile);
    showActiveTasks();
    toggleNoTasksMsg();
});

viewCompletedMobile.addEventListener('click', function(e){
    changeCssOfViewOption(e.target, viewAllMobile, viewActiveDesktop);
    showCompletedTasks();
    toggleNoTasksMsg();
});

window.onload = changeCssOfViewOption(viewAllDesktop, viewActiveDesktop, viewCompletedDesktop);
window.onload = changeCssOfViewOption(viewAllMobile, viewActiveMobile, viewCompletedMobile);

function clearCompleted() {
    const tasks = taskList.childNodes;
    for (let i = tasks.length - 1; i > 0; i--) {
        if (tasks[i].tagName === 'DIV') {
            if (tasks[i].childNodes[0].childNodes[1].checked) {
                tasks[i].remove();
            }
        }
    }
    toggleNoTasksMsg();
}

clearCompletedTasks.addEventListener('click', clearCompleted);

function dragStart(e) {
    if (e.target.className === 'task') {
        e.dataTransfer.setData('text', e.target.id);
    }
}

function dragEnter(e) {
    e.preventDefault();
    if (e.target.className === 'task') {
        e.target.classList.add('drag-over');
    }
}

function dragOver(e) {
    e.preventDefault();
    if (e.target.className === 'task') {
        e.target.classList.add('drag-over')
    }
}

function dragLeave(e) {
    e.target.classList.remove('drag-over');
}

let dragIndex = 0;
let clone = ' ';

function drop(e) {
    clone = e.target.cloneNode(true);
    let data = e.dataTransfer.getData('text');
    if (clone.id !== data && e.target.className === 'task drag-over') {
        let nodelist = taskList.childNodes;
        for (let i = 1; i < nodelist.length; i++) {
            if (nodelist[i].id === data) {
                dragIndex = i;
            }
        }
        taskList.replaceChild(document.getElementById(data), e.target);
        taskList.insertBefore(clone, taskList.childNodes[dragIndex]);
        clone.classList.remove('drag-over');
    }
    e.target.classList.remove('drag-over');
}

taskList.addEventListener('mousedown', function () {
    let tasks = taskList.childNodes;
    tasks.forEach(task => {
        task.addEventListener('dragstart', dragStart);
        task.addEventListener('dragenter', dragEnter);
        task.addEventListener('dragover', dragOver);
        task.addEventListener('dragleave', dragLeave);
        task.addEventListener('drop', drop);
    });
});