<template>
  <div class="fixed z-10 inset-0 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <div
        class="inline-block align-bottom bg-gray-700 text-gray-200 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div class="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h2 class="text-xl text-center leading-6 font-medium text-gray-200">
              Modifier votre profil
            </h2>
            <Form class="space-y-6 flex flex-row" @submit="handleUpdate" :validation-schema="schema">
              <div class=" hover:opacity-50 w-fit h-fit self-center mr-10">
                <img v-if="picture" :src="picture" alt=""
                    class="w-24 h-24 rounded-full fixed self-center">
                <input type="file" ref="fileInput" class="opacity-0 w-24 h-24 cursor-pointer"
                      @change="handleFileInputChange">
              </div>
              <div class="flex flex-col justify-end w-64 space-y-4">
                <div>
                  <label for="username"
                    class="block mb-2 text-sm font-medium text-gray-200 dark:text-white">Pseudo</label>
                  <Field v-model="username" type="text" name="username"
                    class="bg-colors-gray-form text-white w-full px-4 py-2 rounded-md border-none  focus:border-blue-500 focus:outline-none"
                    required />
                  <ErrorMessage name="username" class="text-red-700 font-bold " />
                </div>
                <div>
                  <label for="email" class="block mb-2 text-sm font-medium text-gray-200 dark:text-white">Ton
                    email</label>
                  <Field v-model="email" type="email" name="email"
                    class="bg-colors-gray-form text-white w-full px-4 py-2 rounded-md border-none  focus:border-blue-500 focus:outline-none"
                    required />
                  <ErrorMessage name="email" class="text-red-700 font-bold " />
                </div>
                <div>
                  <label for="password" class="block mb-2 text-sm font-medium text-gray-200 dark:text-white">Ton mot de
                    passe</label>
                  <Field v-model="password" type="password" name="password" id="password" placeholder="••••••••"
                    class="bg-colors-gray-form text-white w-full px-4 py-2 rounded-md border-none  focus:border-blue-500 focus:outline-none"
                    required />
                  <ErrorMessage name="password" class="text-red-700 font-bold " />
                </div>
                <!-- <div>
                        <label for="confirmPassword" class="block mb-2 text-sm font-medium text-gray-200 dark:text-white">Confirmer le mot de passe</label>
                        <Field type="password" name="confirmPassword" id="confirmPassword" placeholder="••••••••" class="bg-colors-gray-form text-white w-full px-4 py-2 rounded-md border-none  focus:border-blue-500 focus:outline-none" required/>
                    </div> -->
                <div class="sm:px-6 flex flex-row justify-end">
                  <button type="button" @click="closeModal()"
                    class="mt-3 w-full inline-flex justify-center rounded-md shadow-sm px-4 py-2 bg-gray-500 text-base font-medium text-gray-300 hover:bg-gray-600 duration-200  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                    Annuler

                  </button>
                  <button type="submit"
                    class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-500 text-base font-medium text-white hover:bg-purple-600 duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                    <span v-if="!isloading">Appliquer</span>
                    <span v-if="isloading">
                      <font-awesome-icon :icon="['fas', 'spinner']" spin />
                    </span>
                  </button>
                </div>
              </div>
            </Form>
              <p v-if="message" class="text-red-700 font-bold text-bold col-span-12 text-center mt-3">{{ message }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import pictureService from '@/services/picture.service';
  import {
    defineEmits,
    onMounted,
    ref
  } from 'vue';
  import userService from '@/services/user.service';
  import {
    useStore
  } from 'vuex';
  import {
    Form,
    Field,
    ErrorMessage
  } from "vee-validate";
  import * as yup from "yup";

  const store = useStore()
  const emit = defineEmits(['close','info-message']);

  function closeModal() {
    emit('close');
  }



  const idUser = ref(store.getters['auth/getUser'].id).value;
  const message = ref('');
  const isloading = ref(false);
  const picture = ref('');
  const email = ref('');
  const username = ref('');
  const password = ref('');


  const schema = yup.object().shape({
    username: yup
      .string()
      .required("Un nom d'utilisateur est requis!")
      .min(3, "Le pseudo doit faire 3 caractères minimum!")
      .max(20, "Le pseudo doit faire 20 characteres maximum!"),
    email: yup
      .string()
      .required("Un email est requis!")
      .email("Cet email n'est pas valide!")
      .max(50, "Cet email est trop long!"),
    password: yup
      .string()
      .required("Votre mot de passe est requis pour confirmer les changements!")
  });


  async function handleUpdate(user) {
  isloading.value = true;
  try {
    const response = await userService.updateProfile(idUser, user);
    console.log(response);
    emit('info-message', response);
    closeModal();
  } catch (e) {
    message.value = e;
  }
  isloading.value = false;
}

  async function handleFileInputChange(){
    const file = event.target.files[0];
      if (file) {
        this.uploadPicture(file);
      }
  }

  onMounted(async () => {
    picture.value = await pictureService.getProfilePicture(idUser);
    await userService.getUserById(idUser)
      .then(response => {
        username.value = response.username;
        email.value = response.email;
      })
      .catch(e => {
        console.warn(e);
      })
  })
</script>
