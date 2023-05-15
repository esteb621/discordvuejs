import { mount } from '@vue/test-utils'
import ChannelsList from '@/components/main/Channels/ChannelsList.vue'

describe('ChannelsList.vue', () => {
  it('fetches channels and renders them', async () => {
    // mock channelService.getChannels() to return some channels
    const mockChannels = [
      { id: 1, nom: 'Channel 1' },
      { id: 2, nom: 'Channel 2' },
      { id: 3, nom: 'Channel 3' }
    ];
    jest.mock('@/services/channel.service', () => ({
      getChannels: jest.fn(() => Promise.resolve(mockChannels))
    }));

    // mount ChannelsList component
    const wrapper = mount(ChannelsList);

    // wait for channels to be fetched
    await wrapper.vm.$nextTick();

    // check that channels are rendered
    const channelComponents = wrapper.findAllComponents({ name: 'ChannelComponent' });
    expect(channelComponents).toHaveLength(mockChannels.length);
    mockChannels.forEach((channel, index) => {
      expect(channelComponents[index].props()).toEqual(channel);
    });
  });

  it('adds a channel', async () => {
    // mock channelService.addChannel() to return a new channel
    const newChannel = { id: 4, nom: 'New Channel' };
    jest.mock('@/services/channel.service', () => ({
      addChannel: jest.fn(() => Promise.resolve(newChannel))
    }));

    // mount ChannelsList component
    const wrapper = mount(ChannelsList);

    // click on the add channel button
    const addButton = wrapper.find('#plus');
    await addButton.trigger('click');

    // fill in the channel name and press Enter
    const input = wrapper.find('input[type="text"]');
    input.element.value = newChannel.nom;
    await input.trigger('keydown.enter');

    // check that the new channel is added
    expect(wrapper.vm.channels).toContainEqual(newChannel);
  });

  it('deletes a channel', async () => {
    // mock channelService.delete() to return a success message
    const deletedChannelId = 2;
    const deletedChannelName = 'Channel 2';
    jest.mock('@/services/channel.service', () => ({
      delete: jest.fn(() => Promise.resolve({ message: 'Channel deleted' }))
    }));

    // mount ChannelsList component with some channels
    const mockChannels = [
      { id: 1, nom: 'Channel 1' },
      { id: deletedChannelId, nom: deletedChannelName },
      { id: 3, nom: 'Channel 3' }
    ];
    const wrapper = mount(ChannelsList, {
      data() {
        return {
          channels: mockChannels
        };
      }
    });

    // click on the delete channel button
    const channelComponent = wrapper.findComponent({ name: 'ChannelComponent', props: { id: deletedChannelId } });
    const deleteButton = channelComponent.find('.delete-channel');
    await deleteButton.trigger('click');

    // check that the channel is deleted
    expect(wrapper.vm.channels).not.toContainEqual({ id: deletedChannelId, nom: deletedChannelName });
  });
});