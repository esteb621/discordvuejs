import { mount } from '@vue/test-utils';
import MessageComponent from '@/components/main/MessageComponents/MessageComponent.vue';
import { nextTick } from 'process';

describe('MessageComponent', () => {
  test('renders the username and message correctly', async () => {
    const userId = 1;
    const message = 'Hello, world!';
    
    const wrapper = mount(MessageComponent, {
      props: {
        userId,
        message
      }
    });

    // Vérifier si le nom d'utilisateur est correctement affiché
    await wrapper.vm.$nextTick();
    const username = await wrapper.find('h4');
    expect(username.value()).toBe(username); // Remplacez 'JohnDoe' par la valeur attendue

    // Vérifier si le message est correctement affiché
    const messageText = wrapper.find('p');
    expect(messageText.text()).toBe('Hello, world!'); // Remplacez 'Hello, world!' par la valeur attendue
  });

  test('displays a loading state for username', async () => {
    const userId = 1;
    const message = 'Hello, world!';
    
    const wrapper = mount(MessageComponent, {
      props: {
        userId,
        message
      }
    });

    // Vérifier si l'état de chargement pour le nom d'utilisateur est affiché
    const loadingState = await wrapper.find('.bg-gray-600');
    nextTick();
    expect(loadingState.exists()).toBe(true);
  });

  test('emits a click event when username is clicked', async () => {
    const userId = 1;
    const message = 'Hello, world!';
    
    const wrapper = mount(MessageComponent, {
      props: {
        userId,
        message
      }
    });

    // Simuler un clic sur le nom d'utilisateur
    const username = wrapper.find('h4');
    nextTick();
    username.trigger('click');

    // Vérifier si l'événement click a été émis
    expect(wrapper.emitted('username-click')).toBeTruthy();
  });

  // Ajoutez d'autres tests selon vos besoins

});