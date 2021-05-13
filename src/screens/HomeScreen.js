const HomeScreen = {
    after_render: () => {},
    render: async () => {
        const response = await axios.get('http://localhost:8000/api/products/books');
        if (!response || response.status !== 200) {
            return `<div> Couldn't fetch the books </div>`;
        }

        let maxAvailableQuantity = 0;
        response.data.forEach(book => {
            if (book.availableQuantity > maxAvailableQuantity) {
                maxAvailableQuantity = book.availableQuantity;
            }
        })

        return `
            <div class="product-list-container">
                <form class="filters">
                <div class="form-control">
                    <div>
                        <label>
                            Title
                        </label>
                        <input type="text" placeholder="e.g. Harry Potter" id="title">        
                    </div>
                    <div>
                        <label>
                            Author
                        </label>
                        <input type="text" placeholder="e.g. Joanne Rowling" id="author">        
                    </div>
                      <input type="submit">
                </div>
                </form>
                <ul class="books">
                    ${response.data.map(book => `
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
                .join('\n')} 
            </div>
        `;
    }
}

export default HomeScreen;