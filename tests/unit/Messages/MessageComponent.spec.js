import { mount } from '@vue/test-utils';
import moxios from 'moxios';
import MessageComponent from '../../../src/components/main/Messages/MessageComponent.vue';
import store from '@/store';

describe('MessageComponent', () => {
  let wrapper;

  beforeEach(() => {

    // Mount the component with the store
    wrapper = mount(MessageComponent, {
      props: {
        userId: 1,
        message: 'Hello, world!'
      },
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

  it('fetches user data and displays username', async () => {
    // Mock the response for the getUsername API call
    const mockedUsername = 'JohnDoe';
    jest.spyOn(store.getters['user'], 'getUsername').mockReturnValue(mockedUsername);

    // Simulate the component's mounted hook
    await wrapper.vm.$options.setup(props);

    // Expect the getUsername getter to have been called with the correct arguments
    expect(store.getters['user/getUsername']).toHaveBeenCalledWith(1);

    // Expect the fetched username to be displayed in the component
    expect(wrapper.find('h4').text()).toBe(mockedUsername);
  });

  it('dispatches fetchUser action when username is not available', async () => {
    // Spy on the dispatch method of the store
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    // Simulate the component's mounted hook
    await wrapper.vm.$options.setup(props);

    // Expect the fetchUser action to have been dispatched with the correct arguments
    expect(dispatchSpy).toHaveBeenCalledWith('user/fetchUser', 1);
  });

  // Add more test cases as needed...
});
