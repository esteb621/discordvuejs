import { mount, flushPromises } from '@vue/test-utils';
import moxios from 'moxios';
import { createStore } from 'vuex';
import { createRouter, createWebHistory } from 'vue-router';
import MessageList from '../../../src/components/main/Messages/MessagesList.vue';

describe('MessageList', () => {
  let wrapper;
  let store;
  let router

  router = createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/main/server/:id',
        component: MessageList
      },
      {
        path: '/main/personal/:id',
        component: MessageList
        
      }
    ]
  });

  beforeEach(() => {
    // Create a fresh Vuex store instance
    store = createStore({
      modules: {
        message: {
          state: {
            messages: []
          },
          getters: {
            getMessagesByChannelId: jest.fn(),
            getChannelNameById: jest.fn()
          },
          actions: {
            fetchMessages: jest.fn()
          }
        }
      }
    });

    // Mount the component with the store
    wrapper = mount(MessageList, {
      global: {
        plugins: [store,router]
      }
    });

    // Install Moxios for HTTP mocking
    moxios.install();
  });

  afterEach(() => {
    // Unmount the component and restore Moxios
    wrapper.unmount();
    jest.clearAllMocks();
    moxios.uninstall();
  });

  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('scrolls to the last message', async () => {
     // 1. Mock the necessary dependencies and API calls
     const scrollLastMessageMock = jest.spyOn(wrapper.vm, 'scrollToLastMessage')

     // setup messages to scroll
     const messagesToScroll = [{ id: 1, userId : 1, message : "Coucou" }, { id: 2, userId : 2, message : "Salut" }, { id: 3, userId : 1, message : "Comment ça va ?" }]
     wrapper.vm.messages = [messagesToScroll];

     let i = 0

     while( i < messagesToScroll.length,i++){
        wrapper.vm.createElement('p').then(textContent(messagesToScroll[i].message));
     }
 
 
     // 2. Trigger the addChannel method with the desired input value
     moxios.stubRequest('/api/scrollToLastMessage', {
     status: 200,
     response: messagesToScroll,
     });
 
     scrollLastMessageMock.mockResolvedValue(messagesToScroll);
 
     // 3. Simulate asynchronous behavior and wait for promises/reactivity updates
     await wrapper.vm.scrollToLastMessage();
     await flushPromises();
 
     //scrollToLastMessage logic
     const messageList = wrapper.findAll('p')
     messageList.scrollTo(0, messageList.scrollHeight);


     // 4. Assert that the new message is added correctly
     expect(scrollLastMessageMock).toBeCalled();
     expect(document.body.scroll()).toEqual(scrolling);
   });

  it('sends a message', async () => {
     // 1. Mock the necessary dependencies and API calls
     const sendMessageMock = jest.spyOn(wrapper.vm, 'sendMessage')

     // setup messages to scroll
     const messageToSend = { id: 1, userId : 1, message : "PING" }
 
     // 2. Trigger the addChannel method with the desired input value
     moxios.stubRequest('/api/sendMessage', {
     status: 200,
     response: messageToSend,
     });
 
     sendMessageMock.mockResolvedValue(messageToSend);
 
     // 3. Simulate asynchronous behavior and wait for promises/reactivity updates
     await wrapper.vm.sendMessage();
     await flushPromises();
 
     //add message manually
     wrapper.vm.messages = messageToSend;


     // 4. Assert that the new message is added correctly
     expect(sendMessageMock).toBeCalled();
     expect(wrapper.vm.messages).toEqual(messageToSend)
    });

  it('fetches and displays messages', async () => {
    const mockedMessages = [
      { id: 1, user: 1, channel: 1, text: 'Hello' },
      { id: 2, user: 2, channel: 1, text: 'Hi' }
    ];

    // Mock the response for fetchMessages API call
    moxios.stubRequest('/api/messages', {
      status: 200,
      response: mockedMessages
    });

    // Trigger the component's watchEffect to fetch messages
    await wrapper.vm.$options.setup();

    // Expect the fetchMessages action to have been dispatched
    expect(store.dispatch).toHaveBeenCalledWith('message/fetchMessages', idChannel);

    // Expect the getMessagesByChannelId getter to have been called
    expect(store.getters['message/getMessagesByChannelId']).toHaveBeenCalledWith(idChannel);

    // Expect the fetched messages to be displayed in the component
    const messageComponents = wrapper.findAllComponents(MessageComponent);
    expect(messageComponents).toHaveLength(mockedMessages.length);

    // Verify the content of each message component
    messageComponents.forEach((messageComponent, index) => {
      const message = mockedMessages[index];
      expect(messageComponent.props('userId')).toBe(message.user);
      expect(messageComponent.props('message')).toBe(message.text);
    });
  });
})