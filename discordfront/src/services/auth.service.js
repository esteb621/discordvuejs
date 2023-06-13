import axios from './axiosInstance';
import TokenService from './token.service';


class AuthService {
  async login(user) {
    return axios
      .post('../auth/login', {
        username: user.username,
        password: user.password 
      })
      .then(response => {
        if (response.data.accessToken) {
          TokenService.setUser(response.data);
        }
        return response.data;
      })
      .catch(e => {
        return e.response.data.message;
      });
  }

  async register(user) {
    const formData = new FormData();
    formData.append("username", user.username);
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("profilePicture", user.profilePicture);

    return axios.post('../auth/register', formData,{
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(response => {
      if (response.data.accessToken) {
        TokenService.setUser(response.data);
      }
      return response.data;
    })
    .catch(e => {
      return e.response.data.message;
    });
  }

  logout() {
    TokenService.removeUser();
  }

}

export default new AuthService();