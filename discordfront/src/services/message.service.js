import axios from 'axios';

const baseURL = 'http://localhost:8080/api/discord';

class MessageService {

  async getMessages(idChannel) {
    const response = await axios.get(`${baseURL}/messages/channel/`+idChannel);
    const data = response.data.map(item => ({
      id: item.id,
      channel: item.channel_id,
      user: item.user_id,
      text: item.text
    }));
    return data;
  }

  async getChannelName(id){
    const response = await axios.get(`${baseURL}/channels/`+id);
    const data = response.data.nom;
    return data;
  }

  async addChannel(nom,id) {
    await axios.post(`${baseURL}/createchannel`,{
      id:id,
      channel:nom,
    });
  }

}

export default new MessageService();