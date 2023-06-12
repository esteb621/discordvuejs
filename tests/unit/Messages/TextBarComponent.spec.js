import { flushPromises, mount } from '@vue/test-utils';
import moxios from 'moxios';
import { createStore } from 'vuex';
import { auth } from "../../../src/store/auth.module";
import { message } from "../../../src/store/message.module";
import { user } from "../../../src/store/user.module";
import { channel } from "../../../src/store/channel.module";
import TextBarComponent from '../../../src/components/main/Messages/TextBarComponent.vue';

describe('TextBarComponent', () => {
  let wrapper;

  beforeEach(() => {
    // Create a mocked store instance
    store = createStore({
      modules: {
        auth: {
          getters: {
            getUser: () => ({ id: 1 }) // Mocked implementation for 'auth/getUser' getter
          }
        }
      }
    });

    // Mount the component with the mocked store
    wrapper = mount(TextBarComponent, {
      global: {
        plugins: [store]
      }
    });

    // Install Moxios for HTTP mocking
    moxios.install();
  });

  afterEach(() => {
    // Unmount the component and restore Moxios
    wrapper.unmount();
    moxios.uninstall();
  });

  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('submits a message', async () => {
    // Mock the store getter for the authenticated user
    const mockedUser = { id: 1, name: "Pierre" };
    wrapper.vm.$store.getters['auth/getUser'] = mockedUser;

    // Mock the current route value
    const mockedRoute = { params: { id: 1 } };
    wrapper.vm.$router.currentRoute = mockedRoute;

    // Set up the moxios response for the message submission
    const messageToSubmit = { id: 1, userId: 1, message: "Coucou", channel_id: 2 };
    moxios.stubRequest('/message/send', {
      status: 200,
      response: messageToSubmit
    });

    // Spy on the emit function
    const emitSpy = jest.spyOn(wrapper.vm, 'emit');

    // Call the submitMessage function
    await wrapper.vm.submitMessage();
    await flushPromises();

    // Assert
    expect(emitSpy).toHaveBeenCalledWith('send-message', mockedUser.id, messageToSubmit.channel_id, messageToSubmit.message);
  });

  // Add more test cases as needed...
});
