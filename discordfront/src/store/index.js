import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      connected:null,
      token: null,
      currentChannel: null
    }
  },
  mutations: {

    storeToken(state, token) {
      state.token = token
      localStorage.setItem('jwt', token);
    },
    removeToken(state) {
      state.token = null
      localStorage.removeItem('jwt');
    },
    storeChannel(state,channel){
      state.currentChannel=channel;
      localStorage.setItem('currentChannel',channel);
    }
  },
  getters: {
    token: state => state.token,
    currentChannel: state => state.currentChannel
  },
  actions: {

  }
})


export default store
