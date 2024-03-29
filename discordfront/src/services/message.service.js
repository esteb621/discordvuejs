import axios from './axiosInstance';

class MessageService {

  async sendMessage(idUser,idChannel,message){
    await axios.post('/createMessage', {
      user_id: idUser,
      channel_id: idChannel,
      text:message
    })
    .then(response => {
      return response;
    })
    .catch(error => {
      console.warn(error);
    });
  }
  
  async getMessages(idChannel) {
    const response = await axios.get(`/messages/channel/`+idChannel);
    const data = response.data.map(item => ({
      id: item.id,
      channel: item.channel_id,
      user: item.user_id,
      text: item.text
    }));
    return data;
  }

}

export default new MessageService();