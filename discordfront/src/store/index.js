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
    }
  },
  getters: {
    token: state => state.token
  },
  actions: {

  }
})


export default store
