import {parseRequestUrl} from "../util";
import {getProduct} from "../api";

const ProductScreen = {
    after_render: () => {
        const request = parseRequestUrl();
        document.getElementById("add-to-cart-button").addEventListener('click', () => {
            document.location.hash = `/cart/${request.id}`;
        })
    },
    render: async () => {
        const request = parseRequestUrl();
        const response = await getProduct(request.id, 'books');
        console.log(response)
        if (response.error) {
            return `<div> ${response.error} </div>`;
        } else {
            return `
               <div class="product-view">
                    <div class="product-details image">
                       <img src="/images/sample.jpg" alt="book">
                    </div>
                    <div class="product-details data">
                        <div>
                            <a href="/#/book/1">
                                ${response.name}
                            </a>
                        </div>
                   <div class="book-author">
                       ${response.author} 
                   </div>
                    <div class="book-availability">
                       ${response.availableQuantity} 
                   </div>
                   <div class="book-price">
                      ${response.price}
                   </div>
                  <button id="add-to-cart-button" type="submit"> Add to cart </button>
               </div>
           </div> `
        }
    }
}

export default ProductScreen;