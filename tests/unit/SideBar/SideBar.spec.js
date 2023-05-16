import { shallowMount } from '@vue/test-utils';
import SideBar from '../../../src/components/main/SideBar/SideBar.vue';
import SideBarIcon from '../../../src/components/main/SideBar/SideBarIcon.vue';

describe('SideBar', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(SideBar);

    expect(wrapper.find('.top-0').exists()).toBe(true);
    expect(wrapper.find('.left-0').exists()).toBe(true);
    expect(wrapper.find('.h-screen').exists()).toBe(true);
    expect(wrapper.find('.w-16').exists()).toBe(true);
    expect(wrapper.find('.flex').exists()).toBe(true);
    expect(wrapper.find('.flex-col').exists()).toBe(true);
    expect(wrapper.find('.bg-primary').exists()).toBe(true);
    expect(wrapper.find('.text-secondary').exists()).toBe(true);
    expect(wrapper.find('.shadow-lg').exists()).toBe(true);
  });

  it('renders SideBarIcon components', () => {
    const wrapper = shallowMount(SideBar);

    expect(wrapper.findAllComponents(SideBarIcon)).toHaveLength(2);
  });
});