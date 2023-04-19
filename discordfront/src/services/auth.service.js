import axios from './axiosInstance';


class AuthService {
  login(user) {
    return axios
      .post('../auth/login', {
        username: user.username,
        password: user.password
      })
      .then(response => {
        return response.data;
      })
      .catch(e => {
        console.warn(e.response.data.message);
        return e.response.data.message;
      });
  }

  register(user) {
    return axios.post('../auth/register', {
      username: user.username,
      email: user.email,
      password: user.password
    })
    .then(response => {
        return response.data;
    })
    .catch(e => {
      console.warn(e.response.data.message);
      return e.response.data.message;
    });
  }
}

export default new AuthService();