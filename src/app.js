import HomeScreen from './UI/HomeScreen.js';
import ProductScreen from "./UI/ProductScreen.js";
import {parseRequestUrl} from "./util.js";
import ErrorScreen from "./UI/ErrorScreen.js";

const routes = {
    '/' : HomeScreen,
    '/books' : HomeScreen,
    '/product/:id': ProductScreen
}

window.onload = () => {
    router();
    window.addEventListener('hashchange', router);
}

const router = () => {
    const request = parseRequestUrl();
    const parsedUrl = (request.resource ? `/${request.resource}` : '/') +
        (request.id ? `/${request.id}` : '') +
        (request.action ? `/${request.action}` : '');

    const currentScreen = routes[parsedUrl] ? routes[parsedUrl] : ErrorScreen;

    const main = document.getElementById('main-container');
    main.innerHTML = currentScreen.render();
}
