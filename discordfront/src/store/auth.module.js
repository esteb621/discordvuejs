import AuthService from '@/services/auth.service';
import pictureService from '@/services/picture.service';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    async login({ commit }, user) {
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
      AuthService.logout();
      commit('logout');
    },
    async register({ commit }, user) {
      return AuthService.register(user)
        .then(response => {
          console.log(response);
          if(user.picture){
            pictureService.uploadProfilePic(response.id,user.picture);
          }
          if (response.accessToken){
            console.log(response.accessToken);
            commit('registerSuccess', response);
            return Promise.resolve(response);
          } else {
            commit('registerFailure');
            return Promise.reject(response);
          }
        });
    },
    refreshToken({ commit }, accessToken) {
      commit('refreshToken', accessToken);
    }
  },
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false; 
      state.user = null;
    },
    registerSuccess(state,user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    },
    setToken(state,token){
      state.user.accessToken=token;
    },
    refreshToken(state, accessToken) {
      state.status.loggedIn = true;
      state.user = { ...state.user, accessToken: accessToken };
    }
  },
  getters: {
    getUser: (state) => {
      return state.user || '';
    }
  },
};
