import { mount } from '@vue/test-utils';
import moxios from 'moxios';
import UsersList from '../../../src/components/main/Users/UsersList.vue';

describe('UsersComponent', () => {
  let wrapper;

  beforeEach(() => {
    // Mount the component
    wrapper = mount(UsersList);

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

  it('calls onMounted correctly', async () => {
    // Set up the moxios response for fetching users
    const mockedUsers = [
      { id: 1, username: 'JohnDoe' },
      { id: 2, username: 'JaneSmith' },
    ];
    moxios.stubRequest('/users', {
      status: 200,
      response: mockedUsers
    });

    // Wait for the async operations to complete
    await wrapper.vm.onMounted();

    // Assert
    const userComponents = wrapper.findAllComponents(UsersList);
    expect(userComponents.length).toBe(mockedUsers.length);

    userComponents.forEach((userComponent, index) => {
      expect(userComponent.props('username')).toBe(mockedUsers[index].username);
      expect(userComponent.props('userId')).toBe(mockedUsers[index].id);
      expect(userComponent.props('link')).toBe(mockedUsers[index].picture);
    });
  });

  it('handles error when fetching users', async () => {
    // Set up the moxios response for fetching users
    moxios.stubRequest('/users', {
      status: 403,
      response: { message: 'Unauthorized' }
    });

    // Spy on the EventBus dispatch method
    const dispatchSpy = jest.spyOn(wrapper.vm.eventBus, 'dispatch');

    // Wait for the async operations to complete
    await wrapper.vm.$nextTick();
    await moxios.wait();

    // Assert
    expect(dispatchSpy).toHaveBeenCalledWith('logout');
  });

  // Add more test cases as needed...
});
