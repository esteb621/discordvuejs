import { mount } from '@vue/test-utils';
import ProfileSettings from '../../../src/components/main/Profile/ProfileSettings.vue';

describe('ProfileSettings', () => {
  it('emits a "close" event when the cancel button is clicked', async () => {
    const wrapper = mount(ProfileSettings);

    // Cliquer sur le bouton Annuler
    const cancelButton = wrapper.find(".mt-3.w-full.inline-flex.justify-center.rounded-md.shadow-sm.px-4.py-2.bg-gray-500.text-base.font-medium.text-gray-300.hover:bg-gray-600.duration-200.focus:outline-none.focus:ring-2.focus:ring-offset-2.focus:ring-blue-500.sm:mt-0.sm:ml-3.sm:w-auto.sm:text-sm");
    await cancelButton.trigger('click');

    // Vérifier si l'événement "close" a été émis
    expect(wrapper.emitted('close')).toBeTruthy();
  });

  it('calls handleUpdate method when the form is submitted', async () => {
    const wrapper = mount(ProfileSettings);
    const handleUpdate = jest.spyOn(wrapper.vm, 'handleUpdate');

    // Soumettre le formulaire
    await wrapper.find('form').trigger('submit');

    // Vérifier si la méthode handleUpdate a été appelée
    expect(handleUpdate).toHaveBeenCalled();
  });

  // Ajoutez d'autres tests selon vos besoins

});