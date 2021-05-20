import {clearStorageUserInfo, getStorageUserInfo} from "../localStorage";

const Header = {
    render: async () => {
        return `<div class="header container">
                    <h1 class="header-title container">
                        (your favorite) bookstore.
                    </h1>
                    <div class="icon" id="home">
                        <a href="#/"> 
                            <i class="fa fa-home"></i>
                        </a> 
                    </div>
                    <div class="icon" id="admin">
                        <a href="#/admin"> 
                            <span> admin </span>
                        </a> 
                    </div>
                    <div class="icon" id="profile">
                        <a href="#/user-profile"> 
                            <i class="fa fa-user"></i>
                        </a> 
                    </div>
                    <div class="icon" id="cart">
                        <a href="#/cart"> 
                            <i class="fa fa-shopping-cart"></i> 
                        </a>          
                    </div>
                    <div class="icon" id="sign-out">
                        <i class="fa fa-sign-out"></i>
                    </div>
                    <div class="icon" id="sign-in">
                        <span> sign in 
                            <i class="fa fa-sign-in"></i>
                        </span>
                    </div>
            </div>
            <hr> 
`;
    },

    after_render: () => {

        const cart = document.querySelector("#cart");
        const home = document.querySelector("#home");
        const profile = document.querySelector('#profile');
        const signOut = document.querySelector('#sign-out');
        const signIn = document.querySelector('#sign-in');


        document.getElementById('sign-in').addEventListener('click', () => {
            document.location.hash = '/sign-in';
        })

        document.getElementById('sign-out').addEventListener('click', () => {
            clearStorageUserInfo();
            document.location.hash = '/sign-in';
        })

        const hide = (element) => {
           element.style.display = 'none';
        }

        if (!getStorageUserInfo() || getStorageUserInfo().role !== 'Admin') {
            hide(document.getElementById('admin'));
        }

        if (!getStorageUserInfo() || getStorageUserInfo().role !== 'Customer') {
            hide(document.getElementById('home'));
            hide(document.getElementById('cart'));
        }

        if (!getStorageUserInfo()) {
            hide(document.getElementById('cart'));
            hide(document.getElementById('profile'));
            hide(document.getElementById('sign-out'));
        }

        if (getStorageUserInfo()) {
            hide(document.getElementById('sign-in'));
        }
    }
}

export default Header;