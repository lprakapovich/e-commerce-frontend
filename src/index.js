import HomeScreen from './screens/HomeScreen.js';
import ProductScreen from "./screens/ProductScreen.js";
import { parseRequestUrl } from "./util.js";
import ErrorScreen from "./screens/ErrorScreen.js";

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
        (request.id ? "/:id" : '') +
        (request.action ? `/${request.action}` : '');

    const currentScreen = routes[parsedUrl] ? routes[parsedUrl] : ErrorScreen;

    const main = document.getElementById('main-container');

    currentScreen.render().then(content => {
        main.innerHTML = content;
        currentScreen.after_render();
    });
}
