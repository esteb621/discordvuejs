import axios from 'axios';

const API_URL = '/api/auth/';

class AuthService {
  signup(username, email, password) {
    return axios.post(`${baseURL}/signup`, {
      username,
      email,
      password,
    });
  }

  login(username, password) {
    return axios.post(`${baseURL}/login`, {
      username,
      password,
    });
  }

  logout() {
    store.commit('removeToken');
    router.push("/");
  }
}

export default new AuthService();