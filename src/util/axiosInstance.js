import axios from "axios";

import { BASE_URL } from './apiPaths';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type" : "application/json",
        Accept: "application/json"
    },
})

//Request Interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const tokenData = localStorage.getItem("token");
        if (tokenData) {
            const { value, timestamp } = JSON.parse(tokenData);
            const SIX_HOURS = 6 * 60 * 60 * 1000;
            if (Date.now() - timestamp < SIX_HOURS) {
                config.headers.Authorization = `Bearer ${value}`;
            } else {
                localStorage.removeItem("token"); // Remove expired token
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            if (error.response.status === 401) {
                localStorage.removeItem("token");
            } else if (error.response.status === 500) {
                console.error("Server error. Please try again later.");
            }
        } else if (error.code === "ECONNABORTED") {
            console.error("Request timeout. Please try again.");
        }
        return Promise.reject(error);
    }
)

export default axiosInstance;
