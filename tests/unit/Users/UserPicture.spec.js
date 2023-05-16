import { mount } from '@vue/test-utils';
import UserPicture from '@/components/main/UserComponents/UserPicture.vue';

describe('YourComponent', () => {
  it('renders correctly when loading', () => {
    const wrapper = mount(UserPicture, {
      props: {
        id: 123,
        link: '',
      },
    });

    expect(wrapper.find('#profile-picture').exists()).toBe(true);
    expect(wrapper.find('#profile-picture').classes()).toContain('animate-pulse');
    expect(wrapper.find('img').exists()).toBe(false);
  });

  it('renders correctly when not loading', () => {
    const wrapper = mount(YourComponent, {
      props: {
        id: 123,
        link: 'https://example.com/image.jpg',
      },
    });

    expect(wrapper.find('#profile-picture').exists()).toBe(false);
    expect(wrapper.find('img').exists()).toBe(true);
    expect(wrapper.find('img').attributes('src')).toBe('https://example.com/image.jpg');
  });
});
