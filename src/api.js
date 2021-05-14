import {API_URL} from "./config";
import axios from "axios";

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

export const getProduct = async (id, type) => {
    return await axios.get(API_URL + '/products/' + type + `/${id}`);
}

export const getProducts = async (type, filters) => {
    return await axios.get(API_URL + '/products/' + type, {data: {}, params: filters});
}

export const createOrder = async (order) => {
   try {
       const response = await axios.post(API_URL + '/orders',
           {
               issuer: order.issuer,
               orderState: order.orderState,
               orderedItems: order.orderedProducts
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