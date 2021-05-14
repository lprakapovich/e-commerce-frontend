import Slider from "../components/Slider";
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

const fetchProducts = (products) => {
    return ` <ul id="books-container">
                    ${products.map(book => `
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
    const minPrice = localStorage.getItem('minPrice'),
        maxPrice = localStorage.getItem('maxPrice'),
        author = document.getElementById('author').value,
        name = document.getElementById('name').value;

    return {
        ...(minPrice) && { 'price[gte]' : minPrice },
        ...(maxPrice) && { 'price[lge]' : maxPrice },
        ...(author) && { 'author' : author },
        ...(name) && { 'name' : name },
    }
}

const HomeScreen = {
    after_render: () => {
        const products = getStorageProducts();
        let { priceMin, priceMax} = setProductPriceRanges(products)

        document.getElementById('slider').innerHTML= Slider.render(priceMin, priceMax);
        Slider.after_render();

        document.getElementById('products-filter-form').addEventListener('submit', (e) => {
            e.preventDefault();
            getProducts('books', getParams())
                .then(response => {
                document.getElementById('books-container').innerHTML = fetchProducts(response.data);
            })
        })
    },

    render: async () => {
        const {data, status} = await getProducts('books');
        if (!status || status !== 200) {
            return `<div> Couldn't fetch the books </div>`;
        } else {
            setStorageProducts(data);
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
                        <button type="submit"> Find </button>
                    </div>
                </form>
               <div id="products-list">
                    ${fetchProducts(data)}
               </div>
            </div>
        `
        }
    }
}

export default HomeScreen;