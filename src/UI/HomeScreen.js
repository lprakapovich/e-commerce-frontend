const HomeScreen = {
    render: async () => {
        const response = await axios.get('http://localhost:8000/api/products/books');
        return response.status !== 200 ? `<div> Couldn't fetch the books </div>` :
            `
            <ul class="books">
            ${response.data.map(book => `
            <li>
                <div class="book">
                   <a href="/#/book/1">
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
                   ${book.price}
                </div>
             </li>`).join('\n')}
        `;
    }
}

export default HomeScreen;