<template>
  <div class="fixed z-10 inset-0 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <div class="inline-block align-bottom bg-gray-700 text-gray-200 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div class="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h2 class="text-xl leading-6 font-medium text-gray-200">
                Modifier votre profil
              </h2>
              <form class="space-y-6 flex flex-row" action="#">
                  <div class="flex flex-col justify-end">
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-200 dark:text-white">Pseudo</label>
                        <input type="email" name="text" class="bg-colors-gray-form text-white w-full px-4 py-2 rounded-md border-none  focus:border-blue-500 focus:outline-none" placeholder="Magnifique pseudo" required>
                    </div>
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-200 dark:text-white">Ton email</label>
                        <input type="email" name="email" class="bg-colors-gray-form text-white w-full px-4 py-2 rounded-md border-none  focus:border-blue-500 focus:outline-none" placeholder="loremipsum@dorem.com" required>
                    </div>
                    <div>
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-200 dark:text-white">Ton mot de passe</label>
                        <input type="password" name="password" id="password" placeholder="••••••••" class="bg-colors-gray-form text-white w-full px-4 py-2 rounded-md border-none  focus:border-blue-500 focus:outline-none" required>
                    </div>
                  </div>
              </form>  
            </div>
          </div>
        </div>
        <div class="px-4 py-3 sm:px-6 flex flex-row justify-end">
          <button type="button" @click="closeModal()" class="mt-3 w-full inline-flex justify-center rounded-md shadow-sm px-4 py-2 bg-gray-500 text-base font-medium text-gray-300 hover:bg-gray-600 duration-200  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
            Annuler
          </button>
          <button type="button" @click="closeModal()" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-500 text-base font-medium text-white hover:bg-purple-600 duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
            Appliquer
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