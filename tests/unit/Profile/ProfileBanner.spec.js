import { mount } from '@vue/test-utils';
import ProfileComponent from '../../../src/components/main/Profile/ProfileBanner.vue';
import moxios from 'moxios';
import axios from 'axios';

describe('ProfileComponent', () => {
  beforeEach(()=>{
    const wrapper = mount(ProfileComponent);
    moxios.install(axios);
  });

  afterEach(()=>{
    wrapper.unmount();
    moxios.uninstall();
  })
  
  it('emits a "show-modal" event when the profile link is clicked', async () => {

    // Cliquer sur le lien du profil
    const link = wrapper.find('.group.cursor-pointer');
    await link.trigger('click');

    // Vérifier si l'événement "show-modal" a été émis
    expect(wrapper.emitted('show-modal')).toBeTruthy();
  });

  it('calls handleLogout method when the logout link is clicked', async () => {
    const wrapper = mount(ProfileComponent);
    const handleLogout = jest.spyOn(wrapper.vm, 'handleLogout');

    // Cliquer sur le lien de déconnexion
    const logoutLink = wrapper.find('.group.cursor-pointer');
    await logoutLink.trigger('click');

    // Vérifier si la méthode handleLogout a été appelée
    expect(handleLogout).toHaveBeenCalled();
  });
});