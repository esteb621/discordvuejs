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
      await axios.post("/createChannel",{
        nom:nom,
      })
      .then(response => {
          return response.data;
      })
      .catch(e=>{
          throw e.response.data.message;
      })
  }

  async addPrivateChannel(nom) {
    await axios.post("/createPrivateChannel",{
      nom:nom,
    })
    .then(response => {
        return response.data;
    })
    .catch(e=>{
        throw e.response.data.message;
    })
}

  async deleteChannel(id){
    try {
      const response = await axios.delete(`/delete/channels/${id}`);
      return response.data;
    } catch(e) {
        throw e.response.data.message;
    }
  }

}

export default new ChannelService();