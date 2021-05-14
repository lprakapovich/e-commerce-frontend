import {parseRequestUrl} from "../util.js";
import {createOrder, getProduct} from "../api.js";
import {getCartItems, getUserInfo, setCartItems} from "../localStorage.js";

const addProductToCart = (item, forceUpdate = false) => {
    let cartItems = getCartItems();
    const existingItem = cartItems.find(i => i.id === item.id);
    if (existingItem) {
        if (forceUpdate) {
         cartItems.forEach(i => {
             if (i.id === item.id) {
                 i.orderedQuantity = item.orderedQuantity;
             }
         })
        }
    } else {
        cartItems = [...cartItems, item];
    }

    setCartItems(cartItems);
    if (forceUpdate) {
        location.reload();
    }
}

const removeFromCart = (id) => {
    setCartItems(getCartItems().filter(i => i.product.id !== id));

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
                const item = getCartItems().find(i => i.id === selectControl.id);
                addProductToCart({...item, orderedQuantity: Number(e.target.value)}, true)
            });
        });
        const deleteButtons = document.getElementsByClassName("delete-button");
        Array.from(deleteButtons).forEach(deleteButton => {
            deleteButton.addEventListener('click', () => {
                removeFromCart(deleteButton.id);
            })
        })

        document.getElementById('checkout-button').addEventListener('click', async () => {
            const order = {
                issuer: getUserInfo(),
                orderState: 'Cart',
                orderedProducts: getCartItems()
            };

            const response = await createOrder(order);
            if (response.error) {
                alert(response.error)
            } else {
                alert(`Order ${response} will be processed in the nearest time. Thank you!`)
            }
        })
    },
    render: async () => {
        const url = parseRequestUrl();
        if (url.id) {
            const response = await getProduct(url.id, 'books');
            const product = response.data;
            console.log(product)

            addProductToCart({
                product: {
                    id: product.id,
                    name: product.name,
                    author: product.author,
                    price: product.price,
                    availableQuantity: product.availableQuantity,
                    type: product.type
                },
                orderedQuantity: product.orderedQuantity ? product.orderedQuantity : 1
            });
        }

        const cartItems = getCartItems();
        return `
               <div class="cart-container">
                    <div class="cart-product-list">
                        <ul class="cart-list-container">
                            <li class="cart-container-header">
                                <h3> Shopping Cart</h3>
                                <h3>
                                    Price
                                </h3>
                            </li>
                            ${cartItems.length === 0 ? `<div> Cart is empty! <a href="#"> Go shopping.</a></div>` : cartItems.map(item =>
                            `
                            <li> 
                                <div class="cart-item-container">
                                    <div class="cart-item-image">
                                        <img class="" style="width: 10rem" alt="image" src="/images/sample.jpg"/> 
                                    </div>
                                    <div class="cart-item-details">
                                        <h3> ${item.product.name} </h3>
                                    <div>
                                        Qty: 
                                        <select class="quantity-select" id="${item.product.id}"> 
                                            ${
                                                [...Array(item.product.availableQuantity).keys()].map(key => item.orderedQuantity === key + 1 ? 
                                                    `<option selected value="${key + 1}">${key + 1} </option>` : 
                                                    `<option value="${key + 1}">${key + 1} </option>`)
                                            }
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
                    <div class="cart-total container">
                        <div> 
                            Subtotal (${cartItems.reduce((a, c) => a + c.orderedQuantity, 0)} items) : ${cartItems.reduce((a, c) => a + c.product.price * c.orderedQuantity, 0)}
                        </div>
                        <button id="checkout-button"> Proceed to checkout </button>
                    </div>     
               </div> 
             `
    }
}

export default CartScreen;