import {parseRequestUrl, rerender} from "../util.js";
import {getProduct} from "../api.js";
import {getCartItems, updateCartItems} from "../localStorage.js";

const addProductToCart = (item, forceUpdate = false) => {
    let cartItems = getCartItems();
    const existingItem = cartItems.find(i => i.productId === item.productId);
    if (existingItem) {
        if (forceUpdate) {
         cartItems.forEach(i => {
             if (i.productId === item.productId) {
                 i.orderedQuantity = item.orderedQuantity;
             }
         })
         // cartItems.map(i => i.productId === item.productId ? item : i);
        }
    } else {
        cartItems = [...cartItems, item];
    }
    updateCartItems(cartItems);
    if (forceUpdate) {
        location.reload();
        // rerender(CartScreen).then(() => {});
    }
}

const removeFromCart = (id) => {
    updateCartItems(getCartItems().filter(i => i.productId !== id));
    if (id === parseRequestUrl().id) {
     document.location.hash = "/cart";
    } else {
        location.reload();
    }
}

const CartScreen = {
    after_render: () => {
        const selectControls = document.getElementsByClassName("quantity-select");
        Array.from(selectControls).forEach(selectControl => {
            selectControl.addEventListener('change', (e) => {
                const item = getCartItems().find(i => i.productId === selectControl.id);
                addProductToCart({...item, orderedQuantity: Number(e.target.value)}, true)
            });
        });
        const deleteButtons = document.getElementsByClassName("delete-button");
        Array.from(deleteButtons).forEach(deleteButton => {
            deleteButton.addEventListener('click', () => {
                removeFromCart(deleteButton.id);
            })
        })

        document.getElementById('checkout-button').addEventListener('click', () => {
            document.location.hash = '/sign-in';
        })
    },
    render: async () => {
        const url = parseRequestUrl();
        if (url.id) {
            const response = await getProduct(url.id, 'books');
            const product = response.data;

            addProductToCart({
                productId: product.id,
                name: product.name,
                price: product.price,
                availableQuantity: product.availableQuantity,
                orderedQuantity: product.orderedQuantity ? product.orderedQuantity : 1
            });
        }
        const cartItems = getCartItems();
        return `
               <div class="cart">
                    <div class="cart-list">
                        <ul class="cart-list-container">
                            <li class="cart-list-header">
                                <h3> Shopping Cart</h3>
                                <h3>
                                    Price
                                </h3>
                            </li>
                            ${ cartItems.length === 0 ? `<div> Cart is empty! <a href="#"> Go shopping.</a></div>` : cartItems.map(item => 
                            `
                            <li> 
                                <div class="cart-item-container">
                                    <div class="cart-item-image">
                                        <img class="" style="width: 10rem" alt="image" src="/images/sample.jpg"/> 
                                    </div>
                                    <div class="cart-item-details">
                                        <h3> ${item.name} </h3>
                                    <div>
                                        Qty: 
                                        <select class="quantity-select" id="${item.productId}"> 
                                        ${
                                         [...Array(item.availableQuantity).keys()].map(key => item.orderedQuantity === key + 1 ? 
                                             `<option selected value="${key + 1}">${key + 1} </option>` : 
                                             `<option value="${key + 1}">${key + 1} </option>`
                                         )}
                                        </select>
                                        <button class="delete-button" id="${item.productId}"> Delete </button>
                                    </div>
                                    </div>
                                        <div class="cart-item-price">
                                            $${item.price}
                                        </div>
                                    </div>
                            </li>`).join('\n')}
                        </ul>
                    </div>
                    <div class="cart-subtotal">
                        <div> 
                            Subtotal (${cartItems.reduce((a, c) => a + c.orderedQuantity, 0)} items) : ${cartItems.reduce((a, c) => a + c.price * c.orderedQuantity, 0)}
                        </div>
                        <button id="checkout-button"> Proceed to checkout </button>
                    </div>     
               </div> 
             `
    }
}

export default CartScreen;