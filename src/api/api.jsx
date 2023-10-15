
import axios from "axios";

// eslint-disable-next-line react-hooks/rules-of-hooks

// const token = response.accessToken;
// localStorage.setItem('accessToken', token);



// const apis = axios.create({
//   baseURL: 'https://your-s-url.com',
// });

// apis.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('accessToken');
//     if (token) {
//       // config.headers.Authorization = Bearer ${token};
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

const api = axios.create({
  baseURL: 'https://drawproject-production.up.railway.app/api',
  
});
// Thêm các headers mặc định nếu cần
// api.defaults.headers.common["Authorization"] = "Bearer YOUR_ACCESS_TOKEN";
// Đặt cookies vào tiêu đề yêu cầu (nếu có)
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('accessToken');
//     if (token) {
//       config.headers.Authorization =` Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return console.log(error);;
//   }
// );

// export default api;
export const getData = async (endpoint, params = {}, headers = {}) => {
  try {
    const response = await api.get(endpoint, { params, headers });
    return response; // Trả về toàn bộ phản hồi từ API
  } catch (error) {
    throw error;
  }
};

export const postData = async (endpoint, data, headers = {}) => {
  try {
    const response = await api.post(endpoint, data, { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const putData = async (endpoint, id, data, headers = {}) => {
  try {
    const response = await api.put(`${endpoint}/${id}`, data, { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteData = async (endpoint, id, headers = {}) => {
  try {
    const response = await api.delete(`${endpoint}/${id}`, { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
};
// export default apis;