import { mount, flushPromises } from '@vue/test-utils';
import moxios from 'moxios';
import MessageList from '../../../src/components/main/Messages/MessagesList.vue';
import store from '@/store';
import router from '@/router';

describe('MessageList', () => {
  let wrapper;

  beforeEach(() => {
    

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
     // setup messages to scroll
     const messagesToScroll = [{ id: 1, userId : 1, message : "Coucou" }, { id: 2, userId : 2, message : "Salut" }, { id: 3, userId : 1, message : "Comment ça va ?" }]
     wrapper.vm.messages = [messagesToScroll];
     wrapper.vm.idChannel = messagesToScroll[2].id

     // 2. Trigger the addChannel method with the desired input value
     moxios.stubRequest('/api/scrollToLastMessage', {
     status: 200,
     response: messagesToScroll,
     });
 

 
     // 3. Simulate asynchronous behavior and wait for promises/reactivity updates
     await wrapper.vm.scrollToLastMessage();
     await flushPromises();


     // 4. Assert that the new message is added correctly
     expect(wrapper.vm.scrollToLastMessage).toBeCalled();
   });

  it('sends a message', async () => {
     // 1. Mock the necessary dependencies and API calls
     // setup messages to scroll
     const messageToSend = { id: 1, userId : 1, message : "PING" }
 
     // 2. Trigger the addChannel method with the desired input value
     moxios.stubRequest('/api/sendMessage', {
     status: 200,
     response: messageToSend,
     });
  
     // 3. Simulate asynchronous behavior and wait for promises/reactivity updates
     await wrapper.vm.sendMessage();
     await flushPromises();
 
     //add message manually
     wrapper.vm.messages = messageToSend;


     // 4. Assert that the new message is added correctly
     expect(wrapper.vm.messages).toEqual(messageToSend)
    });
})