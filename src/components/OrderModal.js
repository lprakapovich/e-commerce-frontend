const OrderModal = {
    render: (order) => {
        return `<div class="modal-content">
                    <span id="close-modal">&times;</span>
                    <h3> Order №${order.id}</h3>
                </div>`;
    }
}

export default OrderModal;