import {parseRequestUrl} from "../util.js";
import {getProduct} from "../api.js";
import {getCartItems, updateCartItems} from "../localStorage.js";

const addProductToCart = (item, forceUpdate = false) => {
    let cartItems = getCartItems();
    const existingItem = cartItems.find(i => i.  productId === item.productId);
    if (existingItem) {
        item.orderedQuantity++;
        cartItems.map(i => i.productId === existingItem.productId ? item : i);
        console.log(cartItems)
    } else {
        cartItems = [...cartItems, item];
    }
    updateCartItems(cartItems);
}

const CartScreen = {
    after_render: () => {

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
                orderedQuantity: 1
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
                                        Qty: <select class="quantity-select"> <option value="1"> 1 </option></select>
                                        <button> Delete </button>
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
                        Subtotal (${cartItems.reduce((a, c) => a + c.orderedQuantity, 0)} items) : $${cartItems.reduce((a, c) => a + c.price * c.orderedQuantity, 0)}
                        <button id="checkout-button"> Proceed to checkout </button>
                    </div>     
               </div> 
             `
    }
}

export default CartScreen;