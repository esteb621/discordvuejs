import AuthService from '@/services/auth.service';

export const auth = {
  namespaced: true,
  state: {
    user: null,
  },
  actions: {
    login({ commit }, user) {
      return AuthService.login(user)
        .then(response => {
          if (response.accessToken) {
            commit('loginSuccess', response);
            return Promise.resolve(response);
          } else {
            commit('loginFailure');
            return Promise.reject(response);
          }
        });
    },
    logout({ commit }) {
      commit('logout');
    },
    register({ commit }, user) {
      return AuthService.register(user)
        .then(response => {
          if (response.accessToken){
            commit('registerSuccess', response);
            return Promise.resolve(response);
          } else {
            commit('registerFailure');
            return Promise.reject(response);
          }
        });
    }
  },
  mutations: {
    loginSuccess(state, user) {
      state.user = { id: user.id, accessToken: user.accessToken };
    },
    loginFailure(state) {
      state.user = null;
    },
    logout(state) {
      state.user = null;
    },
    registerSuccess(state, user) {
      state.user = { id: user.id, accessToken: user.accessToken };
    },
    registerFailure(state) {
      state.user = null;
    },
    setToken(state, token) {
      state.user.accessToken = token;
    },
  },
  getters: {
    getUser: (state) => {
      return state.user;
    }
  },  
};
