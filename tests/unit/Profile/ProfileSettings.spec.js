import { mount, flushPromises } from '@vue/test-utils';
import ProfileSettings from '../../../src/components/main/Profile/ProfileSettings.vue';
import moxios from 'moxios';
import store from '@/store';
import router from '@/router';

describe('ProfileSettings', () => {
  let wrapper;

  beforeEach(() => {

    wrapper = mount(ProfileSettings, {
      global: {
        plugins: [store, router],
      },
    });

    moxios.install();
  });

  afterEach(() => {
    wrapper.unmount();
    jest.clearAllMocks();
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

    const updateProfileMock = jest.spyOn(wrapper.vm.pictureService, 'uploadProfilePic');

    updateProfileMock.mockImplementation(wrapper.vm.pictureService.uploadProfilePic())



    await wrapper.vm.handleUpdate();
    await flushPromises();

    // Assert the desired behavior

    expect(updateProfileMock).toBeCalledTimes(1);
  });

  it('handles the delete', async () => {
    const usertoDelete = { id: 1, email: "test@gmail.com", username: "Pierre", password: "1256pirt", picture:"ojfzojnfoznjvojzvn" };

    moxios.stubRequest('/api/handlesDelete', {
      status: 200,
      response: usertoDelete,
    });

    const deleteAccountMock = jest.spyOn(wrapper.vm.userService, 'deleteAccount');

    deleteAccountMock.mockImplementation(wrapper.vm.userService.deleteAccount())

    await wrapper.vm.handleDelete();
    await flushPromises();

    // Assert the desired behavior

    expect(deleteAccountMock).toBeCalled();
  });

  it('calls onMounted correctly', async () => {
    // Set up the moxios response for fetching userPictures
    const mockedUsers = [
      { id: 1, username: 'JohnDoe', picture: "https://images.generated.photos/vtrrFTu6JT6eIBsF4KLcUzE0e4H0Ot8JtyncppG3Nbk/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/OTY1MjE3LmpwZw.jpg" },
      { id: 2, username: 'JaneSmith', picture: "https://generated.photos/face/neutral-white-young-adult-female-with-medium-brown-hair-and-brown-eyes--5e6803676d3b380006d4307d" },
    ]

    const userServiceMock = jest.spyOn(wrapper.vm.userService,'getUserById')

    moxios.stubRequest('api/onMounted', {
      status: 200,
      response: mockedUsers
    });

    userServiceMock.mockImplementation(wrapper.vm.userService.getUserById())


    // Wait for the async operations to complete
    await wrapper.vm.onMounted();
    await flushPromises();

    // Assert
    expect(userServiceMock).toBeCalledTimes(1);
    });

    

  // Add more tests as needed
});
