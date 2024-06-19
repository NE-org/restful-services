
import { api } from '@/config/api';
import { getDecToken } from '@/store/local-storage';
import axios from 'axios';

export const http = axios.create({
    baseURL: `${api}/api/v1`,
    headers: { 'Content-Type': 'application/json' }
})

http.interceptors.request.use(function (config) {
    const token = getDecToken();
    if (token) config.headers['Authorization'] = `Bearer ${token}`;
    config.headers['Content-Type'] = 'application/json';
    return config;
}, function (error) {
    return Promise.reject(error);
})

http.interceptors.response.use(
    function (response) {
        return Promise.resolve(response);
    },
    function (error) {
        return error.response;
    }
)