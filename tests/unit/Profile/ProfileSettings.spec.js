import { mount, flushPromises } from '@vue/test-utils';
import ProfileSettings from '../../../src/components/main/Profile/ProfileSettings.vue';
import moxios from 'moxios';
import { createRouter, createWebHistory } from 'vue-router';
import { createStore } from 'vuex';

describe('ProfileSettings', () => {
  let wrapper;
  let store;
  let router;

  beforeEach(() => {
    store = createStore({
      modules: {
        auth: {
          getters: {
            getUser: () => ({ id: 1, email: "test@gmail.com", username: "Pierre", password: "1256pirt", picture:"ojfzojnfoznjvojzvn" }), // Mock the 'getUser' getter with the desired implementation
          },
        },
      },
    });

    router = createRouter({
      history: createWebHistory(),
      routes: [/* Define your routes here */],
    });

    wrapper = mount(ProfileSettings, {
      global: {
        plugins: [store, router],
        mocks: {
          $t: (key) => key, // Mock the $t function if needed
        },
      },
    });

    moxios.install();
  });

  afterEach(() => {
    wrapper.unmount();
    moxios.uninstall();
  });

  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('handles the update', async () => {
    const usertoUpdate = { id: 1, email: "test@gmail.com", username: "Pierre", password: "1256pirt", picture:"ojfzojnfoznjvojzvn" };

    moxios.stubRequest('/api/handlesUpdate', {
      status: 200,
      response: usertoUpdate,
    });

    const updateProfileMock = jest.spyOn(wrapper.vm, 'updateProfile');

    await wrapper.vm.handleUpdate(usertoUpdate);
    await flushPromises();

    // Assert the desired behavior

    expect(updateProfileMock).toBeCalled();
  });

  // Add more tests as needed
});
