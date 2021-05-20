import Slider from "../components/Slider";
import GenreSelector from "../components/GenreSelector"
import {getStorageProducts, setStorageProducts} from "../localStorage";
import {getProducts} from "../api";

const setProductPriceRanges = (products) => {
    let priceMax = 0, priceMin = 0;
    if (products) {
        products.forEach(product => {
            if (priceMax < product.price) {
                priceMax = product.price;
            }
        })
        priceMin = priceMax;
        products.forEach(product => {
            if (product.price < priceMin) {
                priceMin = product.price;
            }
        })
        return {priceMin, priceMax}
    }
}

const getProductList = (response) => {
    return response.error ? `<div class="container"> ${response.error} </div>` :
        ` <ul id="books-container">
                     ${response.map(book => `
                        <li>
                            <div class="book">
                                <a href="/#/product/${book.id}">
                                    <img src="/images/sample.jpg" alt="book">
                                </a> 
                            </div>
                            <div class="book-title">
                                <a href="/#/book/1">
                                    ${book.name}
                                </a>
                            </div>
                            <div class="book-author">
                                ${book.author}
                            </div>
                            <div class="book-price">
                                Price: ${book.price}$
                            </div>
                        </li>`)
        .join('\n')} `
}

const getParams = () => {
    const minPrice = document.getElementById('min-price').value,
        maxPrice = document.getElementById('max-price').value,
        name = document.getElementById('name').value,
        author = document.getElementById('author').value,
        genre = document.getElementById("genre").value;

        return {
        ...(minPrice) && { 'price[gte]' : minPrice },
        ...(maxPrice) && { 'price[lte]' : maxPrice },
        ...(author) && { 'author' : author },
        ...(name) && { 'name' : name },
        ...(genre) && {'genre' : genre}
    }
}

const HomeScreen = {
    after_render: () => {
        const products = getStorageProducts();
        let { priceMin, priceMax} = setProductPriceRanges(products)

        document.querySelector('#slider').innerHTML= Slider.render(priceMin, priceMax);
        Slider.after_render();

        document.querySelector('#products-filter-form').addEventListener('submit', (e) => {
            e.preventDefault();
            getProducts('books', getParams())
                .then(response => document.querySelector('#books-container').innerHTML = getProductList(response))
        })

        document.querySelector("#genre-selector").innerHTML = GenreSelector.render();
    },

    render: async () => {
        const response = await getProducts('books');
        if (response.error) {
            return `<div> Couldn't fetch the books </div>`;
        }
         else {
            setStorageProducts(response);
            return `
            <div class="products-container">
                <form id="products-filter-form">
                    <div class="form-control">
                        <div>
                            <label>
                                Title
                            </label>
                            <input type="text" placeholder="e.g. Harry Potter" id="name" class="large-input">        
                        </div>
                        <div>
                            <label>
                                Author
                            </label>
                            <input type="text" placeholder="e.g. Joanne Rowling" id="author" class="large-input">        
                        </div>
                        <div id="slider"></div>
                        </div>
                        <div id="genre-selector"> </div>
                        <button type="submit"> Find </button>
                    </div>
                </form>
               <div id="products-list">
                    ${getProductList(response)}
               </div>
            </div>
        `
        }
    }
}

export default HomeScreen;