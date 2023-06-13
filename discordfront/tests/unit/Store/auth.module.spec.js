import { createStore } from 'vuex';
import { auth } from './auth.module';
import AuthService from '@/services/auth.service';
import pictureService from '@/services/picture.service';

jest.mock('@/services/auth.service');
jest.mock('@/services/picture.service');

describe('auth.module', () => {
  let store;

  beforeEach(() => {
    store = createStore({
      modules: {
        auth: {
          namespaced: true,
          ...auth,
        },
      },
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('actions', () => {
    it('handles login success', async () => {
      const user = { username: 'test', password: 'test' };
      const response = { accessToken: 'test-token' };
      AuthService.login.mockResolvedValue(response);

      await store.dispatch('auth/login', user);
      expect(store.state.auth.user).toStrictEqual(response);
      expect(store.state.auth.status.loggedIn).toBe(true);
    });

    // Add more test cases for login failure, logout, register success, register failure, etc...
  });

  describe('mutations', () => {
    it('handles login success', () => {
      const user = { username: 'test', password: 'test' };
      store.commit('auth/loginSuccess', user);

      expect(store.state.auth.user).toStrictEqual(user);
      expect(store.state.auth.status.loggedIn).toBe(true);
    });

    // Add more test cases for login failure, logout, register success, register failure, etc...
  });
});