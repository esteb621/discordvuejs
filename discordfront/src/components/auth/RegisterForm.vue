<template>
  <main class="flex justify-center items-center text-left bg-cover bg-center">
    <div id="login" class=" max-w-xl shadow-lg shadow-gray-600 p-6 rounded-lg  bg-gray-700 max-h-fit overflow-y-auto">
      <h1 class="mb-2 text-white text-center text-3xl font-semibold">Ravi de faire ta connaissance!</h1>
      <h2 class="text-center text-xl font-semibold">Merci de renseigner les informations suivantes pour mieux te
        connaitre</h2>
      <div class="mt-4 text-start">
        <Form class="form-group" @submit="handleRegister" :validation-schema="schema">
          <!-- Champ pseudo -->
          <div class="grid grid-cols-12 mb-3">
            <div class="col-span-12">
              <label for="username" class="mb-2 text-white font-semibold text-base">Nom d'utilisateur *</label>
              <Field v-model="username" ref="usernameInput" type="username" id="username" name="username" required
                class=" text-white bg-colors-gray-form border-none w-full px-4 py-2 rounded-md border  focus:outline-none" />
              <ErrorMessage name="username" class="text-red-700 font-bold" />
            </div>
          </div>
          <!-- Champ email -->
          <div class="grid grid-cols-12 mb-3">
            <div class="col-span-12">
              <label for="email" class="text-white font-semibold text-base">Adresse mail *</label>
              <Field ref="emailInput" v-model="email" type="email" id="email" name="email" required
                class="text-white bg-colors-gray-form w-full px-4 py-2 rounded-md border-none   focus:outline-none" />
              <ErrorMessage name="email" class="text-red-700 font-bold" />
            </div>
          </div>

          <!-- Champ mot de passe -->
          <div class="grid grid-cols-12 mb-3">
            <div class="col-span-12">
              <label for="password" class="text-white font-semibold text-base">Mot de passe *</label>
              <Field v-model="password" ref="passwordInput" type="password" id="password" name="password" required
                class="text-white bg-colors-gray-form w-full px-4 py-2 rounded-md border-none focus:outline-none" />
              <ErrorMessage name="password" class="text-red-700 font-bold" />
            </div>
          </div>

          <!-- Conditions du mot de passe -->
          <div class="mb-3">
            <span class="mb-2 text-white font-semibold">Votre mot de passe doit contenir au moins:</span>
            <ul class="list-none text-white">
              <li :class="{ 'text-green-600': isPasswordLongEnough() }">
                <font-awesome-icon v-if="isPasswordLongEnough()" :icon="['fa', 'check']" class="text-green-600" />
                8 caractères
              </li>
              <li :class="{ 'text-green-600': isPasswordContainDigit() }">
                <font-awesome-icon v-if="isPasswordContainDigit()" :icon="['fa', 'check']" class="text-green-600" />
                Un chiffre
              </li>
              <li :class="{ 'text-green-600': isPasswordContainSpecialChars() }">
                <font-awesome-icon v-if="isPasswordContainSpecialChars()" :icon="['fa', 'check']"
                  class="text-green-600" />
                Un caractère spécial
              </li>
            </ul>
          </div>

          <!-- Champ confirmer mot de passe -->
          <div class="grid grid-cols-12 mb-3">
            <div class="col-span-12">
              <label for="retypePassword" class=" text-white font-semibold text-base">
                Confirmer le mot de passe *
              </label>
              <Field v-model="retypePassword" type="password" id="retypePassword" name="confirmPassword" required="true"
                class="bg-colors-gray-form text-white w-full px-4 py-2 rounded-md border-none  focus:border-blue-500 focus:outline-none " />
              <ErrorMessage name="confirmPassword" class="text-red-700 font-bold" />
            </div>
          </div>
          <!-- Photo de profil -->
          <div class="mt-4 w-full">
            <div class="col-span-12">
              <label for="profile_picture" class="text-white font-semibold text-base">Photo de profil
                (optionnel)</label>
              <Field v-model="profilePicture" name="profilePicture" type="file" accept=".jpg,.jpeg,.gif,.png,.heic"
                id="profile_picture" class="w-full" />
            </div>
          </div>
          <button :class="{
          'bg-green-500 cursor-wait': loading
        }" :disabled="isFormEmpty()"
            :style="{ backgroundColor: loading ? clickedButton : backgroundColor }" type="submit"
            class="mt-5 block w-full px-4 py-2 rounded-md font-bold text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed bg-blue-500 hover:bg-blue-600 duration-200">
            <span v-if="!loading">Inscription</span>
            <span v-if="loading">
              <font-awesome-icon :icon="['fas', 'spinner']" spin />
            </span>
          </button>
        </Form>
        <p v-if="message" class="text-red-700 font-bold col-span-12 text-center mt-3">{{ message }}</p>
      </div>
      <div class="text-capitalize mt-3">
        <p class="pl-2 text-center">
          Déjà inscrit ? <RouterLink class='text-blue-500' to='/login'>Connexion</RouterLink>
        </p>
      </div>
    </div>
  </main>
</template>


<script setup>
  import {
    ref, onMounted
  } from 'vue';
  import {
    useStore
  } from 'vuex'
  import {
    useRouter
  } from 'vue-router';
  import {
    Form,
    Field,
    ErrorMessage
  } from "vee-validate";
  import * as yup from "yup";
  import authHeader from '@/services/auth-header';
  import pictureService from '@/services/picture.service';

  const store = useStore();
  const router = useRouter();
  onMounted(() => {
    const headers = authHeader();
    if (headers['x-access-token']) {
      router.push('/main');
  }});

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
      .required("Un mot de passe est requis!")
      .min(8, "Le mot de passe doit contenir au moins 8 caractères!")
      .matches(
      /[$&+.,:;=?@#|'"<>^*ඞ()%!-]/,
      'Le mot de passe doit contenir au moins un chiffre et un caractère spécial'),
    confirmPassword: yup.string()
    .required('Ce champ est obligatoire!')
    .oneOf([yup.ref('password'), null], 'Les mots de passe doivent être identiques'),

    profilePicture: yup.mixed()
    .test('fileSize', "Le fichier est trop volumineux", (value) => {
      return !value || (value && value.size <= 5 * 1024 * 1024)}),
  });

  const username = ref('');
  const password = ref('');
  const retypePassword = ref('');
  const email = ref('')
  const profilePicture = ref(null);
  let message = ref('');
  const loading = ref(false);
  const backgroundColor = ref('#5c6aff');
  const clickedButton = ref('#3aa55c');
  const specialChars = ref(/[$&+.,:;=?@#|'"<>^*ඞ()%!-]/).value;
  const isFormEmpty = () => {
    return !(username.value && password.value && retypePassword.value && email.value);
  };


  function isPasswordLongEnough() {
    return password.value.length >= 8;
  }

  function isPasswordContainDigit() {
    const digit = /\d/;
    return digit.test(password.value);
  }

  function isPasswordContainSpecialChars(){
    return specialChars.test(password.value);
  }

function handleRegister(user) {
      message.value = "";
      console.log(user)
      loading.value = true;
      store.dispatch("auth/register", user)
      .then(async () => {
          if(profilePicture.value){
            const idUser = store.getters['auth/getUser'].id;
            console.log(idUser)
            await pictureService.uploadProfilePic(idUser,profilePicture.value)
            .then(response => {
              loading.value = false
              message.value = response;
            })
            .catch(error => {
              loading.value = false;
              message.value = error;
            })
          }
          router.push("/main");
        })
      .catch(error => {
          loading.value = false;
          message.value = error;
      });
      
  }


</script>

<style scoped>
  main {
    background-image: url("@/assets/img/login.jpg");
  }

  input[type="file"],
  input:hover,
  input:focus {
    background-color: #40444b;
  }
</style>