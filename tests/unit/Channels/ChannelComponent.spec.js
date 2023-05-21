import { flushPromises, mount } from '@vue/test-utils';
import axios from '@/services/axiosInstance';
import moxios from 'moxios';
import ChannelComponent from '../../../src/components/main/Channels/ChannelComponent.vue';

describe('ChannelComponent', () => {
  let wrapper;
  const admin = true
  const id = 1;
  const name = 'Channel Test'
  const deleteChannel = jest.fn(); // Mock de la méthode deleteChannel
  beforeEach(()=>{
    wrapper = mount(ChannelComponent, {
    props: {
      name: name,
      to: '/main/server/channel/'+id,
      path: '/main/server/channel/'+id,
      id: id,
      admin: admin
    },
    global: {
      mocks: {
        $route: {
          path: '/main/server/channel/'+id,
        }
      }
    }});
    moxios.install(axios);
  });
  afterEach(()=>{
    wrapper.unmount();
    moxios.uninstall();
  });

  it('The wrapper exists and shows channels name correctly', () => {
  expect(wrapper.exists()).toBe(true)
  expect(wrapper.props('name')).toBe('Channel Test');
  });

  it('calls methods correctly', async () => {
    const div = wrapper.findAll('font-awesome-icon');
    div[1].element.onclick = deleteChannel; // Définir la fonction deleteChannel comme onclick handler
    expect(div[1].exists()).toBe(true)
    await (div[1].trigger('click'));
    expect(deleteChannel).toHaveBeenCalled();
    await flushPromises();
  });

  it('verify deleteChannel', async () => {
    const div = wrapper.findAll('font-awesome-icon');
    await div[1].trigger('click');
    expect(wrapper.emitted('delete-channel',wrapper.props.id)).toBeTruthy();
    expect(wrapper.emitted('delete-channel')[0][0]).toBe(id);
    await flushPromises();
  });

  it('verify router path', () => {
    const routerLink = wrapper.findComponent('router-link');
    expect(routerLink.attributes('to')).toBe('/main/server/channel/'+id);
  });
});
