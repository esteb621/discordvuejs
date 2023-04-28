import axios from './axiosInstance';


class AuthService {
  login(user) {
    return axios
      .post('../auth/login', {
        username: user.username,
        password: user.password
      })
      .then(response => {
        localStorage.setItem('user', JSON.stringify(response.data));
        return response.data;
      })
      .catch(e => {
        console.warn(e.response.data.message);
        return e.response.data.message;
      });
  }

  register(user) {
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
        localStorage.setItem('user', JSON.stringify(response.data));
        return response.data;
    })
    .catch(e => {
      console.warn(e.response.data.message);
      return e.response.data.message;
    });
  }

  logout() {
    localStorage.removeItem('user');
  }

}

export default new AuthService();