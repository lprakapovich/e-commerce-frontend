const Header = {
    render: async () => {
        return `<div class="header__content container">
                <h1 class="header__content__title container"> (your favorite) bookstore. </h1>
                <div class="icon" id="settings">
                    <a href="#/settings"> 
                        <i class='fa fa-wrench'></i>
                    </a> 
                </div>
                <div class="icon">
                    <a href="#/user-profile"> 
                       <i class='fa fa-user'></i>
                    </a> 
                </div>
                <div class="icon">
                    <a href="#/cart"> 
                        <i class='fa fa-shopping-cart'></i> 
                    </a>          
                </div>
                <div class="icon" id="logout">
                    <i class="fa fa-sign-out"></i>
                </div>
            </div>
            <div id="header__navigation">
                <hr>
                <nav class="header__navigation">
                    <ul>
                        <li class="header__navigation__item"><a href="#/books">Books</a></li>
                        <li class="header__navigation__item"><a href="#/boardgames">Boardgames</a></li>
                        <li class="header__navigation__item"><a href="#/news">News</a></li>
                    </ul>
                </nav>
                <hr>
            </div>`;
    },

    after_render: () => {
        document.getElementById('logout').addEventListener('click', () => {
            localStorage.removeItem('userInfo');
        })

        document.getElementById('settings').hidden = false;
    }
}

export default Header;