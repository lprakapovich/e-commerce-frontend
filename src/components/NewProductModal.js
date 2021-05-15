const NewProductModal = {
    render: (product) => {
        console.log(product)
        return `<div class="modal-content">
                    <span id="close-modal">&times;</span>
                    <h3 id="modal-header"> Add a new book </h3>
                    <form class="form" id="new-product-form"">
                        <div class="form-control">
                            <label>
                                Title
                            </label>
                            <input type="text" placeholder="e.g. Harry Potter" id="title"
                                value="${product ? product.name : ''}" required>
                        </div>
                        <div class="form-control">
                            <label for="author">
                                Author
                            </label>
                        <input type="text" placeholder="e.g. Joanne Rowling" id="author"  
                            value="${product ? product.author : ''}" required>
                        </div>
                        <div class="form-control">
                            <label for="price"> 
                                Price: $
                            </label>
                            <input type="number" id="price" step="0.1" min="0.1" placeholder="5"
                                value="${product ? product.price : 0.1}" required> 
                        </div>
                        <div class="form-control">
                            <label for="availableQuantity"> 
                                Availability:
                            </label>
                            <input type="number" id="availableQuantity" min="1" 
                                value="${product ? product.availableQuantity : 1}" required> 
                        </div>
                        <div class="form-actions">
                            <button type="submit"> Save product </button>                        
                        </div>
                     </form>
                </div>`;
    }
}

export default NewProductModal;