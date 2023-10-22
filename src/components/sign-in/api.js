const token = response.accessToken;
localStorage.setItem('accessToken', token);
import axios from 'axios';

const loginApi = (username, pwd) =>{
    return axios.post("https://drawproject-production.up.railway.app/api/auth/login", {username, pwd});
}

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default {loginApi};