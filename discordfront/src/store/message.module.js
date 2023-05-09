import messageService from '@/services/message.service';
import { reactive } from 'vue';

export const message = {
    namespaced: true,
    state : reactive({
      channels: {},
    }), 
    actions: {
      async fetchMessages({ commit }, channelId) {
        const data = await messageService.getMessages(channelId);
        commit('setMessages', { channelId, messages: data });
      },
    },
    mutations: {
      setMessages(state, { channelId, messages }) {
        state.channels[channelId] = messages;
      },
    },
    getters: {
      getMessagesByChannelId: (state) => (channelId) => {
        return state.channels[channelId];
      }
    },
};
  