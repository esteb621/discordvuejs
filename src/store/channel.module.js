import EventBus from '@/common/EventBus';
import channelService from '@/services/channel.service';
import { reactive } from 'vue';

export const channel = {
    namespaced: true,
    state : reactive({
      channels: [],
    }), 
    actions: {
      async fetchChannels({ commit }) {
        await channelService.getChannels()
        .then(async response => {
            const data = response;
            commit('setChannels', { channels: data });
        })
        .catch(e => {
          if (e.response && e.response.status === 403) {
            EventBus.dispatch("logout");
          }
      })
      },
    },
    mutations: {
        setChannels(state, { channels }) {
        state.channels = channels;
      },
    },
    getters: {
        getChannels: (state) => {
            return state.channels;
        },
    },
};
  