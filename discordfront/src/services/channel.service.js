const baseURL = '/api/discord/';

class ChannelService {
  getChannel(username, email, password) {
    return axios.get(`${baseURL}/channels`);
  }

  addChannel(channel) {
    return axios.post(`${baseURL}/createchannel`,channel);
  }

}

export default new ChannelService();