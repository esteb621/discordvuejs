import { mount } from '@vue/test-utils';
import UserSkeleton from '@/components/main/UserComponents/UserSkeleton.vue';

describe('YourComponent', () => {
  it('renders correctly', () => {
    const wrapper = mount(UserSkeleton);

    expect(wrapper.findAll('.flex-row')).toHaveLength(3);
    expect(wrapper.findAll('.rounded-full')).toHaveLength(3);
    expect(wrapper.findAll('.animate-pulse')).toHaveLength(3);
    expect(wrapper.findAll('.bg-gray-600')).toHaveLength(6);
  });
});