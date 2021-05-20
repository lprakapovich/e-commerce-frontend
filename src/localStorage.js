export const getStorageProducts = () => {
    const products = localStorage.getItem('products');
    return products ? JSON.parse(products) : [];
}

export const setStorageProducts = (products) => {
    localStorage.setItem('products', JSON.stringify(products));
}

export const setStorageUserInfo =
    ({
        id = '',
        name = '',
        email = '',
        password = '',
        role = ''
     }) => {
    localStorage.setItem('userInfo', JSON.stringify({id, name, email, password, role}))
}

export const getStorageUserInfo = () => {
    const userInfo = localStorage.getItem('userInfo');
    return userInfo ? JSON.parse(userInfo) : null;
}

export const clearStorageUserInfo = () => {
    localStorage.removeItem('userInfo');
}

export const setStorageCart = (cart) => {
    if (cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
    }
}

export const getStorageCart = () => {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : null;
}

export const clearStorageCart = () => {
    localStorage.removeItem('cart');
}

export const setStorageProcessedProduct = (product) => {
    localStorage.setItem('processedProduct', JSON.stringify(product));
}

export const getStorageProcessedProduct = () => {
    const processedProduct = localStorage.getItem('processedProduct');
    return processedProduct ? JSON.parse(processedProduct) : null;
}