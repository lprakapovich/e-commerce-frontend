import Home from './UI/home.js';

window.onload = () => {
    router();
}

const router = () => {
    const main = document.getElementById('main-container');
    main.innerHTML = Home.render();
}
