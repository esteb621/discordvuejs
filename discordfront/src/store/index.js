import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      connected:null,
      token: null
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
    }
  },
  getters: {
    token: state => state.token
  },
  actions: {

  }
})


export default store
