import { mount } from '@vue/test-utils';
import { RouterLink } from 'vue-router';
import UserComponent from '@/components/main/UserComponents/UserComponent.vue';
import UserPicture from '@/components/main/UserComponents/UserPicture.vue';

describe('YourComponent', () => {
  it('renders correctly', () => {
    const wrapper = mount(UserComponent, {
      global: {
        components:{
            'router-link': RouterLink,
            'UserPicture': UserPicture
        }
      },
      props: {
        userId: 123,
        username: 'John Doe',
        link: '/example',
      },
    });

    expect(wrapper.findComponent(RouterLink).exists()).toBe(true);
    expect(wrapper.findComponent(UserPicture).exists()).toBe(true);
    expect(wrapper.find('h4').text()).toBe('John Doe');
  });
});
