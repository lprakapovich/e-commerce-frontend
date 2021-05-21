import {getStorageOrders, getStorageProducts, getStorageUserInfo, setStorageOrders} from "../localStorage";
import {createProduct, getOrder, getOrders, getProduct, getProducts, login, updateProduct} from "../api";
import {calculateOrderTotal} from "../util";
import OrderModal from "../components/OrderModal";
import ProductModal from "../components/ProductModal";

const preventNonAdminAccess = () => {
    const {role} = getStorageUserInfo();
    if (role !== 'Admin') {
        document.location.hash = '/sign-in';
    }
}

const getAdminOrdersView = async () => {
    const response = await getOrders();
    if (response.error) {
        return `<div class="container"> No orders available </div>`
    } else {
        setStorageOrders(response)
        console.log(response)
        return`<div id="orders-container"> 
                ${response.map(order =>
                    `<div class="order-item">
                        <div class="order-details">
                            <h3> Order №${order.id} </h3>
                            <div> Issued by ${order.issuer.name} </div>
                            <div> Number of items ordered: ${order.orderedItems.length} </div>
                            <p> <strong>Status: ${order.status} </strong> </p>
                        </div>
                        <div class="order-total">
                            Total: $${calculateOrderTotal(order.orderedItems)}
                        </div> 
                       <div class="order-actions">
                            <button class="order-details-button" id="${order.id}"> Details </button>
                            <div id="${order.id}" class="icon container shipment-button">
                                
                            </div>
                       </div>
                    </div>
                <hr> 
            `)
            .join('\n')} </div>`;
    }
}
const getAdminProductsView = async () => {
    const response = await getProducts('books');
    return response.error ?
        `<div class="container"> No products available </div>
            <div>
              <button id="add-new-button"> Add new product <i class="fa fa-plus"></i> </button> 
            </div>` : `
            <div id="admin-products-container"> 
            <div>
                <button id="add-new-button"> Add new product <i class="fa fa-plus"></i> </button> 
            </div>
                ${response.map(product =>        
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

        if (componentId === 'admin-orders') {
            Array.from(document.querySelectorAll('.order-details-button')).forEach(button => {
                button.onclick =  async function () {
                    const orderData = await getOrder(button.id);
                    modal.innerHTML = OrderModal.render(orderData);
                    modal.style.display = 'block';
                    modal.querySelector('#close-modal').onclick = function() {
                        modal.style.display = 'none';
                    }
                }
            })
        }

        if (componentId === 'admin-products') {
            document.querySelector('#add-new-button').onclick = function() {
                modal.innerHTML = ProductModal.render();
                ProductModal.after_render();
                modal.style.display = 'block';
                modal.querySelector('#close-modal').onclick = function() {
                    modal.style.display = 'none';
                }
                modal.querySelector('#new-product-form').onsubmit = async function (e) {
                    e.preventDefault();
                    modal.style.display = 'none';
                    const response = await createProduct({
                        name : modal.querySelector('#title').value,
                        author: modal.querySelector('#author').value,
                        price: modal.querySelector('#price').value,
                        availableQuantity: modal.querySelector('#availableQuantity').value,
                        genre: modal.querySelector('#genre').value,
                        type: 'book'
                    })
                    alert(response.error ?
                        response.error : `A new product was registered at the stock under id ${response}`)
                    loadComponent('admin-products');
                }
            };

            Array.from(document.querySelectorAll('.edit-button')).forEach(button => {
                button.onclick = async function () {
                    const product = await getProduct(button.id, 'books');
                    modal.innerHTML = ProductModal.render(product);
                    ProductModal.after_render(product);
                    modal.style.display = 'block';
                    modal.querySelector('#close-modal').onclick = function() {
                        modal.style.display = 'none';
                    }
                    modal.querySelector('#modal-header').innerText = 'Edit an existing product';
                    modal.querySelector('#new-product-form').onsubmit = async function (e) {
                        e.preventDefault();
                        modal.style.display = 'none';
                        const response = await updateProduct({
                            id: product.id,
                            name : modal.querySelector('#title').value,
                            author: modal.querySelector('#author').value,
                            price: modal.querySelector('#price').value,
                            genre: modal.querySelector('#genre').value,
                            availableQuantity: modal.querySelector('#availableQuantity').value,
                            type: 'book'
                        })

                        if (response.error) {
                            alert(response.error);
                        } else {
                            alert(`Successfully updated a product ${response.id}`);
                            loadComponent('admin-products');
                        }
                    }
                }
            })
        }
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