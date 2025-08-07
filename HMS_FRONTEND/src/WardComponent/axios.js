// src/api/axios.js
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:9090',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default instance;
