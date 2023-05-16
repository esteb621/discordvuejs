import axios from './axiosInstance';

class UserService {

  async getUserById(id) {
    const response = await axios.get(`/user/`+id);
    const data = response.data;
    return data;
  }

  async getUsers(){
    const response = await axios.get(`/users`);
    const data = response.data.map(item => ({
      id: item.id,
      username: item.username,
      picture: item.picture
    }));
    return data;
  }

  async updateProfile(id, user) {
    try {
      const response = await axios.put(`/update/users/${id}`, {
        username: user.username,
        password: user.password,
        email: user.email
      });
      return response.data.message;
    } catch (e) {
      throw e.response.data.message;
    }
  }

}

export default new UserService();