import EventBus from '@/common/EventBus';
import channelService from '@/services/channel.service';
import userService from '@/services/user.service';
import { reactive } from 'vue';

export const channel = {
    namespaced: true,
    state : reactive({
      channels: [],
      privateMessages:[]
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
      async fetchPrivateMessages({ commit },userId) {
        await userService.getPrivateMessages(userId)
        .then(async data => {
            commit('setPrivateMessages', { channels: data });
        })
        .catch(e => {
          if (e.response && e.response.status === 403) {
            EventBus.dispatch("logout");
          }
      })
      }
    },
    mutations: {
        setChannels(state, { channels }) {
        state.channels = channels;
      },
        setPrivateMessages(state, { channels }) {
          console.log(channels)
        state.privateChannels = channels;
      },
    },
    getters: {
        getChannels: (state) => {
            return state.channels;
        },
        getPrivateMessages: (state) => {
          return state.privateChannels;
      },
    },
};
  