import {API_URL} from "./config";
import axios from "axios";
import {getStorageUserInfo} from "./localStorage";

export const login = async ({email, password}) => {
    try {
        const response = await axios.post(
            `${API_URL}` + '/login', {}, {
                auth: {
                    username: email,
                    password: password
                }
            }
        );
        return response.data;
    } catch (err) {
        return { error: err.response.data.message || err.message}
    }
}

export const register = async ({name, email, password, role}) => {
    try {
        const response = await axios.post(`${API_URL + '/register'}`, {name, email, password, role});
        return response.data;
    } catch (err) {
        return { error: err.response.data.message || err.message }
    }
}

export const updateUserInfo =  async ({id, name, email, password}) => {
    try {
        const response = await axios.put(`${API_URL + '/users'}`, {id, name, email, password, role: getStorageUserInfo().role }, {
            auth : {
                username : getBasicAuthHeader().username,
                password : getBasicAuthHeader().password
            }});
        return response.data;
    } catch (err) {
        return {error: err.response.data.message || err.message }
    }
}

export const getUserInfo = async (id) => {
    const {username, password} = getBasicAuthHeader();
    try {
        const response = await axios.get(`${API_URL + `/users/${id}`}`, {
            auth: {
                username,
                password
            }})
        return response.data;
    } catch (err) {
        return { error: err.response.data.message || err.message }
    }
}

export const createProduct = async ({ name, author, price, availableQuantity, type, genre}) => {
    const {username, password} = getBasicAuthHeader();
    try {
        const response = await axios.post(API_URL + '/products/books',
            { name, author, price, availableQuantity, type, genre },
            {
                    auth : {
                        username,
                        password
                    }
            });
        return response.data;
    } catch (err) {
        return { error: err.response.data.message || err.message }
    }
}

export const getProduct = async (id, type) => {
    const {username, password} = getBasicAuthHeader();
    try {
        const response = await axios.get(API_URL + `/products/${type}/${id}`, {
            auth: {
                username,
                password
            }});
        return response.data;
    } catch (err) {
        return { error: err.response.data.message || err.message }
    }
}

export const updateProduct = async ({id, name, author, price, availableQuantity, type, genre}) => {
    const {username, password} = getBasicAuthHeader();
    try {
        const response = await axios.put(API_URL + '/products/books',
            { id, name, author, price, availableQuantity, type, genre },
            {
                auth: {
                    username, password
                }
            });
        return response.data;
    } catch (err) {
        return { error: err.response.data.message || err.message }
    }
}

export const getProducts = async (type, filters) => {
    try {
        const products = await axios.get(API_URL + `/products/${type}`, {data: {}, params: filters});
        return products.data;
    } catch (err) {
        return { error: err.response.data.message || err.message }
    }
}

export const createOrder = async (order) => {
    const {username, password} = getBasicAuthHeader();
    try {
       const response = await axios.post(API_URL + '/orders',
           {
               issuer: order.issuer,
               orderedItems: order.orderedItems
           },
           {
               auth: {
                   username,
                   password
               }
           });
       return response.data;
   } catch (err) {
       return { error: err.response.data.message || err.message }
   }
}

export const getOrders = async () => {
    const {username, password} = getBasicAuthHeader();
    try {
        const response = await axios.get(API_URL + "/orders/all", {
            auth: {
                username,
                password
            }});
        return response.data;
    } catch (err) {
        return { error: err.response.data.message || err.message }
    }
}

export const getUserCart = async (issuer, {username, password}) => {
    try {
        const response = await axios.get(API_URL + "/orders/cart",
            {auth: {username, password},
            params : {
            issuer,
            status: 'Cart'
        }})
        return response.data;
    } catch (err) {
        return {error: err.response.message || err.message }
    }
}

export const getOrder = async (id) => {
    const {username, password} = getBasicAuthHeader();
    try {
        const response = await axios.get(API_URL + `/orders/${id}`, {
            auth: {
                username,
                password
            }
        })
        return response.data;
    } catch (err) {
        return {error: err.response.message || err.message }
    }
}

export const updateOrder = async ({id, issuer, orderedItems, status, shippingAddress}) => {
    const {username, password} = getBasicAuthHeader();
    try {
        const response = await axios.put(API_URL + "/orders",
            { id, issuer, status, orderedItems, shippingAddress},
            {
            auth: {
                username,
                password
            }
        })
        return response.data;
    } catch (err) {
        return {error: err.response.message || err.message }
    }
}

export const deleteOrder = async (id) => {
    const {username, password} = getBasicAuthHeader();
    try {
        await axios.delete(API_URL + `/orders/${id}`, {
            auth: {
                username,
                password
            }
        })
    } catch (err) {
        return {error: err.response.message || err.message }
    }
}

// TODO replace with interceptor
export const getBasicAuthHeader = () => {
    return {
        username: getStorageUserInfo().email,
        password: getStorageUserInfo().password
    }
}