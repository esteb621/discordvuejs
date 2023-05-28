import { flushPromises, mount } from '@vue/test-utils';
import ChannelsList from '@/components/main/Channels/ChannelsList.vue';
import moxios from 'moxios';
import { createStore } from 'vuex';
import { createRouter, createWebHistory } from 'vue-router';

describe('ChannelsList', () => {
  let wrapper;
  const id = 1;
  const store = createStore({
    modules: {
      channel: {
        state: {
          channels: [] // Initialize the channels state
        },
        getters: {
          getChannels: state => {
            return state.channels;
          }
        }
      }
    }
  }); // Create a mock Vuex store
  const routes = [
    {
      path: '/main/server/channel/:id',
      component: ChannelsList,
    },
  ];
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  router.push('/main/server/channel/1');

  beforeEach(() => {
    wrapper = mount(ChannelsList, {
      global: {
        plugins: [store, router],
        mocks: {
          $route: {
            path: '/main/server/channel/' + id,
          },
        },
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

  it('displays channels correctly', async () => {
    // Mock the response from the API
    const channels = [
      { id: 1, nom: 'Channel 1', admin: true },
      { id: 2, nom: 'Channel 2', admin: false },
    ];
    moxios.stubRequest('/api/channels', {
      status: 200,
      response: channels,
    });

    // Trigger the component to fetch channels
    await wrapper.vm.fetchChannels();

    // Verify that the channels are displayed correctly
    const channelComponents = wrapper.findAllComponents({ name: 'ChannelComponent' });
    expect(channelComponents.length).toBe(channels.length);

    channelComponents.forEach((channelComponent, index) => {
      const channel = channels[index];
      expect(channelComponent.props('id')).toBe(channel.id);
      expect(channelComponent.props('name')).toBe(channel.nom);
      expect(channelComponent.props('admin')).toBe(channel.admin);
    });
  });

  it('adds a new channel', async () => {
    // Mock the response from the API
    const newChannel = { id: 3, nom: 'Channel 3', admin: false };
    moxios.stubRequest('/api/channels', {
      status: 200,
      response: newChannel,
    });

    // Trigger the addChannel method
    await wrapper.vm.addChannel('Channel 3');

    // Verify that the new channel is added
    expect(wrapper.vm.$store.getters['channel/getChannels']).toContainEqual(expect.objectContaining(newChannel));
  });

  it('deletes a channel', async () => {
    // Mock the response from the API
    const deletedChannelId = 2;
    moxios.stubRequest(`/api/channels/${deletedChannelId}`, {
      status: 200,
    });

    // Set up initial channels
    wrapper.vm.$store.state.channel.channels = [
      { id: 1, nom: 'Channel 1', admin: true },
      { id: 2, nom: 'Channel 2', admin: false },
    ];

    // Trigger the deleteChannel method
    await wrapper.vm.deleteChannel(deletedChannelId);

    // Verify that the channel is deleted
    expect(wrapper.vm.$store.getters['channel/getChannels']).not.toContainEqual(expect.objectContaining({ id: deletedChannelId }));
  });
});