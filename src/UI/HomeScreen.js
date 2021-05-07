import data from '../data.js';

const HomeScreen = {
    render: () => {
        const { books } = data;
        return `
            <ul class="books">
            ${books.map(book => `
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
                    ${book.id}
                </div>
                <div class="book-price">
                   ${book.price}
                </div>
             </li>`).join('\n')}
        `;
    }
}

export default HomeScreen;