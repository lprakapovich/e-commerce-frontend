export const getCartItems = () => {
    const storageCartItems = localStorage.getItem('cartItems');
    return storageCartItems ? JSON.parse(storageCartItems) : [];
}

// cart items is a js object, but local storage requires a string format
export const updateCartItems = (cartItems) => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    console.log('local storage size', getCartItems().length);
}