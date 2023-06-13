import { flushPromises, mount } from '@vue/test-utils';
import moxios from 'moxios';
import TextBarComponent from '../../../src/components/main/Messages/TextBarComponent.vue';
import store from '@/store';

describe('TextBarComponent', () => {
  let wrapper;

  beforeEach(() => {

    // Mount the component with the mocked store
    wrapper = mount(TextBarComponent, {
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

  it('submits a message', async () => {

    // Set up the moxios response for the message submission
    const messageToSubmit = { id: 1, userId: 1, message: "Coucou", channel_id: 2 };
    moxios.stubRequest('/message/send', {
      status: 200,
      response: messageToSubmit
    });

    // Spy on the emit function
    const emitSpy = jest.spyOn(wrapper.vm, 'emit');

    emitSpy.mockImplementation(wrapper.vm.emit('send-message'));

    // Call the submitMessage function
    await wrapper.vm.submitMessage();
    await flushPromises();

    // Assert
    expect(emitSpy).toHaveBeenCalledWith('send-message');
  });

  // Add more test cases as needed...
});
