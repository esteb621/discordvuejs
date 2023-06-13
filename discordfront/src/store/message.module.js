import EventBus from '@/common/EventBus';
import channelService from '@/services/channel.service';
import messageService from '@/services/message.service';
import { reactive } from 'vue';

export const message = {
    namespaced: true,
    state : reactive({
      messages: {},
      channelNames: {},
    }), 
    actions: {
      async fetchMessages({ commit }, channelId) {
        await messageService.getMessages(channelId)
        .then(async response => {
          const data = response;
          const name = await channelService.getChannelName(channelId);
          commit('setMessages', { channelId, messages: data });
          commit('setChannelName', { channelId, name });
        })
        .catch(e => {
          if (e.response && e.response.status === 403) {
              EventBus.dispatch("logout");
          }
      })
      },
    },
    mutations: {
      setMessages(state, { channelId, messages }) {
        state.messages[channelId] = messages;
      },
      setChannelName(state, { channelId, name }) {
        state.channelNames[channelId] = name;
      },
    },
    getters: {
      getMessagesByChannelId: (state) => (channelId) => {
        return state.messages[channelId];
      },
      getChannelNameById: (state) => (channelId) => {
        return state.channelNames[channelId];
      },
    },
};
  