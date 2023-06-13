import { mount, flushPromises } from '@vue/test-utils';
import moxios from 'moxios';
import ProfileBanner from '../../../src/components/main/Profile/ProfileBanner.vue';
import store from '@/store/index';
import router from '@/router/index';

describe('ProfileComponent', () => {
  let wrapper;

  beforeEach(() => {
    // Mount the component
    wrapper = mount(ProfileBanner,{
      global:{
        plugins: [store,router]
      }
    });

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

  it('gets username', async () => {
    // setup channels to watch
    const getUserIdMock = jest.spyOn(wrapper.vm.userService,'getUserById')
    const userToGet = { id: 4, username:"Pierrinator",  }

    // 2. Trigger the addChannel method with the desired input value
    moxios.stubRequest('/api/watchEffect', {
    status: 200,
    response: userToGet,
    });

    //add the mocked function to the one that getUsername is calling
    getUserIdMock.mockImplementation(wrapper.vm.userService.getUserById())

    // 3. Simulate asynchronous behavior and wait for promises/reactivity updates
    await wrapper.vm.getUsername(userToGet);
    await flushPromises();

    //Expect
    expect(getUserIdMock).toBeCalledTimes(1);
  });

  // Add more test cases as needed...
});
