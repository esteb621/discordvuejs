import { shallowMount } from '@vue/test-utils';
import SideBarIcon from '@/components/main/SideBar/SideBarIcon.vue';
import { RouterLink } from 'vue-router';

describe('SideBarItem', () => {
  it('renders correctly', () => {
    const props = {
      name: 'Messages privés',
      icon: ['fab', 'discord'],
      id: 'personal',
    };

    const wrapper = shallowMount(SideBarIcon, {
      props,
      global: {
        components: {
          'router-link': RouterLink,
        },
      },
    });

    expect(wrapper.findComponent(RouterLink).exists()).toBe(true);
    expect(wrapper.findComponent(ToolTip).exists()).toBe(true);
    expect(wrapper.findComponent(ToolTip).props('title')).toBe(props.name);
    expect(wrapper.findComponent(FontAwesomeIcon).props('icon')).toEqual(props.icon);
    expect(wrapper.findComponent(RouterLink.props('to'))).toBe(`/main/${props.id}`);
    expect(wrapper.classes()).not.toContain('selected');
  });

  it('renders with selected class when route matches', () => {
    const props = {
      name: 'Messages privés',
      icon: ['fab', 'discord'],
      id: 'personal',
    };

    const wrapper = shallowMount(SideBarItem, {
      props,
      global: {
        components: {
          'router-link': RouterLink,
        },
        mocks: {
          $route: {
            path: '/main/personal',
          },
        },
      },
    });

    expect(wrapper.classes()).toContain('selected');
  });
});