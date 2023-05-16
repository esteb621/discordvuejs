
import { mount } from '@vue/test-utils';
import UsersList from '../../../src/components/main/Users/UsersList.vue';
import UserComponent from '../../../src/components/main/Users/UserComponent.vue';
import UserSkeleton from '../../../src/components/main/Users/UserSkeleton.vue';
import userService from '@/services/user.service.js';

jest.mock('@/services/user.service');

describe('UsersList', () => {
  it('renders correctly', async () => {
    const mockUsers = [
      { id: 1, username: 'User1', picture: 'user1.jpg' },
      { id: 2, username: 'User2', picture: 'user2.jpg' },
      { id: 3, username: 'User3', picture: 'user3.jpg' },
    ];
    userService.getUsers.mockResolvedValue(mockUsers);

    const wrapper = mount(UsersList, {
      components: {
        UserComponent,
        UserSkeleton,
      },
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.find('#users').exists()).toBe(true);
    expect(wrapper.find('h2').text()).toBe('Utilisateurs');
    expect(wrapper.find('#users-list').exists()).toBe(true);
    expect(wrapper.findComponent(UserSkeleton).exists()).toBe(false);
    expect(wrapper.findAllComponents(UserComponent)).toHaveLength(mockUsers.length);

    const userComponents = wrapper.findAllComponents(UserComponent);
    userComponents.forEach((userComponent, index) => {
      const user = mockUsers[index];
      expect(userComponent.props('username')).toBe(user.username);
      expect(userComponent.props('userId')).toBe(user.id);
      expect(userComponent.props('link')).toBe(user.picture);
    });
  });
});