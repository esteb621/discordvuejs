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
              {{ title }}
            </h2>
            <div v-if="!deleteAccount">
              <Form v-if="!editPassword" @submit="handleUpdate" :validation-schema="schema">
                <div class="space-y-6 flex flex-row">
                  <div class=" hover:opacity-50 w-fit h-fit self-center mr-10">
                    <img v-if="url" :src="url" alt="" id="picture" class="w-24 h-24 rounded-full fixed self-center">
                    <Field v-model="inputPicture" name="picture" @change="loadFile" type="file"
                      accept=".jpg,.jpeg,.gif,.png,.heic" id="profile_picture"
                      class="opacity-0 w-24 h-24 cursor-pointer" />
                  </div>
                  <div class="flex flex-col justify-end w-full space-y-4">
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
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-200 dark:text-white">Ton mot
                        de
                        passe</label>
                      <div class="flex flex-row">
                        <Field v-model="password" type="password" name="password" placeholder="••••••••"
                          class="bg-colors-gray-form text-white w-full px-4 py-2 rounded-md border-none  focus:border-blue-500 focus:outline-none"
                          required />
                        <button type="button" @click="editPassword=true"
                          class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-500 text-base font-medium text-white hover:bg-purple-600 duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                          Modifier</button>
                      </div>
                      <ErrorMessage name="password" class="text-red-700 font-bold " />
                    </div>
                  </div>
                </div>
                <div class="flex flex-row justify-end mt-5">
                  <button type="button" @click="deleteAccount=true"
                    class="mx-auto mt-3 w-full inline-flex justify-center rounded-md shadow-sm px-4 py-2 border-red-600 border-2 text-base font-medium text-red-600 hover:bg-red-600 hover:text-gray-200 duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 ml-0 sm:w-auto sm:text-sm">
                    Supprimer le compte
                  </button>
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
              </Form>
              <Form v-if="editPassword" @submit="handleUpdatePassword" :validation-schema="schemaPassword">
                <div class="flex flex-col justify-end w-full space-y-4">
                  <div>
                    <label for="currentPassword" class="block mb-2 text-sm font-medium text-gray-200 dark:text-white">
                      Mot de passe actuel
                    </label>
                    <div class="flex flex-row">
                      <Field v-model="currentPassword" type="password" name="currentPassword" placeholder="••••••••"
                        class="bg-colors-gray-form text-white w-full px-4 py-2 rounded-md border-none  focus:border-blue-500 focus:outline-none"
                        required />
                    </div>
                    <ErrorMessage name="currentPassword" class="text-red-700 font-bold " />
                  </div>
                  <div>
                    <label for="newPassword" class="block mb-2 text-sm font-medium text-gray-200 dark:text-white">
                      Nouveau mot de passe</label>
                    <div class="flex flex-row">
                      <Field v-model="newPassword" type="password" name="newPassword" placeholder="••••••••"
                        class="bg-colors-gray-form text-white w-full px-4 py-2 rounded-md border-none  focus:border-blue-500 focus:outline-none"
                        required />
                    </div>
                    <ErrorMessage name="newPassword" class="text-red-700 font-bold " />
                  </div>
                  <!-- Conditions du mot de passe -->
                  <div class="mb-3">
                    <span class="mb-2 text-white font-semibold">Votre mot de passe doit contenir au moins:</span>
                    <ul class="list-none text-white">
                      <li :class="{ 'text-green-600': newPassword.length > 7 }">
                        <font-awesome-icon v-if="newPassword.length > 7" :icon="['fa', 'check']" class="text-green-600" />
                        8 caractères
                      </li>
                      <li :class="{ 'text-green-600': isPasswordContainDigit() }">
                        <font-awesome-icon v-if="isPasswordContainDigit()" :icon="['fa', 'check']"
                          class="text-green-600" />
                        Un chiffre
                      </li>
                      <li :class="{ 'text-green-600': isPasswordContainSpecialChars() }">
                        <font-awesome-icon v-if="isPasswordContainSpecialChars()" :icon="['fa', 'check']"
                          class="text-green-600" />
                        Un caractère spécial
                      </li>
                    </ul>
                  </div>
                  <div>
                    <label for="confirmPassword"
                      class="block mb-2 text-sm font-medium text-gray-200 dark:text-white">Confirmer le nouveau mot de
                      passe</label>
                    <div class="flex flex-row">
                      <Field type="password" name="confirmPassword" placeholder="••••••••"
                        class="bg-colors-gray-form text-white w-full px-4 py-2 rounded-md border-none  focus:border-blue-500 focus:outline-none"
                        required />
                    </div>
                    <ErrorMessage name="confirmPassword" class="text-red-700 font-bold " />
                  </div>
                  <div class="flex flex-row justify-end mt-5">
                    <button type="button" @click="editPassword=false"
                      class="mt-3 w-full inline-flex justify-center rounded-md shadow-sm px-4 py-2 bg-gray-500 text-base font-medium text-gray-300 hover:bg-gray-600 duration-200  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                      Retour
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
            </div>

            <div v-if="deleteAccount" class="p-3 text-red-700 text-center">
              <h1 v-if="!isDeleted" class="font-bold text-3xl">ATTENTION: ÊTES-VOUS SÛR DE VOULOIR SUPPRIMER VOTRE COMPTE.</h1>
              <h2 v-if="!isDeleted" class="text-2xl">Cette action est <span class='font-bold'>IRRÉVERSIBLE</span></h2>
              <h1 v-if="message" class="text-xl text-gray-200"> {{ message }} <br> 
                <span v-if="isDeleted"> Redirection dans {{ counter }}... </span></h1>
              <div v-if="!isDeleted" class="flex flex-row px-3 mt-5 text-gray-200">
                <button @click="deleteAccount = false"
                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-500 text-xl font-medium text-white hover:bg-purple-600 duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto">
                  Annuler
                </button>
                <button
                :disabled="isButtonDisabled" @click="handleDelete()"
                class="w-full inline-flex justify-center disabled:opacity-50 rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-lg font-medium text-white hover:bg-red-700 duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto">
                <span v-if="!isloading">
                  Supprimer mon compte 😢
                </span>
                <span v-if="isloading">
                  <font-awesome-icon :icon="['fas', 'spinner']" spin />
                </span>
                </button>
              </div>
            </div>
            <p v-if="message && !deleteAccount" class="text-red-700 font-bold text-bold col-span-12 text-center mt-3">{{ message }}</p>
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
  import EventBus from '@/common/EventBus';
import { watch } from 'vue';
import { useRouter } from 'vue-router';

  const store = useStore()
  const emit = defineEmits(['close', 'info-message']);

  function closeModal() {
    emit('close');
  }

  const idUser = ref(store.getters['auth/getUser'].id).value;
  const message = ref('');
  const isloading = ref(false);
  const inputPicture = ref(null);
  const url = ref(null);
  const email = ref('');
  const username = ref('');
  const password = ref('');
  const editPassword = ref(false);
  const deleteAccount = ref(false);
  const isButtonDisabled = ref(false);
  const isDeleted = ref(false);
  const counter = ref(3);
  const newPassword = ref('');
  const route = useRouter();
  const title = ref(editPassword.value ? 'Modifier votre mot de passe' : 'Modifier votre profil');
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
      .required("Votre mot de passe est requis pour confirmer les changements!"),
    inputPicture: yup
      .string()
      .nullable()
  });

  function loadFile(event) {
    const file = event.target.files[0];
    url.value = URL.createObjectURL(file);
  }

  async function handleUpdate(user) {
    isloading.value = true;
    try {
      await userService.updateProfile(idUser, user, url.value)
        .then(async response => {
          if (inputPicture.value) {
            await pictureService.uploadProfilePic(idUser, inputPicture.value);
          }
          emit('info-message', response);
          closeModal();
        })
        .catch(e => {
          message.value = e;
        })
    } catch (e) {
      message.value = e;
    }
    isloading.value = false;
  }


  const schemaPassword = yup.object().shape({
    currentPassword: yup
      .string()
      .required("Votre mot de passe actuel est requis"),
    newPassword: yup
      .string()
      .required("Veuillez taper votre nouveau mot de passe")
      .min(8, "Le mot de passe doit contenir au moins 8 caractères!")
      .matches(
        /\d/,
        'Le mot de passe doit contenir au moins un chiffre')
      .matches(
        /[$&+.,:;=?@#|'"<>^*ඞ()%!-]/,
        'Le mot de passe doit contenir au moins un caractère spécial'),
    confirmPassword: yup
      .string()
      .required("Veuillez confirmer votre nouveau mot de passe"),
  });

  function isPasswordContainDigit() {
    const digit = /\d/;
    return digit.test(newPassword.value);
  }

  function isPasswordContainSpecialChars() {
    const specialChars = /[$&+.,:;=?@#|'"<>^*ඞ()%!-]/;
    return specialChars.test(newPassword.value);
  }

  async function handleUpdatePassword(user) {
    isloading.value = true;
    try {
      await userService.updatePassword(idUser, user)
        .then(async response => {
          emit('info-message', response);
          closeModal();
        })
        .catch(e => {
          message.value = e;
        })
    } catch (e) {
      message.value = e;
    }
    isloading.value = false;
  }

  async function handleDelete(){
    isloading.value = true
    try {
      await userService.deleteAccount(idUser)
        .then(response => {
          isloading.value = false;
          isDeleted.value=true;
          message.value=response.data.message;
          counter.value = 3;
          const countdown = setInterval(() => {
            counter.value--;
            if (counter.value === 0) {
              clearInterval(countdown);
              store.dispatch('auth/logout');
              route.push('/');
            }
          }, 1000);
        })
        .catch(e => {
          message.value = e;
        })
    } catch (e) {
      message.value = e;
    }
    isloading.value = false;
  }

  onMounted(async () => {
    url.value = await pictureService.getProfilePicture(idUser);
    await userService.getUserById(idUser)
      .then(response => {
        username.value = response.username;
        email.value = response.email;
      })
      .catch(e => {
        if (e.response && e.response.status === 403) {
          EventBus.dispatch("logout");
        }
      })
  })

  watch(isButtonDisabled, (newValue) => {
  if (newValue) {
    setTimeout(() => {
      isButtonDisabled.value = true;
    }, 3000);
  }
});
</script>