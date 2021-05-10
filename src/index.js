import HomeScreen from './screens/HomeScreen.js';
import ProductScreen from "./screens/ProductScreen.js";
import { parseRequestUrl } from "./util.js";
import ErrorScreen from "./screens/ErrorScreen.js";
import CartScreen from "./screens/CartScreen";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";

const routes = {
    '/' : HomeScreen,
    '/books' : HomeScreen,
    '/product/:id': ProductScreen,
    '/cart/:id': CartScreen,
    '/cart' : CartScreen,
    '/sign-in': SignInScreen,
    '/sign-up': SignUpScreen
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

    console.log(parsedUrl)
    const currentScreen = routes[parsedUrl] ? routes[parsedUrl] : ErrorScreen;

    let main = parsedUrl === '/sign-in' || parsedUrl === '/sign-up' ? document.body : document.getElementById('main-container');

    currentScreen.render().then(content => {
        main.innerHTML = content;
        currentScreen.after_render();
    });
}
