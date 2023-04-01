import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      selectedButtonId: null,
      selectedChannelId: null
    }
  },
  mutations: {
    setSelectedButtonId(state, buttonId) {
      state.selectedButtonId = buttonId
    },
    setSelectedChannelId(state, channelid) {
      state.selectedChannelId = channelid
    }
  },
  getters: {
    selectedButtonId: state => state.selectedButtonId,
    selectedChannelId: state => state.selectedChannelId
  },
  actions: {
    loadSelectedButtonIdFromLocalStorage({ commit }) {
      const selectedButtonId = localStorage.getItem('selectedButtonId')
      if (selectedButtonId) {
        commit('setSelectedButtonId', parseInt(selectedButtonId))
      }
    },
    loadSelectedChannelIdFromLocalStorage({ commit }) {
      const selectedChannelId = localStorage.getItem('selectedChannelId')
      if (selectedChannelId) {
        commit('setselectedChannelId', parseInt(selectedChannelId))
      }
    }

  }
})

store.dispatch('loadSelectedButtonIdFromLocalStorage')
store.dispatch('loadSelectedChannelIdFromLocalStorage')

export default store
