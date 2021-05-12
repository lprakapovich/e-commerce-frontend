export const getCartItems = () => {
    const storageCartItems = localStorage.getItem('cartItems');
    return storageCartItems ? JSON.parse(storageCartItems) : [];
}

export const updateCartItems = (cartItems) => {
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
    return userInfo ? JSON.parse(userInfo) : { name: '', email: '', password: ''}
}