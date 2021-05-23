import {getStorageUserInfo, setStorageUserInfo} from "../localStorage";
import {getOrder, getOrders, getUserInfo, updateUserInfo} from "../api";
import {calculateOrderTotal} from "../util";
import OrderModal from "../components/OrderModal";

const registerListeners = () => {
    Array.from(document.getElementsByClassName('order-details-button')).forEach(button => {
        button.addEventListener('click', async () => {
            const modal = document.querySelector('#user-modal');
            const orderData = await getOrder(button.id);
            modal.innerHTML = OrderModal.render(orderData);
            modal.style.display = 'block';
            modal.querySelector('#close-modal').onclick = function() {
                modal.style.display = 'none';
            }
        })
    })
}

const UserProfileScreen = {
    render: async () => {
        const {name, email, password, role} = getStorageUserInfo();
        return `
            <div class="user-profile-wrapper container">
                <div class="form-container" id="user-profile-form-container">
                    <div class="header">
                        <h2> ${!role || role === 'Customer' ? 'Customer' : 'Admin'} data </h2>
                    </div>
                    <form class="form" id="profile-form"">
                        <div class="form-control">
                        <label>
                            Username
                        </label>
                        <input type="text"  value="${name}" id="username">
                        <i class="fa fa-check-circle"></i>
                        <i class="fa fa-exclamation-circle"></i>
                        <small>Error message</small>
                    </div>
                        <div class="form-control">
                        <label for="email">
                            Email
                        </label>
                        <input type="text" value="${email}" id="email">
                        <i class="fa fa-check-circle"></i>
                        <i class="fa fa-exclamation-circle"></i>
                        <small>Error message</small>
                    </div>
                        <div class="form-control">
                            <label for="password">
                            Password
                        </label>
                            <input type="password" value="${password}" id="password">
                            <i class="fa fa-check-circle"></i>
                            <i class="fa fa-exclamation-circle"></i>
                            <small>Error message</small>
                        </div>
                        <button type="submit"> Update </button>
                    </form>
                </div>
            <div id="orders-container">
            </div>
            <div id="user-modal" class="modal">
            </div>
        </div>
    `
    },
    after_render: async () => {
        const {id} = getStorageUserInfo();
        const response = await getUserInfo(id);
        if (response.error) {
            alert(response.error)
        } else {
            if (response.role !== 'Admin') {
                const orders = await getOrders();
                if (!orders.error) {
                    document.getElementById('orders-container').innerHTML = getOrderList(orders);
                    registerListeners();
                }
            }
        }

        const form = document.getElementById('user-profile-form-container');
        form.onsubmit = async function (e) {
            e.preventDefault();
            const name = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            if (name && email && password) {
                const response = await updateUserInfo({id, name, email, password});
                if (response.error) {
                    alert(response.error)
                } else {
                    alert('Successfully updated user info')
                    setStorageUserInfo(response)
                }
            }
        }
    }
}

const getOrderList = (orders) => {
    return `<div class="order-item orders-container-header"> My orders </div>
                ${orders.map(order => `
                    <div class="order-item">
                        <div class="order-details">
                            <h3> Order №${order.id} </h3>
                            <div> Number of items ordered: ${order.orderedItems.length} </div>
                            <p> <strong>Status: ${order.status} </strong> </p>
                        </div> 
                        <div class="order-total">
                            Total: $${calculateOrderTotal(order.orderedItems)}
                        </div> 
                       <div class="order-actions">
                            <button class="order-details-button" id="${order.id}"> Details </button>
                       </div>
                    </div>
                <hr>
                `).join('\n')}`
}

export default UserProfileScreen;