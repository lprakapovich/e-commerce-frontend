export const parseRequestUrl = () => {
    const url = document.location.hash.toLowerCase();
    const request = url.split('/');
    return {
        resource: request[1],
        id: request[2],
        action: request[3]
    }
}

// TODO fix resetting local storage cartItems
export const rerender = async (component) => {
     // document.getElementById("main-container").innerHTML = await component.render();
     // await component.after_render();
}

export const calculateOrderTotal = (orderedItems) => {
    let sum = 0;
     Array.from(orderedItems).forEach(orderedItem => {
        sum += orderedItem.orderedQuantity * orderedItem.product.price;
    })
    return sum;
}