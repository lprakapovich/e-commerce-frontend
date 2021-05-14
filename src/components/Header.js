import {clearUserInfo, getUserInfo} from "../localStorage";

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
<!--            <div id="header__navigation">-->
<!--                <nav class="header__navigation">-->
<!--                  <ul>-->
<!--                        <li class="header__navigation__item"><a href="#/books">Books</a></li>-->
<!--                        <li class="header__navigation__item"><a href="#/boardgames">Boardgames</a></li>-->
<!--                        <li class="header__navigation__item"><a href="#/news">News</a></li>-->
<!--                    </ul>-->
<!--                </nav>-->
<!--                <hr>-->
<!--            </div>-->
`;
    },

    after_render: () => {

        document.getElementById('sign-in').addEventListener('click', () => {
            document.location.hash = '/sign-in';
        })

        document.getElementById('sign-out').addEventListener('click', () => {
            clearUserInfo();
            document.location.hash = '/sign-in';
        })

        const hide = (element) => {
           element.style.display = 'none';
        }

        if (!getUserInfo() || getUserInfo().role !== 'Admin') {
            hide(document.getElementById('admin'));
        }

        if (!getUserInfo() || getUserInfo().role !== 'Customer') {
            hide(document.getElementById('home'));
        }

        if (!getUserInfo()) {
            console.log('should not show header')
            hide(document.getElementById('cart'));
            hide(document.getElementById('profile'));
            hide(document.getElementById('sign-out'));
        }

        if (getUserInfo()) {
            hide(document.getElementById('sign-in'));
        }
    }
}

export default Header;