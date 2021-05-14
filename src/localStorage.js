export const getProducts = (suffix) => {
    const products = localStorage.getItem('products');
    return products ? JSON.parse(products) : [];
}

export const setProducts = (products) => {
    localStorage.setItem('products', JSON.stringify(products));
}

export const getCartItems = () => {
    const cartItems = localStorage.getItem('cartItems');
    return cartItems ? JSON.parse(cartItems) : [];
}

export const setCartItems = (cartItems) => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

export const setUserInfo =
    ({
        id = '',
        name = '',
        email = '',
        password = '',
        role = ''
     }) => {
    localStorage.setItem('userInfo', JSON.stringify({id, name, email, password, role}))
}

export const getUserInfo = () => {
    const userInfo = localStorage.getItem('userInfo');
    return userInfo ? JSON.parse(userInfo) : null;
}

export const clearUserInfo = () => {
    localStorage.removeItem('userInfo');
}

export const isAdmin = () => {
    return getUserInfo() && getUserInfo().role === 'Admin';
}
