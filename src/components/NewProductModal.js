const NewProductModal = {
    render: () => {
        return `<div class="modal-content">
                    <span id="close-modal">&times;</span>
                    <h3> Add a new book </h3>
                    <form class="form" id="new-product-form"">
                        <div class="form-control">
                            <label>
                                Title
                            </label>
                            <input type="text" placeholder="e.g. Harry Potter" id="title" required>
                        </div>
                        <div class="form-control">
                            <label for="author">
                                Author
                            </label>
                        <input type="text" placeholder="e.g. Joanne Rowling" id="author" required>
                        </div>
                        <div class="form-control">
                            <label for="price"> 
                                Price: $
                            </label>
                            <input type="number" id="price" step="0.1" min="0.1" placeholder="5" value="5" required> 
                        </div>
                        <div class="form-control">
                            <label for="availability"> 
                                Availability:
                            </label>
                            <input type="number" id="availability" min="1" value="1" required> 
                        </div>
                        <div class="form-actions">
                            <button type="submit"> Save product </button>                        
                        </div>
                     </form>
                </div>`;
    }
}

export default NewProductModal;