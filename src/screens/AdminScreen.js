import {getUserInfo} from "../localStorage";

const preventNonAdminAccess = () => {
    const {role} = getUserInfo();
    if (role !== 'Admin') {
        document.location.hash = '/sign-in';
    }
}

const getAdminOrdersView = () => {
    return `<div> admin orders case</div>`;
}

const getAdminProductsView = () => {
    return `<div> admin products case</div>`;
}

const loadContent = (selectedMenuItemId) => {
    let html = `<div> No content </div>`
    switch (selectedMenuItemId) {
        case 'admin-orders':
            return getAdminOrdersView();
        case 'admin-products':
            return getAdminProductsView();
    }
    return html;
}

const AdminScreen = {
    render: async () => {
        return `<div id="admin-container" class="container"> 
                    <nav id="admin-navigation-menu">
                            <div class="admin-navigation-item active" id="admin-orders">Orders</div>
                            <div class="admin-navigation-item" id="admin-products">Products</div>
                    </nav>
                    <div id="admin-navigation-content"> 
                    Hi
                    </div>
                </div>`
    },
    after_render: () => {
        preventNonAdminAccess();

        let menuItems = document.getElementsByClassName('admin-navigation-item');

        Array.from(menuItems).forEach(item => {
            item.addEventListener('click', () => {
                const selectedMenuItemId = item.id;
                if (!item.classList.contains('active')) {
                    item.classList.add('active')
                    Array.from(menuItems).forEach(el => {
                        if (el.id !== selectedMenuItemId) {
                            el.classList.remove('active');
                        }
                    })
                }
                document.getElementById('admin-navigation-content').innerHTML = loadContent(selectedMenuItemId);
            })
        })
    }
}

export default AdminScreen;