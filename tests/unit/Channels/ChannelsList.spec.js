import { mount } from '@vue/test-utils';
import ChannelsList from '@/components/main/ChannelComponents/ChannelsList.vue';
import ChannelComponent from '@/components/main/ChannelComponents/ChannelComponent.vue';
import ChannelSkeleton from '@/components/main/ChannelComponents/ChannelSkeleton.vue';

describe('ChannelsList', () => {
  it('renders correctly', () => {
    const channels = [
      { id: 1, nom: 'Channel 1' },
      { id: 2, nom: 'Channel 2' },
    ];
    let wrapper = mount(ChannelsList,{
      components:{
        ChannelComponent,
        ChannelSkeleton
      },
      data() {
        return {
          channels: channels,
          isloading: false,
          error: ''
        };
      }
    });

    // Vérifier si les éléments principaux sont présents
    expect(wrapper.find('.w-100').exists()).toBe(true);
    expect(wrapper.find('.bg-gray-800').exists()).toBe(true);
    
    // Vérifier si le texte est rendu correctement
    expect(wrapper.find('.text-left').text()).toBe('Salons textuels');
    
    // Vérifier si les sous-composants sont rendus correctement
    console.log(wrapper.html());
    expect(wrapper.findComponent(ChannelsList).exists()).toBe(true);
    expect(wrapper.findComponent(ChannelComponent).exists()).toBe(true);
    expect(wrapper.findComponent(ChannelSkeleton).exists()).toBe(true);
    
    // Vérifier si les méthodes sont correctement appelées
    const addChannelSpy = jest.spyOn(wrapper.vm, 'addChannel');
    wrapper.find('#plus').trigger('click');
    expect(addChannelSpy).toHaveBeenCalled();
  });

  it('addChannel method adds a new channel', async () => {
    const wrapper = mount(ChannelsList);
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
  });

  it('deleteChannel method deletes a channel', async () => {
    const wrapper = mount(ChannelsList);
    const channelToDelete = { id: 1, nom: 'Channel to delete' };
    wrapper.vm.channels = [channelToDelete];

    // Simuler l'appel à la méthode deleteChannel
    const deleteChannelSpy = jest.spyOn(wrapper.vm, 'deleteChannel');
    wrapper.findComponent({ name: 'ChannelComponent' }).vm.$emit('delete-channel', channelToDelete.id);
    expect(deleteChannelSpy).toHaveBeenCalledWith(channelToDelete.id);

    await wrapper.vm.$nextTick();

    // Vérifier si le salon a été supprimé
    expect(wrapper.vm.channels).not.toContainEqual(expect.objectContaining({ id: channelToDelete.id }));
  });
});