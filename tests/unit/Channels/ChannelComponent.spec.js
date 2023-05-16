import { shallowMount } from '@vue/test-utils';
import { RouterLink } from 'vue-router';
import ChannelComponent from '../../../src/components/main/Channels/ChannelComponent.vue';

describe('ChannelComponent', () => {
  it('affiche correctement le nom du channel', () => {
    const name = 'Channel Test';
    const wrapper = shallowMount(ChannelComponent, {
        components: {
          'router-link': RouterLink,
        },
      props: {
        name: name,
        to: '/main/server/channel/',
        path: '/main/server/channel/',
        id: 1,
      },
      global: {
        mocks: {
          $route: {
            path: '/main/server/channel/',
          }
        }
      }
  });
  const routerLink = wrapper.findComponent(RouterLink);
  expect(routerLink.props().to).toBe('/main/server/channel/');

    expect(wrapper.text()).toContain(name);
  });

  it('clique sur le bouton de suppression du channel', () => {
    const id = 1;
    const wrapper = shallowMount(ChannelComponent, {
      props: {
        name: 'Channel Test',
        to: '/main/server/channel/',
        path: '/main/server/channel/',
        id: id,
      },
      global: {
        mocks: {
          $route: {
            path: '/main/server/channel/',
          }
        }
      }
    });

    wrapper.find('.text-gray-400 cursor-pointer hover:text-gray-300').trigger('click');

    expect(wrapper.emitted('delete-channel')).toBeTruthy();
    expect(wrapper.emitted('delete-channel')[0][0]).toBe(id);
  });

  it('applique la classe "active" lorsque le routeur est actif', () => {
    const wrapper = shallowMount(ChannelComponent, {
      props: {
        name: 'Channel Test',
        id: 1,
        to: '/main/server/channel/',
        path: '/main/server/channel/'

      },
      global: {
        mocks: {
          $route: {
            path: '/main/server/channel/1',
          },
        },
      },
    });

    expect(wrapper.classes()).toContain('active');
  });

  it("n'applique pas la classe 'active' lorsque le routeur n'est pas actif", () => {
    const wrapper = shallowMount(ChannelComponent, {
      props: {
        name: 'Channel Test',
        to: '/main/server/channel/',
        id: 1,
      },
      global: {
        mocks: {
          $route: {
            path: '/main/server',
          },
        },
      },
    });

    expect(wrapper.classes()).not.toContain('active');
  });
});
