const themeIcon = document.querySelector('#theme-icon');
const bgImageDesktop = document.querySelector('#bg-img-desktop');
const bgImageMobile = document.querySelector('#bg-img-mobile');
const inputField = document.querySelector('#input-field');
const taskList = document.querySelector('.task-list')

function changeTheme(){
    if((themeIcon.src).includes('moon')){
        themeIcon.src = 'images/icon-sun.svg';
        bgImageDesktop.src = 'images/bg-desktop-dark.jpg';
        bgImageMobile.src = 'images/bg-mobile-dark.jpg';
        document.body.removeAttribute('class');
        document.body.setAttribute('class', 'dark-theme');
    }
    else if((themeIcon.src).includes('sun')){
        themeIcon.src = 'images/icon-moon.svg';
        bgImageDesktop.src = 'images/bg-desktop-light.jpg';
        bgImageMobile.src = 'images/bg-mobile-light.jpg';
        document.body.removeAttribute('class');
        document.body.setAttribute('class', 'light-theme');
    }
}

themeIcon.addEventListener('click', changeTheme);
