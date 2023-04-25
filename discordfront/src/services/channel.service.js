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

  async addChannel(nom,id) {
    await axios.post(`/createchannel`,{
      nom:nom,
      id:id,
      typologie:1
    })
    .then(createdChannel =>{
      return createdChannel.data;
    })
    .catch(error => {
      return error.response.data.message;
    });
  }

}

export default new ChannelService();