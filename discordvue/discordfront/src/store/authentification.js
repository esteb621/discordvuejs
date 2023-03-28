const state = {
    username: '',
    password: ''
  }
  
  const mutations = {
    SET_EMAIL(state, username) {
      state.username = username
    },
    SET_PASSWORD(state, password) {
      state.password = password
    }
  }
  
  const actions = {
    enregistrerEmail({ commit }, username) {
      commit('SET_USERNAME', username)
    },
    enregistrerPassword({ commit }, password) {
      commit('SET_PASSWORD', password)
    }
  }
  
  const getters = {
    getUsername: (state) => state.username,
    getPassword: (state) => state.password
  }
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
  }
  