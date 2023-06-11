import { flushPromises, mount } from '@vue/test-utils';
import ChannelsList from '@/components/main/Channels/ChannelsList.vue';
import moxios from 'moxios';
import { createStore } from 'vuex';
import { createRouter, createWebHistory } from 'vue-router';
import { auth } from "../../../src/store/auth.module";
import { message } from "../../../src/store/message.module";
import { user } from "../../../src/store/user.module";
import { channel } from "../../../src/store/channel.module";
import axios from 'axios';

describe('ChannelsList', () => {
  let wrapper;
  const id = 1;
  const store = createStore({
    modules: {
      auth,
      message,
      channel,
      user
    }
  }); // Create a real Vuex store (not used in tests but the component needs to have it)
  const routes = [
    {
      path: '/main/server/channel/:id',
      component: ChannelsList,
    },
  ];
  const router = createRouter({
    history: createWebHistory(),
    routes: routes
  });

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
    
    // 1. Mock the necessary dependencies and API calls
    const watchEffectMock = jest.spyOn(wrapper.vm, 'watchEffect')


    // setup channels to watch
    const channelToWatch = { id: 4, nom: 'Channel 4', admin: false }
    wrapper.vm.channels = [channelToWatch];


    // 2. Trigger the addChannel method with the desired input value
    moxios.stubRequest('/api/watchEffect', {
    status: 200,
    response: channelToWatch,
    });

    watchEffectMock.mockResolvedValue(channelToWatch);

    // 3. Simulate asynchronous behavior and wait for promises/reactivity updates
    await wrapper.vm.watchEffect();
    await flushPromises();


    wrapper.vm.store.dispatch('channel/fetchChannels');


    // 4. Assert that the new message is added correctly
    expect(watchEffectMock).toBeCalled();

  });

  it('adds a new message', async () => {
    // 1. Mock the necessary dependencies and API calls
    const addChannelMock = jest.spyOn(wrapper.vm, 'addChannel')

    // 2. Trigger the addChannel method with the desired input value
    const newChannel = { id: 3, nom: 'Channel 3', admin: false };
    moxios.stubRequest('/api/createchannels', {
    status: 200,
    response: newChannel,
    });

    addChannelMock.mockResolvedValue(newChannel);

    // 3. Simulate asynchronous behavior and wait for promises/reactivity updates
    await wrapper.vm.addChannel('Channel 3');
    await flushPromises();

    //Adding the new channel manually since the addChannel function is mocked
    wrapper.vm.channels = [newChannel];


    // 4. Assert that the new message is added correctly
    expect(addChannelMock).toHaveBeenCalledWith(newChannel.nom);
    expect(wrapper.vm.channels).toContainEqual(newChannel);
  })

  it('deletes a channel', async () => {
   // 1. Mock the necessary dependencies and API calls
   const deleteChannelMock = jest.spyOn(wrapper.vm, 'deleteChannel')
   const channelToDelete = {id: 1, nom: 'Channel 1', admin: true}
  //Adding a new channel manually
  wrapper.vm.channels = [channelToDelete];

   // 2. Trigger the deleteChannel method with the desired input value
   const channelDeleted = { id: 1, nom: 'Channel 1', admin: true };
   moxios.stubRequest('/api/deletechannel', {
   status: 200,
   response: channelDeleted,
   });

   deleteChannelMock.mockResolvedValue(channelDeleted);

   // 3. Simulate asynchronous behavior and wait for promises/reactivity updates
   await wrapper.vm.deleteChannel(1);
   await flushPromises();

   //Delete channel manually since deleteChannel is mocked
   wrapper.vm.channels = [];

   // 4. Assert that the new message is added correctly
   expect(deleteChannelMock).toHaveBeenCalledWith(channelDeleted.id);
   expect(wrapper.vm.channels).toEqual([]);
 })
});
