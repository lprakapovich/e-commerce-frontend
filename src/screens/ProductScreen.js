import {parseRequestUrl} from "../util";
import {getProduct} from "../api";

const ProductScreen = {
    after_render: () => {
        const request = parseRequestUrl();
        console.log(request)
        document.getElementById("add-button").addEventListener('click',
            () => {
            document.location.hash = `/cart/${request.id}`;
            })
    },
    render: async () => {
        const request = parseRequestUrl();
        const response = await getProduct(request.id, 'books');
        if (!response || response.status !== 200) {
            return `<div> ${response.data.message} </div>`;
        }

        return `
               <div class="product-view">
                    <div class="product-details image">
                       <img src="/images/sample.jpg" alt="book">
                    </div>
                    <div class="product-details data">
                        <div>
                            <a href="/#/book/1">
                                Harry Potter
                            </a>
                        </div>
                   <div class="book-author">
                       Joanne Rowling
                   </div>
                   <div class="book-price">
                       14$
                   </div>
                  <button id="add-button" type="submit"> Add to cart </button>
               </div>
           </div> `
    }
}

export default ProductScreen;