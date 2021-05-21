const OrderModal = {
    render: (order) => {
        return `<div class="modal-content">
                    <span id="close-modal">&times;</span>
                     <h2> Order details </h2>
                    <div class="order-item">
                        <div class="order-details">
                            <h3> №${order.id} </h3>
                            <p> <strong> By </strong> ${order.issuer.name} </p>
                        </div>
                         <p>
                           <strong> On </strong> ${order.lastModifiedDate.dayOfMonth}th ${order.lastModifiedDate.month} ${order.lastModifiedDate.year}
                        </p>
                        <p>  ${order.status === 'Processed' ? `<strong> Address </strong>` +
                            order.shippingAddress.country + `, ` + order.shippingAddress.city + `, ` 
                            + order.shippingAddress.street + `, ` + order.shippingAddress.zip : ''} 
                        </p>
                       
                        ${order.orderedItems.map(item => `
                            <div class="product-item">
                                <div class="product-details">
                                <h4> Product №${item.product.id} </h4>
                                <div> ${item.product.name} </div>
                                <div> ${item.product.author} </div>
                            </div>
                            <div class="product-price">
                                <div> Price: ${item.product.price}$ </div>
                            </div>
                            </div>`)}
                        </div>
                    </div>`;
    }
}

export default OrderModal;