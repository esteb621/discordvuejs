import { flushPromises, mount } from '@vue/test-utils';
import moxios from 'moxios';
import axios from '@/services/axiosInstance';
import ChannelsList from '../../../src/components/main/Channels/ChannelsList.vue';

describe('ChannelsList', () => {
  let wrapper;
  const deleteChannel = jest.fn();
  beforeEach(()=>{
    const channels = [
      { id: 1, nom: 'Channel 1', admin:true},
      { id: 2, nom: 'Channel 2', admin:false },
    ];
    wrapper = mount(ChannelsList,{
      data() {
        return {
          channels: channels,
          isloading: false,
          error: '',
        };
      }})
    moxios.install(axios);
  });
  afterEach(()=>{
    wrapper.unmount();
    moxios.uninstall();
  })
  it('renders correctly', () => {
    
    // Vérifier si les méthodes sont correctement appelées
    const addChannelSpy = jest.spyOn(wrapper.vm, 'addChannel');
    wrapper.find('#plus').trigger('click');
    expect(addChannelSpy).toHaveBeenCalled();
    const deleteChannelSpy = jest.spyOn(wrapper.vm, 'deleteChannel');
    wrapper.find('font-awesome-icon').trigger('delete-channel');
    expect(deleteChannelSpy).toHaveBeenCalled();
    expect(wrapper.exists()).toBe(true)
  });

  it('addChannel method adds a new channel', async () => {
    const channelName = 'New Channel';

    // Simuler la saisie du nom du salon
    const input = wrapper.find('input[type="text"]');
    input.element.value = channelName;
    input.trigger('input');

    // Simuler l'appui sur la touche Entrée
    input.trigger('keydown.enter');

    await wrapper.vm.$nextTick();

    // Vérifier si le nouveau salon a été ajouté
    expect(wrapper.vm.channels).toContainEqual(expect.objectContaining({ nom: channelName }));
    await flushPromises();
  });

  it('deleteChannel method deletes a channel', async () => {
    const channelToDelete = { id: 1, nom: 'Channel to delete' };
    wrapper.vm.channels = [channelToDelete];

    // Simuler l'appel à la méthode deleteChannel
    const deleteChannelSpy = jest.spyOn(wrapper.vm, 'deleteChannel');
    wrapper.findComponent({ name: 'ChannelComponent' }).vm.$emit('delete-channel', channelToDelete.id);
    expect(deleteChannelSpy).toHaveBeenCalledWith(channelToDelete.id);

    await wrapper.vm.$nextTick();

    // Vérifier si le salon a été supprimé
    expect(wrapper.vm.channels).not.toContainEqual(expect.objectContaining({ id: channelToDelete.id }));
    await flushPromises();
  });
});