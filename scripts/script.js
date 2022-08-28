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

let numberOfTasks = 0;

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

function addTaskToList() {
    const task = document.createElement('div');
    task.setAttribute('class', 'task');
    task.innerHTML =
    `<label class="checkbox-container">
        <input type="checkbox" class="entered-task-check">
        <span class="checkmark"></span>
    </label>
    <p class="entered-task-text">${inputField.value}</p>
    <img class="x-icon" src="images/icon-cross.svg">`;
    taskList.appendChild(task);
    numberOfTasks++;
}

function updateNumberOfTasks() {
    itemsLeft.textContent = `${numberOfTasks} items left`;
}

function toggleNoTasksMsg() {
    if (taskList.childElementCount > 0) {
        noTasksMsg.style.display = 'none';
    }
    else {
        noTasksMsg.style.display = 'block';
    }
}

inputField.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && inputField.value != '') {
        addTaskToList();
        updateNumberOfTasks();
        toggleNoTasksMsg();
        inputField.value = '';
    }
});

taskList.addEventListener('click', function (e) {
    let childNodes = undefined;
    if (e.target.className === 'x-icon') {
        childNodes = e.target.parentNode.childNodes;
        e.target.parentNode.remove();
        let label = undefined;
        childNodes.forEach(child => {
            if (child.className === 'checkbox-container') {
                label = child;
            }
        });
        if (!label.childNodes[1].checked) {
            numberOfTasks--;
        }
        updateNumberOfTasks();
        toggleNoTasksMsg();
    }
    if (e.target.className === 'entered-task-check') {
        childNodes = e.target.parentNode.parentNode.childNodes;
        childNodes.forEach(child => {
            if (child.tagName === 'P') {
                child.classList.toggle('checked-task');
            }
        });
        if (e.target.checked) {
            numberOfTasks--;
            updateNumberOfTasks();
        }
        else {
            numberOfTasks++;
            updateNumberOfTasks();
        }
    }
});

function changeViewOptionCSS(op1, op2, op3) {
    op1.classList.add('active-view-option');
    op1.classList.remove('non-active-view-option');
    op2.classList.add('non-active-view-option');
    op2.classList.remove('active-view-option');
    op3.classList.add('non-active-view-option');
    op3.classList.remove('active-view-option');
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

viewAllDesktop.addEventListener('click', function (e) {
    let target = e.target;
    changeViewOptionCSS(target, viewActiveDesktop, viewCompletedDesktop);
    showAllTasks();
    toggleNoTasksMsg();
});

viewActiveDesktop.addEventListener('click', function (e) {
    let target = e.target;
    changeViewOptionCSS(target, viewAllDesktop, viewCompletedDesktop);
    showActiveTasks();
    toggleNoTasksMsg();
});

viewCompletedDesktop.addEventListener('click', function (e) {
    let target = e.target;
    changeViewOptionCSS(target, viewAllDesktop, viewActiveDesktop);
    showCompletedTasks();
    toggleNoTasksMsg();
});

viewAllMobile.addEventListener('click', function (e) {
    let target = e.target;
    changeViewOptionCSS(target, viewActiveMobile, viewCompletedMobile);
    showAllTasks();
    toggleNoTasksMsg();
});

viewActiveMobile.addEventListener('click', function (e) {
    let target = e.target;
    changeViewOptionCSS(target, viewAllMobile, viewCompletedMobile);
    showActiveTasks();
    toggleNoTasksMsg();
});

viewCompletedMobile.addEventListener('click', function (e) {
    let target = e.target;
    changeViewOptionCSS(target, viewAllMobile, viewActiveMobile);
    showCompletedTasks();
    toggleNoTasksMsg();
});

window.onload = changeViewOptionCSS(viewAllDesktop, viewActiveDesktop, viewCompletedDesktop);
window.onload = changeViewOptionCSS(viewAllMobile, viewActiveMobile, viewCompletedMobile);

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