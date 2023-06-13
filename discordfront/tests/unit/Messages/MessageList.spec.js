import { shallowMount } from '@vue/test-utils';
import MessagesList from '@/components/main/MessageComponents/MessagesList.vue';
import MessageComponent from '@/components/main/MessageComponents/MessageComponent.vue';
import MessageSkeleton from '@/components/main/MessageComponents/MessageSkeleton.vue';
import TextBarComponent from '@/components/main/MessageComponents/TextBarComponent.vue';
import { createRouter, createWebHistory } from 'vue-router';


describe('MessagesList', () => {
    let router;
  
    beforeEach(() => {
      router = createRouter({
        history: createWebHistory(),
        routes: [],
      });
    });
  test('renders MessageComponent and TextBarComponent correctly', () => {
    const messages = [
      { id: 1, user: 'user1', text: 'Message 1' },
      { id: 2, user: 'user2', text: 'Message 2' },
    ];

    const wrapper = shallowMount(MessagesList, {
        global: {
            plugins: [router],
            components: {
              'MessageComponent' : MessageComponent,
              'MessageSkeleton' : MessageSkeleton,
              'TextBarComponent' : TextBarComponent
            }
          },
      data() {
        return {
          messages,
          isloading: false,
          currentChannel: 'Channel 1',
        };
      },
    });

    expect(wrapper.findComponent(MessageComponent).exists()).toBe(true);
    expect(wrapper.findAllComponents(MessageComponent)).toHaveLength(messages.length);
    expect(wrapper.findComponent(MessageSkeleton).exists()).toBe(false);
    expect(wrapper.findComponent(TextBarComponent).exists()).toBe(true);
  });

  // Ajoutez d'autres tests selon vos besoins.
});