const ShippingAddressModal = {
    render: () => {
        return `<div class="modal-content">
                    <span id="close-modal">&times;</span>
                    <h3 id="modal-header"> Specify a shipping address </h3>
                    <form class="form" id="address-form"">
                        <div class="form-control">
                            <label for="country">
                                Country
                            </label>
                            <input type="text" placeholder="e.g. Sweden" id="country" required>
                        </div>
                        <div class="form-control">
                            <label for="city">
                                City
                            </label>
                        <input type="text" placeholder="e.g. Stockholm" id="city" required>
                        </div>
                         <div class="form-control">
                            <label for="street">
                                Street
                            </label>
                        <input type="text" placeholder="e.g. 1090 Airport Road Napa" id="street" required>
                        </div>
                        <div class="form-control">
                            <label for="zip">
                                ZIP
                            </label>
                        <input type="text" placeholder="e.g. 726-070" id="zip" required>
                        </div>
                        <div class="form-actions">
                            <button type="submit"> Save address </button>                        
                        </div>
                     </form>
                </div>`
    },

    after_render: () => {}
}

export default ShippingAddressModal;