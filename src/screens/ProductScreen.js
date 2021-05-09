import {parseRequestUrl} from "../util";
import {getProduct} from "../api";

const ProductScreen = {
    after_render: () => {
        const request = parseRequestUrl();
        document.getElementById("add-button").addEventListener('click', () => {
            document.location.hash = `/cart/${request.id}`;
        })
    },
    render: async () => {
        const request = parseRequestUrl();
        const response = await getProduct(request.id, 'books');
        if (!response || response.status !== 200) {
            return `<div> ${response.data.message} </div>`;
        }

        const product = response.data;

        return `
               <div class="product-view">
                    <div class="product-details image">
                       <img src="/images/sample.jpg" alt="book">
                    </div>
                    <div class="product-details data">
                        <div>
                            <a href="/#/book/1">
                                ${product.name}
                            </a>
                        </div>
                   <div class="book-author">
                       ${product.author} 
                   </div>
                   <div class="book-price">
                      ${product.price}
                   </div>
                  <button id="add-button" type="submit"> Add to cart </button>
               </div>
           </div> `
    }
}

export default ProductScreen;