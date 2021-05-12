import {API_URL} from "./config";

export const getProduct = async (id, type) => {
    return await axios.get(API_URL + '/products/' + type + `/${id}`);
}

export const sign_in = async ({email, password}) => {
    try {
        const response = await axios.post(
            `${API_URL}` + '/login', {}, {
                auth: {
                    username: email,
                    password: password
                }
            }
        )
        return response.data;
    } catch (err) {
        return { error: err.response.data.message || err.message}
    }
}
