

import axios from 'axios';
const token = Response.accessToken;
// localStorage.setItem('accessToken', token);

const api = axios.create({
  baseURL: 'https://drawproject-production.up.railway.app/api',
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    console.log(token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;