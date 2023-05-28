import { mount } from '@vue/test-utils';
import moxios from 'moxios';
import MessageComponent from '../../../src/components/main/Messages/MessageComponent.vue';
import UserPicture from '../../../src/components/main/Users/UserPicture.vue';

describe('Message', () => {
  let wrapper
  const store = {
    getters: {
      'user/getUsername': jest.fn().mockReturnValue('JohnDoe')
    },
    dispatch: jest.fn()
  };
  beforeEach(() => {
    wrapper = mount(MessageComponent, {
      props: {
        userId: 1,
        message: 'Hello, world!'
      },
      global: {
        components: {
          UserPicture
        },
        mocks: {
          $store: store
        }
      }
    },
    moxios.install()
  );
})

  afterEach(() => {
    wrapper.unmount();
    moxios.uninstall();
  });

  it('displays the username and message', async () => {
    // Expect the loading state to be shown initially
    expect(wrapper.find('.animate-pulse').exists()).toBe(true);

    // Mock the user's username retrieval
    moxios.stubRequest('user/getUsername', {
      status: 200,
      response: { username: 'JohnDoe' }
    });

    // Wait for the component to fetch the username
    await wrapper.vm.$nextTick();

    // Expect the username to be displayed
    expect(wrapper.find('h4').text()).toBe('JohnDoe');

    // Expect the message to be displayed
    expect(wrapper.find('p').text()).toBe('Hello, world!');
  });
});
