import axios from 'axios';

const baseURL = 'http://localhost:8080/api/discord';

class UserService {

  async getUserById(id) {
    const response = await axios.get(`${baseURL}/users/`+id);
    const data = response.data.username;
    return data;
  }

  async getUsers(){
    const response = await axios.get(`${baseURL}/users`);
    const data = response.data.map(item => ({
      id: item.id,
      username: item.username
    }));
    return data;
  }

}

export default new UserService();