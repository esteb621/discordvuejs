import { mount, flushPromises } from '@vue/test-utils';
import moxios from 'moxios';
import UserPicture from '../../../src/components/main/Users/UserPicture.vue';
import router from '@/router';
import store from '@/store';

describe('UserPicture', () => {
  let wrapper;

  beforeEach(() => {
    // Mount the component with props
    wrapper = mount(UserPicture, {
      global : {
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

  it('calls onMounted correctly', async () => {
    // Set up the moxios response for fetching userPictures
    const mockedUsers = [
      { id: 1, username: 'JohnDoe', picture: "https://images.generated.photos/vtrrFTu6JT6eIBsF4KLcUzE0e4H0Ot8JtyncppG3Nbk/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/OTY1MjE3LmpwZw.jpg" },
      { id: 2, username: 'JaneSmith', picture: "https://generated.photos/face/neutral-white-young-adult-female-with-medium-brown-hair-and-brown-eyes--5e6803676d3b380006d4307d" },
    ]

    const dispatchPicturesMock = jest.spyOn(wrapper.vm.store,'dispatch')

    moxios.stubRequest('user/fetchPicture', {
      status: 200,
      response: mockedUsers
    });

    dispatchPicturesMock.mockImplementation(wrapper.vm.store.dispatch('user/fetchPicture'))


    // Wait for the async operations to complete
    await wrapper.vm.onMounted();
    await flushPromises();

    // Assert
    expect(dispatchPicturesMock).toBeCalledTimes(1);
    });

  // Add more test cases as needed...
});
