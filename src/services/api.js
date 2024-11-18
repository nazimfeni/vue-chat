import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:8000/api'; // Replace with your Laravel API URL
axios.defaults.withCredentials = true; // Ensure cookies are sent with requests

export const api = {
    register(data) {
        return axios.post('/register', data);
    },
    login(data) {
        return axios.post('/login', data);
    },
    logout() {
        return axios.post('/logout');
    },
    getUser() {
        return axios.get('/user');
    },
};
