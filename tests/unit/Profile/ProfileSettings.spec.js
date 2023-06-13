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

    const updateProfileMock = jest.spyOn(wrapper.vm, 'updateProfile');

    await wrapper.vm.handleUpdate(usertoUpdate);
    await flushPromises();

    // Assert the desired behavior

    expect(updateProfileMock).toBeCalled();
  });

  // Add more tests as needed
});
