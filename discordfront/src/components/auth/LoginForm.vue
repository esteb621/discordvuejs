<template>
  <main class="flex justify-center items-center text-left bg-cover bg-center">
    <div id="login" class="shadow-lg shadow-gray-600 p-6 rounded-lg  bg-gray-700 max-h-75 overflow-y-auto">
      <h1 class="mb-2 text-white text-center text-3xl font-semibold">Content de te revoir!</h1>
      <h2 class="text-center text-xl font-semibold">Renseigne tes identifiants pour te connecter</h2>
      <div class="mt-4 text-start">
        <Form class="form-group" @submit="handleLogin" :validation-schema="schema">
          <!-- Champ pseudo -->
          <div class="grid grid-cols-12 mb-3">
            <div class="col-span-12">
              <label for="username" class="mb-2 text-white font-semibold text-base">Nom d'utilisateur *</label>
              <Field v-model="username" ref="usernameInput" type="username" id="username" name="username" required
                class=" text-white bg-colors-gray-form border-none w-full px-4 py-2 rounded-md border  focus:outline-none"/>
              <ErrorMessage name="username" class="error-feedback" />
            </div>
          </div>

          <!-- Champ mot de passe -->
          <div class="grid grid-cols-12 mb-3">
            <div class="col-span-12">
              <label for="password" class="text-white font-semibold text-base">Mot de passe *</label>
              <Field v-model="password" ref="passwordInput" type="password" id="password" name="password" required
                class="text-white bg-colors-gray-form w-full px-4 py-2 rounded-md border-none focus:outline-none"/>
              <ErrorMessage name="password" class="error-feedback" />
            </div>
          </div>
          <button :class="{
            'bg-green-500 cursor-wait': loading
          }" :disabled="isFormEmpty()"
            :style="{ backgroundColor: loading ? clickedButton : backgroundColor }" type="submit"
            class="mt-5 block w-full px-4 py-2 rounded-md font-bold text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed bg-blue-500 hover:bg-blue-600 duration-200">
            <span v-if="!loading">Connexion</span>
            <span v-if="loading">
              <font-awesome-icon :icon="['fas', 'spinner']" spin />
            </span>
          </button>
          <p v-if="message" class="text-red-500 text-bold col-span-12 text-center mt-3">{{ message }}</p>
        </Form>
      </div>
      <div class="text-capitalize mt-3">
        <p class="pl-2 text-center ">
          Besoin d'un compte ? <RouterLink to="/register" class='text-blue-500' >S'inscrire</RouterLink>
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
    username: yup.string().required("Un nom d'utilisateur est requis!"),
    password: yup.string().required("Un mot de passe est requis!"),
  });

  const username = ref('');
  const password = ref('');
  const message = ref('');
  const loading = ref(false);
  const backgroundColor = ref('#5c6aff');
  const clickedButton = ref('#3aa55c');

  const isFormEmpty = () => {
    return !(username.value && password.value);
  };

  function handleLogin(user) {
    loading.value = true;
    store.dispatch("auth/login", user).then(
      () => {
        router.push("/main");
      },
      (error) => {
        loading.value = false;
        message.value =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
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