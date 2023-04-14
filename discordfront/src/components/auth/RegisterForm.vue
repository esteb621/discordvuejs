<template>
  <main class="flex justify-center items-center text-left bg-cover bg-center">
    <div id="login" class="shadow-lg shadow-gray-600 p-6 rounded-lg  bg-gray-700 max-h-75 overflow-y-auto">
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
              <ErrorMessage name="username" class="error-feedback" />
            </div>
          </div>
          <!-- Champ email -->
          <div class="grid grid-cols-12 mb-3">
            <div class="col-span-12">
              <label for="email" class="text-white font-semibold text-base">Adresse mail *</label>
              <Field ref="emailInput" v-model="email" type="email" id="email" name="email" required
                class="text-white bg-colors-gray-form w-full px-4 py-2 rounded-md border-none   focus:outline-none" />
              <ErrorMessage name="email" class="error-feedback" />
            </div>
          </div>

          <!-- Champ mot de passe -->
          <div class="grid grid-cols-12 mb-3">
            <div class="col-span-12">
              <label for="password" class="text-white font-semibold text-base">Mot de passe *</label>
              <Field v-model="password" ref="passwordInput" type="password" id="password" name="password" required
                class="text-white bg-colors-gray-form w-full px-4 py-2 rounded-md border-none focus:outline-none" />
              <ErrorMessage name="password" class="error-feedback text-red-500" />
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
              <ErrorMessage name="confirmPassword" class="error-feedback" />
            </div>
          </div>
          <!-- Photo de profil -->
          <div class="flex flex-row-reverse mt-4">
            <div class="col-span-12">
              <label for="profile_picture" class="text-white font-semibold text-base">Photo de profil
                (optionnel)</label>
              <Field name="profilePicture" type="file" accept=".jpg,.jpeg,.gif,.png"
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
        <p v-if="message" class="text-red-500 col-span-12 text-center mt-3">{{ message }}</p>
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
    ref,computed
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
  const store = useStore();
  const router = useRouter();
  
  const loggedIn = computed(() => {
    return store.state.auth.status.loggedIn;
  });

  if (loggedIn.value) {
    router.push('/main');
  }

  const schema = yup.object().shape({
    username: yup
      .string()
      .required("Username is required!")
      .min(3, "Le pseudo doit faire 3 caractères minimum!")
      .max(20, "Le pseudo doit faire 20 characteres maximum!"),
    email: yup
      .string()
      .required("Email is required!")
      .email("Email is invalid!")
      .max(50, "Must be maximum 50 characters!"),

    password: yup
      .string()
      .required("Un mot de passe est requis!")
      .min(8, "Le mot de passe doit contenir au moins 8 caractères!")
      .matches(
      /[$&+.,:;=?@#|'"<>^*ඞ()%!-]/,
      'Le mot de passe doit contenir au moins un chiffre et un caractère spécial'
    ),
    confirmPassword: yup.string()
    .required('Ce champ est obligatoire!')
    .oneOf([yup.ref('password'), null], 'Les mots de passe doivent être identiques')

    // confirmPassword: yup
    //   .string()
    //   .required("Password is required!")
    //   .equals(password, "Votre mot de passe ne correspond pas avec celui retapé")
    //   .min(6, "Must be at least 6 characters!")
    //   .max(40, "Must be maximum 40 characters!"),
  });

  const username = ref('');
  const password = ref('');
  const retypePassword = ref('');
  const email = ref('')
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
      loading.value = true;

      store.dispatch("auth/register", user).then(
        (data) => {
          message.value = data.message;
          loading.value = false;
        },
        (error) => {
          message.value =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          loading.value = false;
        }
      );
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
    border: 0;
  }
</style>