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

export const register = async ({username, email, password}) => {
    try {
        return await axios.post(`${API_URL + '/register'}`, {username: username, email: email, password: password});
    } catch (err) {
        return { error: err.response.data.message || err.message }
    }
}

export const createProduct = async ({ name, author, price, availableQuantity, type}) => {
    try {
        const response = await axios.post(API_URL + '/products/books',
            { name, author, price, availableQuantity, type });
        return response.data;
    } catch (err) {
        return { error: err.response.data.message || err.message }
    }
}

export const getProduct = async (id, type) => {
    try {
        const response = await axios.get(API_URL + '/products/' + type + `/${id}`, {
            auth: {
                username: 'admin',
                password: 'password'
            }});
        return response.data;
    } catch (err) {
        return { error: err.response.data.message || err.message }
    }
}

export const updateProduct = async ({id, name, author, price, availableQuantity, type}) => {
    try {
        const response = await axios.put(API_URL + '/products/books',
            { id, name, author, price, availableQuantity, type });
        return response.data;
    } catch (err) {
        return { error: err.response.data.message || err.message }
    }
}

export const getProducts = async (type, filters) => {
    try {
        const products = await axios.get(API_URL + '/products/' + type, {data: {}, params: filters});
        return products.data;
    } catch (err) {
        return { error: err.response.data.message || err.message }
    }
}

export const createOrder = async (order) => {
   try {
       const response = await axios.post(API_URL + '/orders',
           {
               issuer: order.issuer,
               orderState: order.orderState,
               orderedItems: order.orderedItems
           },
           {
               auth: {
                   username: 'user',
                   password: 'user'
               }
           });
       return response.data;
   } catch (err) {
       return { error: err.response.data.message || err.message }
   }
}

export const getOrders = async () => {

    try {
        const response = await axios.get(API_URL + "/orders", {
            auth: {
                username: 'user',
                password: 'user'
            }});
        return response.data;
    } catch (err) {
        return { error: err.response.data.message || err.message }
    }
}

export const getUserCart = async (issuer, {username, password}) => {
    try {
        const response = await axios.get(API_URL + "/orders/cart", {auth: {username, password}, params : {issuer}})
        return response.data;
    } catch (err) {
        return {error: err.response.message || err.message }
    }
}

export const getOrder = async (id) => {
    try {
        const response = await axios.get(API_URL + "/orders/" + id, {
            auth: {
                username: 'user',
                password: 'user'
            }
        })
        return response.data;
    } catch (err) {
        return {error: err.response.message || err.message }
    }
}

export const updateOrder = async ({id, issuer, orderedItems, date, lastModifiedDate, status}) => {
    try {
        const response = await axios.put(API_URL + "/orders", {
            id, issuer, status, orderedItems
        }, {
            auth: {
                username: 'user',
                password: 'user'
            }
        })
        return response.data;
    } catch (err) {
        return {error: err.response.message || err.message }
    }
}

export const deleteOrder = async (id) => {
    try {
        await axios.delete(API_URL + "/orders/" + id, {
            auth: {
                username: 'user',
                password: 'user'
            }
        })
    } catch (err) {
        return {error: err.response.message || err.message }
    }
}