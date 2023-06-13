import axios from './axiosInstance';

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

    async addFriend(user1_id, user2) {
        await axios.post('/createFriend', {
                user1_id: user1_id,
                user2: user2,
                published: 1
            })
        .then(response => {
            return response.data;
        })
        .catch(e => {
            console.warn(e);
            throw e.response.data.message;
        })
    }

    async isFriend(userId){
        const response = await axios.get(`/friend/${userId}`);
        return response.data !=='';
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