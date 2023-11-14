import axios from "axios";
import { accessToken, getUserInfo } from "../utils/constants";

export const apiClient = axios.create({
    baseURL: process.env.NEXTAUTH_URL + "/v1",
});

console.log(process.env)

apiClient.interceptors.request.use(
    config => {
        const access_token = getUserInfo()?.access_token
        config.headers['Authorization'] = `Bearer ${access_token}`;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (error.response && [401].includes(error.response.status)) {
            localStorage.removeItem(accessToken)
            window.location.reload();
        }
        return Promise.reject(error);
    }
);