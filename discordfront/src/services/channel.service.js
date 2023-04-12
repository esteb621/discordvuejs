import axios from 'axios';

const baseURL = 'http://localhost:8080/api/discord/';

class ChannelService {


  async getChannels() {
    const response = await axios.get(`${baseURL}/channels`);
    const data = response.data.map(item => ({
      id: item.id,
      nom: item.nom
    }));
    return data;
  }

  async addChannel(channel) {
    await axios.post(`${baseURL}/createchannel`,channel);
  }

}

export default new ChannelService();