import HomeScreen from './screens/HomeScreen.js';
import ProductScreen from "./screens/ProductScreen.js";
import { parseRequestUrl } from "./util.js";
import ErrorScreen from "./screens/ErrorScreen.js";
import CartScreen from "./screens/CartScreen";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import Header from "./components/Header";
import UserProfileScreen from "./screens/UserProfileScreen";
import AdminScreen from "./screens/AdminScreen";
import Slider from "./components/Slider";

const routes = {
    '/' : HomeScreen,
    '/books' : HomeScreen,
    '/product/:id': ProductScreen,
    '/cart/:id': CartScreen,
    '/cart' : CartScreen,
    '/sign-in': SignInScreen,
    '/sign-up': SignUpScreen,
    '/user-profile': UserProfileScreen,
    '/admin': AdminScreen
}

window.onload = async () => {
    await router();
    window.addEventListener('hashchange', () => {
        console.log('hash changed')
        router();

    });
}

const redirectNotAuthenticated = (currentScreen) => {
    if (!localStorage.getItem('userInfo') && currentScreen !== '/sign-up' && currentScreen !== '/') {
        location.hash = "/sign-in";
    }
}

const getParsedUrl = () => {
    const request = parseRequestUrl();
    return (request.resource ? `/${request.resource}` : '/') + (request.id ? "/:id" : '') + (request.action ? `/${request.action}` : '');
}

const router = async () => {
    const parsedUrl = getParsedUrl();
    redirectNotAuthenticated(parsedUrl);

    const screen = routes[parsedUrl] ? routes[parsedUrl] : ErrorScreen;

    Array.from(document.getElementsByClassName('hide')).forEach(
        element => {
            element.hidden = (parsedUrl === '/sign-in' || parsedUrl === '/sign-up');
        }
    )

    const header = document.getElementById('header-wrapper');
    header.innerHTML = await Header.render();
    await Header.after_render();

    const main = document.getElementById('main-wrapper');
    screen.render().then(content => {
        main.innerHTML = content;
        screen.after_render();
    });
}
