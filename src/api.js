import {API_URL} from "./config";
import axios from "axios";

export const getProduct = async (id, type) => {
    return await axios.get(API_URL + '/products/' + type + `/${id}`);
}

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
