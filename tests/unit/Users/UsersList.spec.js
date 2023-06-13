import { mount,flushPromises } from '@vue/test-utils';
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
    jest.clearAllMocks();
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

    const getUsersMock = jest.spyOn(wrapper.vm.userService,'getUsers')

    moxios.stubRequest('/users', {
      status: 200,
      response: mockedUsers
    });

    getUsersMock.mockImplementation(wrapper.vm.userService.getUsers())


    // Wait for the async operations to complete
    await wrapper.vm.onMounted();
    await flushPromises();

    // Assert
    expect(getUsersMock).toBeCalledTimes(1);
    });
  });