import {API_URL} from "./config";

export const getProduct = async (id, type) => {
    return axios.get(API_URL + '/products/' + type + `/${id}`);
}