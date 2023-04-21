import axios from './axiosInstance';

class UserService {

  async getUserById(id) {
    const response = await axios.get(`/users/`+id);
    const data = response.data.username;
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

}

export default new UserService();