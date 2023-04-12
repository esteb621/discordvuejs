<template>
  <div class="fixed z-10 inset-0 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
              <!-- Ajouter une icône ou une image ici -->
            </div>
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                Modifier votre profil
              </h3>
              <!-- Ajouter un formulaire ici -->
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button type="button" @click="closeModal()" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
            Enregistrer
          </button>
          <button type="button" @click="closeModal()" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
            Annuler
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    closeModal() {
      this.$emit('close');
    },
  },
};
</script>



  
<!-- <b-modal id="settings" title="Paramètres du profil">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header border-0">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Mon profil</h1>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <form action="">
                        <div class="align-self-center modal-body d-flex flex-row br-2 m-3 rounded">
                            <label id="file-label" class="rounded-circle align-self-center">
                                <input type="file" id="file-input" accept=".jpg,.jpeg,.gif,.png">
                            </label>

                            <div class="d-flex flex-column m-3 w-75">
                                <div class="d-flex flex-column mb-3">
                                    <label class="pb-2">Nom d'utilisateur</label>
                                    <input type="text" name="username" class="pb-2" value="Esteban">
                                </div>

                                <div class="d-flex flex-column mb-3">
                                    <label class="pb-2">E-mail</label>
                                    <input type="email" name="email" required="true" class="pb-2"
                                        value="loremipsum@dolor.com">
                                </div>
                                <div class="d-flex flex-column mb-3">
                                    <label class="pb-2">Mot de passe</label>
                                    <input type="password" required="true" class="pb-2" value="loremipsum">
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer border-0">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                            <input type="submit" class="btn btn-primary" value="Appliquer les changements">
                        </div>
                    </form>
                </div>
            </div>
        </b-modal> -->



