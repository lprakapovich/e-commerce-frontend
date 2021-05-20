import {parseRequestUrl} from "../util";
import {createOrder, getProduct, getUserCart, updateOrder} from "../api";
import {
    getStorageProcessedProduct,
    getStorageUserInfo, setStorageCart,
    setStorageProcessedProduct
} from "../localStorage";

const ProductScreen = {
    after_render: async  () => {
        const selectedProductUrl = parseRequestUrl();
        const addToCartButton = document.getElementById("add-to-cart-button");

        addToCartButton.addEventListener('click', async () => {
            const header = { username: getStorageUserInfo().email, password: getStorageUserInfo().password}
            const cart = await getUserCart(getStorageUserInfo().email, header);
            if (!cart || cart.orderedItems.length === 0) {
                const response = await createNewOrder(selectedProductUrl.id);
                if (response.error) {
                    alert(response.error);
                } else {
                    alert('The first item is added to cart! Let\'s see the cart state.');
                    document.location.hash = '/cart/' + response;
                }
            }
            else {
                const product = getStorageProcessedProduct();
                const item = cart.orderedItems.find(item => item.product.id === product.id);
                if (!item) {
                    cart.orderedItems = [...cart.orderedItems, {orderedQuantity: 1, product: product}];
                    const updatedOrder = await updateOrder(cart);
                    setStorageCart(updatedOrder);
                    alert('Added a new item to the cart!');
                } else {
                    if (item.orderedQuantity === item.product.availableQuantity) {
                        alert('Not enough items at the stock!')
                    } else {
                        item.orderedQuantity++;
                        const updatedOrder = await updateOrder(cart);
                        setStorageCart(updatedOrder);
                        alert(`Added one more item! Current quantity: ${item.orderedQuantity}, available: ${item.product.availableQuantity}`)
                    }
                }
            }
        })
    },

    render: async () => {
        const response = await getProduct(parseRequestUrl().id, 'books');
        if (response.error) {
            return `<div> ${response.error} </div>`;
        } else {
            setStorageProcessedProduct(response)
            return `
               <div class="product-view">
                    <div class="product-details-image container">
                       <img src="/images/sample.jpg" alt="book">
                    </div>
                    <div class="product-details-data">
                        <h2>
                            <a href="/#/book/1">
                                ${response.name}
                            </a>
                        </h2>
                        <p class="book-author">
                            ${response.author} 
                        </p>
                        <p class="book-availability">
                            Available at stock: ${response.availableQuantity} 
                        </p>
                        <p class="book-price">
                            Price: ${response.price}$
                        </p>
                        <div class="book-genre">
                            #${response.genre}
                        </div>
                  <button id="add-to-cart-button" type="submit"> Add to cart </button>
               </div>
           </div> `
        }
    }
}

const createNewOrder = async (productId) => {
    const product = await getProduct(productId, 'books');
    const data = {
        issuer: getStorageUserInfo(),
        status: 'Cart',
        orderedItems: [{orderedQuantity: 1, product}]
    }
    return await createOrder(data);
}

export default ProductScreen;