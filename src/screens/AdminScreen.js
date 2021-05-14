import {getUserInfo} from "../localStorage";
import {getOrderById, getOrders} from "../api";
import {calculateOrderTotal} from "../util";
import OrderModal from "../components/OrderModal";

const preventNonAdminAccess = () => {
    const {role} = getUserInfo();
    if (role !== 'Admin') {
        document.location.hash = '/sign-in';
    }
}

const getAdminOrdersView = async () => {
    const orders = await getOrders();
    return `<div id="orders-container"> 
                ${orders.map(order =>
                    `<div class="order-item">
                        <div class="order-details">
                            <h3> Order №${order.id} </h3>
                            <div> Issued by ${order.issuer.name} </div>
                            <div> Number of items ordered: ${order.orderedItems.length} </div>
                        </div>
                        <div class="order-total">
                            Total: $${calculateOrderTotal(order.orderedItems)}
                        </div> 
                       <div class="order-actions">
                            <button class="order-details-button" id="${order.id}"> Details </button>
                       </div>
                    </div>
                <hr> 
            `)
        .join('\n')} </div>`;
   }

const getAdminProductsView = async () => {
    return `<div> admin products case</div>`;
}

const loadContent = async (selectedMenuItemId) => {
    let html = `<div> No content </div>`
    switch (selectedMenuItemId) {
        case 'admin-orders':
            return getAdminOrdersView();
        case 'admin-products':
            return getAdminProductsView();
    }
    return html;
}

const loadComponent = (componentId) => {
    loadContent(componentId).then(renderedComponent => {
        document.querySelector('#admin-navigation-content').innerHTML = renderedComponent;
        const modal = document.querySelector('#myModal');
        Array.from(document.querySelectorAll('.order-details-button')).forEach(button => {
            button.onclick =  async function () {
                const orderData = await getOrderById(button.id);
                console.log(orderData[0])
                modal.innerHTML = OrderModal.render(orderData[0]);
                modal.style.display = 'block';
                modal.querySelector('#close-modal').onclick = function() {
                    modal.style.display = 'none';
                }
            }
        })
    })
}

const AdminScreen = {
    render: async () => {
        return `<div id="admin-container" class="container"> 
                    <nav id="admin-navigation-menu">
                            <div class="admin-navigation-item active" id="admin-orders">Orders</div>
                            <div class="admin-navigation-item" id="admin-products">Products</div>
                    </nav>
                    <div id="admin-navigation-content"> 
                    </div>  
                    <div id="myModal" class="modal">
                    </div>
                </div>`
    },
    after_render: () => {

        preventNonAdminAccess();

        loadComponent('admin-orders');

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
                loadComponent(selectedMenuItemId);
            })
        })
    }
}

export default AdminScreen;