import {deleteOrder, getUserCart, updateOrder} from "../api.js";
import {clearStorageCart, getStorageCart, getStorageUserInfo, setStorageCart} from "../localStorage.js";
import ShippingAddressModal from "../components/ShippingAddressModal";

const removeFromCart = async (id) => {
    const cart = getStorageCart();
    const orderedItems = cart.orderedItems.filter(item => item.product.id !== id);
    if (orderedItems.length === 0) {
        await deleteOrder(cart.id);
    } else {
        cart.orderedItems = orderedItems;
        const updatedOrder = await updateOrder(cart);
        console.log(updatedOrder)
    }
}

const updateCartTotal = () => {
    document.getElementById("cart-total").innerHTML = getCartTotal(getStorageCart());
}

const getCartTotal = (cart) => {
    console.log(cart)
    return `<div> 
                 Subtotal (${cart.orderedItems.reduce((a, c) => a + c.orderedQuantity, 0)} items) :
                          ${cart.orderedItems.reduce((a, c) => a + c.product.price * c.orderedQuantity, 0)} 
            </div>
           <button id="checkout-button"> Proceed to checkout </button> `
}

const CartScreen = {
    after_render: () => {
        Array.from(document.getElementsByClassName("quantity-select")).forEach(selectControl => {
                selectControl.addEventListener('change', (e) => {
                    const cart = getStorageCart();
                    cart.orderedItems.find(item => item.product.id === selectControl.id).orderedQuantity = Number(e.target.value);
                    updateOrder(cart).then(updatedOrder => {
                        setStorageCart(updatedOrder)
                        updateCartTotal();
                    })
            });
        });
        Array.from(document.getElementsByClassName("delete-button")).forEach(deleteButton => {
            deleteButton.addEventListener('click',  () => {
                removeFromCart(deleteButton.id).then(async () => {
                    alert('Removed item from cart!');
                });
            })
        })

        updateCartTotal();

        document.getElementById('checkout-button')?.addEventListener('click', async () => {

            const modal = document.getElementById("address-modal");
            modal.innerHTML = ShippingAddressModal.render();
            modal.style.display = 'block';
            modal.querySelector('#close-modal').onclick = function() {
                modal.style.display = 'none';
            }
            modal.querySelector('#address-form').addEventListener('submit', async (e) => {
                e.preventDefault();

                const country = modal.querySelector('#country').value;
                const city = modal.querySelector('#city').value;
                const street = modal.querySelector('#street').value;
                const zip = modal.querySelector('#zip').value;

                const order = getStorageCart();
                const response = await updateOrder(
                    {...order,
                        status: 'Processed',
                        shippingAddress: { country, city, street, zip}});
                if (response.error) {
                    alert(response.error)
                } else {
                    alert(`Order ${response.id} will be processed in the nearest time. Thank you!`)
                    document.location.hash = '/cart';
                    clearStorageCart();
                    modal.style.display = 'none';
                }
            })
        })
    },

    render: async () => {
        const header = { username: getStorageUserInfo().email, password: getStorageUserInfo().password}
        const cart = await getUserCart(getStorageUserInfo().email, header);

        if (!cart || cart.orderedItems.length === 0 ) {
            return `<div class="container"> Cart is empty. <a class="color-link" href="#"> Go shopping! </a> </div>`
        } else {
            setStorageCart(cart);
            return `<div class="cart-container">
                    <div class="cart-product-list">
                        <ul class="cart-list-container">
                            <li class="cart-container-header">
                                <h3> Shopping Cart </h3>
                                <h3> Price </h3>
                            </li>
                            
                            ${cart.orderedItems.map(item => `
                            <li> 
                                <div class="cart-item-container">
                                    <div class="cart-item-image">
                                        <img class="" style="width: 10rem" alt="image" src="/images/sample.jpg"/> 
                                    </div>
                                    <div class="cart-item-details">
                                        <h3> ${item.product.name} </h3>
                                    <div>
                                        Ordered quantity: 
                                        <select class="quantity-select" id="${item.product.id}"> 
                                            ${[...Array(item.product.availableQuantity).keys()].map(key => item.orderedQuantity === key + 1 ?
                                                `<option selected value="${key + 1}">${key + 1} </option>` : 
                                                `<option value="${key + 1}">${key + 1} </option>`)}
                                        </select>
                                        <button class="delete-button" id="${item.product.id}"> Delete </button>
                                    </div>
                                    </div>
                                        <div class="cart-item-price">
                                            $${item.product.price}
                                        </div>
                                    </div>
                            </li>`).join('\n')}
                        </ul>
                    </div>
                    <div class="container" id="cart-total"></div>  
                    <div id="address-modal" class="modal"> </div>   
               </div> 
           `
        }
    }
}

export default CartScreen;