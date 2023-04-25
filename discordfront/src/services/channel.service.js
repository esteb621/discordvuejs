import axios from './axiosInstance';

class ChannelService {

  async getChannels() {
    const response = await axios.get(`/channels/1`);
    const data = response.data.map(item => ({
      id: item.id,
      nom: item.nom
    }));
    return data;
  }

  async getChannelName(id){
    const response = await axios.get(`/channel/`+id);
    const data = response.data.nom;
    return data;
  }

  async addChannel(nom) {
    try {
      const response = await axios.post(`/createchannel`,{
        nom:nom,
        typologie:1
      });
      return response.data;
    } catch(e) {
      throw e.response.data.message;
    }
  }
  

}

export default new ChannelService();