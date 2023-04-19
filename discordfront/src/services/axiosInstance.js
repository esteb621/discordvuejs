import axios from 'axios';
import store from '@/store';



const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api/discord',
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (store.getters['auth/getUser']) {
      console.log(config);
      config.headers['Authorization'] = `Bearer ${store.state.auth.user.accessToken}`;
    }
    return config;
  },
  (error) => {
    console.warn(error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    const token = response.headers.authorization;
    if (token) {
      console.log(token);
      store.commit('auth/setToken', token.split(' ')[1]);
    }
    return response;
  },
  (error) => {
    console.warn(error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
