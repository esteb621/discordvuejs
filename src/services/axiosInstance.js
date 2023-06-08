import axios from 'axios';
import store from '@/store';
// import router from '@/router';
import TokenService from './token.service';


const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api/discord',
  // baseURL: '/api/discord',
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = TokenService.getLocalAccessToken();
    if (token) {
      config.headers['userId'] = store.getters['auth/getUser'].id;
      config.headers["x-access-token"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (originalConfig.url !== "../auth/login" && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const rs = await axiosInstance.post("../auth/refreshtoken", {
            refreshToken: TokenService.getLocalRefreshToken(),
          });
          const { accessToken } = rs.data;

          store.dispatch('auth/refreshToken', accessToken);
          TokenService.updateLocalAccessToken(accessToken);
          console.log("Access Token mis a jour!")
          return axiosInstance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  }
);

export default axiosInstance;
