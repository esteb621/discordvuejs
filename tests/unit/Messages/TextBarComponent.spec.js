import { mount } from '@vue/test-utils';
import TextBarComponent from '../../../src/components/main/Messages/TextBarComponent.vue';

describe('TextBarComponent', () => {
  it('emits a "send-message" event when the form is submitted', async () => {
    const wrapper = mount(TextBarComponent);

    // Remplir le champ de message
    const input = wrapper.find('input');
    await input.setValue('Hello, world!');

    // Soumettre le formulaire
    const form = wrapper.find('form');
    await form.trigger('submit.prevent');

    // Vérifier si l'événement "send-message" a été émis
    expect(wrapper.emitted('send-message')).toBeTruthy();
    // Vérifier les arguments de l'événement
    expect(wrapper.emitted('send-message')[0]).toEqual([1, 1, 'Hello, world!']); // Remplacez les valeurs des arguments en fonction de vos attentes
  });

  it('emits a "send-message" event when the send button is clicked', async () => {
    const wrapper = mount(TextBarComponent);

    // Remplir le champ de message
    const input = wrapper.find('input');
    await input.setValue('Hello, world!');

    // Cliquer sur le bouton d'envoi
    const button = wrapper.find('button');
    await button.trigger('click');

    // Vérifier si l'événement "send-message" a été émis
    expect(wrapper.emitted('send-message')).toBeTruthy();
    // Vérifier les arguments de l'événement
    expect(wrapper.emitted('send-message')[0]).toEqual([1, 1, 'Hello, world!']); // Remplacez les valeurs des arguments en fonction de vos attentes
  });

  // Ajoutez d'autres tests selon vos besoins

});