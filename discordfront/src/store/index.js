import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      selectedButtonId: null
    }
  },
  mutations: {
    setSelectedButtonId(state, buttonId) {
      state.selectedButtonId = buttonId
    }
  },
  getters: {
    selectedButtonId: state => state.selectedButtonId
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
