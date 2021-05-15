import {getUserInfo} from "../localStorage";
import {createProduct, getOrderById, getOrders, getProducts, login} from "../api";
import {calculateOrderTotal} from "../util";
import OrderModal from "../components/OrderModal";
import NewProductModal from "../components/NewProductModal";

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
    const products = await getProducts('books');
    console.log(products)
    return `
            <div id="admin-products-container"> 
            <div class="">
                <button id="add-new-button"> Add new product <i class="fa fa-plus"></i> </button> 
            </div>
                      
                ${products.map(product =>        
                 `<div class="product-item">
                        <div class="product-details">
                            <h3> Product №${product.id} </h3>
                            <div> ${product.name} </div>
                            <div> ${product.author} </div>
                        </div>
                         <div class="product-price">
                            <div> Price: ${product.price}$ </div>
                        </div>
                        <div class="product-availability">
                            <div> At stock:  ${product.availableQuantity}</div>
                        </div>
                       <div class="product-actions">
                            <button class="edit-button" id="${product.id}"> Edit </button>
                       </div>
                    </div>
                <hr> 
            `)
        .join('\n')} </div>`;
}

const loadContent = async (selectedMenuItemId) => {
    switch (selectedMenuItemId) {
        case 'admin-orders':
            return getAdminOrdersView();
        case 'admin-products':
            return getAdminProductsView();
        default:
            return `<div> No content </div>`
    }
}

const loadComponent = (componentId) => {
    loadContent(componentId).then(renderedComponent => {
        document.querySelector('#admin-navigation-content').innerHTML = renderedComponent;

        const modal = document.querySelector('#admin-modal');

        Array.from(document.querySelectorAll('.order-details-button')).forEach(button => {
            button.onclick =  async function () {
                const orderData = await getOrderById(button.id);
                modal.innerHTML = OrderModal.render(orderData[0]);
                modal.style.display = 'block';
                modal.querySelector('#close-modal').onclick = function() {
                    modal.style.display = 'none';
                }
            }
        })

        if (componentId === 'admin-products') {
            document.querySelector('#add-new-button').onclick = function() {
                modal.innerHTML = NewProductModal.render();
                modal.style.display = 'block';
                modal.querySelector('#close-modal').onclick = function() {
                    modal.style.display = 'none';
                }
                modal.querySelector('#new-product-form').onsubmit = async function (e) {
                    e.preventDefault();
                    modal.style.display = 'none';

                    const name = modal.querySelector('#title').value;
                    const author = modal.querySelector('#author').value;
                    const price = modal.querySelector('#price').value;
                    const availableQuantity = modal.querySelector('#availableQuantity').value;

                    const response = await createProduct({
                        name, author, price, availableQuantity, type: 'book'
                    })

                    console.log(response)
                    alert(response.error ?
                        response.error : `A new product was registered at the stock under id ${response}`)
                }
            };
        }
    })
}


// TODO pass rendered content and a callback function
const initializeModal = (component, callback) => {
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
                    <div id="admin-modal" class="modal">
                    </div>
                </div>`
    },
    after_render: () => {

        preventNonAdminAccess();

        loadComponent('admin-orders');
        const menuItems = document.getElementsByClassName('admin-navigation-item');
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