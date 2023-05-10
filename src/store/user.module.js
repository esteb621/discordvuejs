import pictureService from '@/services/picture.service';
import userService from '@/services/user.service';
import { reactive } from 'vue';

export const user = {
  namespaced: true,
  state: reactive({
    users: [],
    pictures:[]
  }),
  actions: {
    async fetchUser({ commit }, userId) {
      const user = await userService.getUserById(userId);
      commit('setUsername', {userId:userId, username:user.username} );
    },
    async fetchPicture({ commit }, userId) {
        const picture = await pictureService.getProfilePicture(userId);
        commit('setPicture', {userId:userId, picture:picture} );
    },
  },
  mutations: {
    setUsername(state, {userId, username} ) {
        state.users[userId] = username;
    },
    setPicture(state, {userId, picture} ) {
        state.pictures[userId] = picture;
    },  },
  getters: {
    getUsername: (state) => (userId) => {
      return state.users[userId];
    },
    getPicture: (state) => (userId) => {
        return state.pictures[userId];
      },
  },
};
