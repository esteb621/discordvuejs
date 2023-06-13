import { flushPromises, mount } from '@vue/test-utils';
import ChannelsList from '@/components/main/Channels/ChannelsList.vue';
import moxios from 'moxios';
import store from '@/store';
import router from '@/router';

describe('ChannelsList', () => {
  let wrapper;
  const id = 1;

  beforeEach(() => {
    wrapper = mount(ChannelsList, {
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

  it('watchEffect correctly', async () => {

    // setup channels to watch
    const channelToWatch = { id: 4, nom: 'Channel 4', admin: false }
    wrapper.vm.channels = [channelToWatch];

    const getUserIdMock = jest.spyOn(wrapper.vm.userService,'getUserById')


    // 2. Trigger the addChannel method with the desired input value
    moxios.stubRequest('/api/watchEffect', {
    status: 200,
    response: channelToWatch,
    });

    //add the mocked function to the instance that is called by watchEffect
    getUserIdMock.mockImplementation(wrapper.vm.userService.getUserById())


    // 3. Simulate asynchronous behavior and wait for promises/reactivity updates
    await wrapper.vm.watchEffect();
    await flushPromises();

    // 4. Assert that the new message is added correctly
    expect(getUserIdMock).toBeCalled();


  });

  it('adds a new message', async () => {
   
    // 2. Trigger the addChannel method with the desired input value
    const newChannel = { id: 3, nom: 'Channel 3', admin: false };
    const addChannelServiceMock = jest.spyOn(wrapper.vm.channelService,'addChannel')
    moxios.stubRequest('/api/createchannels', {
    status: 200,
    response: newChannel,
    });


    // 3. Simulate asynchronous behavior and wait for promises/reactivity updates
    await wrapper.vm.addChannel('Channel 3');
    await flushPromises();


    //add the mocked function to the one that addChannel is calling
    addChannelServiceMock.mockImplementation(wrapper.vm.channelService.addChannel())


    // 4. Assert that the new message is added correctly
    expect(addChannelServiceMock).toBeCalledTimes(1)
  })

  it('deletes a channel', async () => {
   // 1. Mock the necessary dependencies and API calls
   const channelToDelete = {id: 1, nom: 'Channel 1', admin: true}
   const deleteChannelServiceMock = jest.spyOn(wrapper.vm.channelService,'delete')


   // 2. Trigger the deleteChannel method with the desired input value
   moxios.stubRequest('/api/deletechannel', {
   status: 200,
   response: channelToDelete,
   message: ""
   });

   // 3. Simulate asynchronous behavior and wait for promises/reactivity updates
   await wrapper.vm.deleteChannel(1);
   await flushPromises();

   // 4. Assert that the new message is deleted correctly
   expect(deleteChannelServiceMock).toBeCalled()
 })
});
