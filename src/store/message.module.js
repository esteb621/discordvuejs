import channelService from '@/services/channel.service';
import messageService from '@/services/message.service';
import { reactive } from 'vue';

export const message = {
    namespaced: true,
    state : reactive({
      channels: {},
      channelNames: {},
    }), 
    actions: {
      async fetchMessages({ commit }, channelId) {
        const data = await messageService.getMessages(channelId);
        const name = await channelService.getChannelName(channelId);
        commit('setMessages', { channelId, messages: data });
        commit('setChannelName', { channelId, name });
      },
    },
    mutations: {
      setMessages(state, { channelId, messages }) {
        state.channels[channelId] = messages;
      },
      setChannelName(state, { channelId, name }) {
        state.channelNames[channelId] = name;
      },
    },
    getters: {
      getMessagesByChannelId: (state) => (channelId) => {
        return state.channels[channelId];
      },
      getChannelNameById: (state) => (channelId) => {
        return state.channelNames[channelId];
      },
    },
};
  