import axios from './axiosInstance';
import channelService from './channel.service';

class UserService {

    async getUserById(id) {
        const response = await axios.get(`/user/` + id);
        const data = response.data;
        return data;
    }


    async getUsers() {
        const response = await axios.get(`/users`);
        const data = response.data.map(item => ({
            id: item.id,
            username: item.username,
            picture: item.picture
        }));
        return data;
    }

    async updateProfile(id, user) {
        try {
            const response = await axios.put(`/update/users/${id}`, {
                username: user.username,
                password: user.password,
                email: user.email
            });
            return response.data.message;
        } catch (e) {
            throw e.response.data.message;
        }
    }

    async updatePassword(id, user) {
        try {
            const response = await axios.put(`/update/password/${id}`, {
                currentPassword: user.currentPassword,
                newPassword: user.newPassword
            });
            return response.data.message;
        } catch (e) {
            throw e.response.data.message;
        }
    }

    async deleteAccount(idUser) {
        try {
            await axios.delete(`../picture/delete/${idUser}`);
            const response = axios.delete(`/delete/users/${idUser}`);
            return response;
        } catch (e) {
            throw e.response.data.message;
        }
    }

    async addFriend(user1_id, user2_id) {
        try {
            await axios.post('/createFriend', {
                user1_id: user1_id,
                user2_id: user2_id,
                published: 1
            })
            .then(async data => {
                await axios.get('/friend',data.user2_id)
                .then(async friends => {
                    if(friends){
                        const nom = "channel_"+user1_id+"_"+user2_id
                        const response = channelService.addChannel(nom,2);
                        return response;
                    }
                })
            })
            .catch(e => {
                return e.response.data.message;
            })
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    async getPrivateMessages(userId) {
        const response = await axios.get(`/channels/private/${userId}`);
        const data = response.data.map(item => ({
          id: item.id,
          nom: item.nom
        }));
        return data;
      }

}

export default new UserService();