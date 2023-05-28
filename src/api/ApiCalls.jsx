import axios from "axios";

const baseURL = "http://localhost:8080/post"

export const createPostApi = (data) => {
    return axios.post(baseURL, data);
}

export const updatePostApi = (id, data) => {
    return axios.put(baseURL + "/" + id, data);
}

export const getPostApi = (id) => {
    if (!id) id = 0;

    return axios.get(baseURL + "/" + id);
}

export const getPostByUserIdApi = (userId) => {
    if (!userId) userId = 0;

    return axios.get(baseURL + "/user/" + userId);
}

export const deletePostApi = (id) => {
    return axios.delete(baseURL + "/" + id);
}