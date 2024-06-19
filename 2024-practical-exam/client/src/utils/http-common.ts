
import { api } from '@/config/api';
import { getDecToken } from '@/store/local-storage';
import axios from 'axios';

export const http = axios.create({
    baseURL: `${api}/api/v1`,
    headers: { 'Content-Type': 'application/json' }
})

http.interceptors.request.use(function (config) {
    /* 
    Check if token exists in local storage  
    and attach it to the header of the request
    */
    const token = getDecToken();
    if (token) config.headers['Authorization'] = `Bearer ${token}`;
    config.headers['Content-Type'] = 'application/json';
    return config;
}, function (error) {
    /* 
    If there is an error with the request,
    return the error message
    */
    return Promise.reject(error);
})

http.interceptors.response.use(
    /* 
    If the response is successful, return the response
    */
    function (response) {
        return Promise.resolve(response);
    },
    function (error) {
        return error.response;
    }
)