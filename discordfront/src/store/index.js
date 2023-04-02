import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      selectedButtonId: null,
      token: null
    }
  },
  mutations: {
    setSelectedButtonId(state, buttonId) {
      state.selectedButtonId = buttonId
    },
    storeToken(state, token) {
      state.token = token
    }
  },
  getters: {
    selectedButtonId: state => state.selectedButtonId,
    token: state => state.token
  },
  actions: {
    loadSelectedButtonIdFromLocalStorage({ commit }) {
      const selectedButtonId = localStorage.getItem('selectedButtonId')
      if (selectedButtonId) {
        commit('setSelectedButtonId', parseInt(selectedButtonId))
      }
    }
  }
})

store.dispatch('loadSelectedButtonIdFromLocalStorage')

export default store
