import { mount } from '@vue/test-utils';
import MessageComponent from '../../../src/components/main/Messages/MessageComponent.vue';
import UserPicture from '../../../src/components/main/Users/UserPicture.vue';
import userService from '../../../src/services/user.service.js';

jest.mock('@/services/user.service');

describe('MessageComponent', () => {
  it('renders correctly with username', async () => {
    const mockUser = { id: 1, username: 'User1' };
    userService.getUserById.mockResolvedValue(mockUser);

    const wrapper = mount(MessageComponent, {
      props: {
        userId: 1,
        message: 'Hello World',
      },
      components: {
        UserPicture,
      },
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.find('#message').exists()).toBe(true);
    expect(wrapper.findComponent(UserPicture).props('id')).toBe(1);
    expect(wrapper.find('h4').text()).toBe('User1');
    expect(wrapper.find('p').text()).toBe('Hello World');
  });

  it('renders correctly without username', async () => {
    userService.getUserById.mockResolvedValue(null);

    const wrapper = mount(MessageComponent, {
      props: {
        userId: 1,
        message: 'Hello World',
      },
      components: {
        UserPicture,
      },
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.find('#message').exists()).toBe(true);
    expect(wrapper.findComponent(UserPicture).props('id')).toBe(1);
    expect(wrapper.find('h4').exists()).toBe(false);
    expect(wrapper.find('p').text()).toBe('Hello World');
  });
});