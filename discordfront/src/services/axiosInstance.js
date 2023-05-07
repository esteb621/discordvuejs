import axios from 'axios';
import store from '@/store';
import router from '@/router';



const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api/discord',
  // baseURL: '/api/discord',
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (store.getters['auth/getUser']) {
      config.headers['userId'] = store.getters['auth/getUser'].id;
      config.headers['Authorization'] = store.state.auth.user.accessToken;
    }
    else{
      router.push('/login');
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    const token = response.headers.authorization;
    if (token) {
      store.commit('auth/setToken', token.split(' ')[1]);
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
