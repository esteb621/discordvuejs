import { shallowMount } from '@vue/test-utils';
import ChannelSkeleton from '@/components/main/ChannelComponents/ChannelSkeleton.vue';

describe('SkeletonComponent', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(ChannelSkeleton);

    expect(wrapper.findAll('a')).toHaveLength(3);
    expect(wrapper.findAll('.animate-pulse')).toHaveLength(3);
    expect(wrapper.findAll('.rounded-md')).toHaveLength(3);
    expect(wrapper.find('.w-58').exists()).toBe(true);
    expect(wrapper.find('.w-24').exists()).toBe(true);
    expect(wrapper.find('.w-40').exists()).toBe(true);
    expect(wrapper.find('.h-10').exists()).toBe(true);
    expect(wrapper.find('.py-2').exists()).toBe(true);
    expect(wrapper.find('.px-3').exists()).toBe(true);
    expect(wrapper.find('.mb-3').exists()).toBe(true);
    expect(wrapper.find('.mx-2').exists()).toBe(true);
    expect(wrapper.find('.bg-gray-600').exists()).toBe(true);
  });
});