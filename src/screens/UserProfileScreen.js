import {getStorageUserInfo} from "../localStorage";
import {getOrders} from "../api";
import {calculateOrderTotal} from "../util";

const UserProfileScreen = {
    render: async () => {
        const {name, email, password, role} = getStorageUserInfo();
        const orders = await getOrders();
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
                <div class="order-item orders-container-header"> My orders </div>
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
                `)}
            </div>
        </div>
        
    `
    },
    after_render: async () => {
        const orders = await getOrders();
        console.log(orders)
    }
}

export default UserProfileScreen;