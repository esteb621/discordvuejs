import axios from 'axios';

const baseURL = 'http://localhost:8081/api/discord';

class UserService {

  async getUserById(id) {
    const response = await axios.get(`${baseURL}/users/`+id);
    const data = response.data.username;
    return data;
  }

}

export default new UserService();