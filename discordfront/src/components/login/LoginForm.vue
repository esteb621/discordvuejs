<template>
    <main class="flex justify-center items-center text-left bg-cover bg-center">
      <div id="login" class="shadow-lg shadow-gray-600 p-6 rounded-lg  bg-gray-700 max-h-75 overflow-y-auto">
        <h1 class="mb-2 text-white text-center text-3xl font-semibold">{{ title }}</h1>
        <h2 class="text-center text-xl font-semibold">{{ secondTitle }}</h2>
        <div class="mt-4 text-start">
          <form class="form-group" @submit.prevent="submitForm">
            <!-- Champ pseudo -->
            <div class="grid grid-cols-12 mb-3">
              <div class="col-span-12">
                <label for="username" class="mb-2 text-white font-semibold text-base">Nom d'utilisateur *</label>
                <input v-model="username" ref="usernameInput" type="username" id="username" name="username" required 
                class=" text-white bg-colors-gray-form border-none w-full px-4 py-2 rounded-md border  focus:outline-none">
              </div>
            </div>
            <!-- Champ email -->
            <div class="grid grid-cols-12 mb-3" v-if="props.confirmPwd">
              <div class="col-span-12">
                <label for="email" class="text-white font-semibold text-base">Adresse mail *</label>
                <input v-model="email" ref="emailInput" type="email" id="email" name="email" required 
                class="text-white bg-colors-gray-form w-full px-4 py-2 rounded-md border-none   focus:outline-none">
              </div>
            </div>
  
            <!-- Champ mot de passe -->
            <div class="grid grid-cols-12 mb-3">
              <div class="col-span-12">
                <label for="password" class="text-white font-semibold text-base">Mot de passe *</label>
                <input v-model="password"  ref="passwordInput" type="password" id="password" name="password" required 
                class="text-white bg-colors-gray-form w-full px-4 py-2 rounded-md border-none focus:outline-none">
              </div>
            </div>
  
            <!-- Conditions du mot de passe -->
            <div class="mb-3" v-if="props.confirmPwd">
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
                <li :class="{ 'text-green-600': isPasswordContainSpecialChar() }">
                  <font-awesome-icon v-if="isPasswordContainSpecialChar()" :icon="['fa', 'check']" class="text-green-600" />
                  Un caractère spécial
                </li>
              </ul>
            </div>
  
        <!-- Champ confirmer mot de passe -->
      <div v-if="props.confirmPwd" class="grid grid-cols-12 mb-3">
        <div class="col-span-12">
          <label for="retypePassword" class=" text-white font-semibold text-base">
            Confirmer le mot de passe *
          </label>
          <input v-model="retypePassword" type="password" id="retypePassword" name="password" required="true" 
          class="bg-colors-gray-form text-white w-full px-4 py-2 rounded-md border-none  focus:border-blue-500 focus:outline-none ">
        </div>
      </div>
      <!-- Photo de profil -->
      <div class="flex flex-row-reverse mt-4">
        <div class="col-span-12">
          <label for="profile_picture" class="text-white font-semibold text-base">Photo de profil (optionnel)</label>
          <input type="file" v-on:change="photo" accept=".jpg,.jpeg,.gif,.png" id="profile_picture" class="w-full">
        </div>
    </div>
    <button
      :class="{
        'bg-green-500 cursor-wait': isLoading
      }"
      :disabled="showPasswordError || isFormEmpty()"
      :style="{ backgroundColor: isLoading ? clickedButton : backgroundColor }"
      type="submit"
      class="mt-5 block w-full px-4 py-2 rounded-md font-bold text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed bg-blue-500 hover:bg-blue-600 duration-200">
      <span v-if="!isLoading">{{ buttonTitle }}</span>
      <span v-if="isLoading"><font-awesome-icon :icon="['fas', 'spinner']" spin /></span>
    </button>
    </form>
    <p :on-change="showPasswordError=false" class="text-red-500 col-span-12 text-center mt-3">{{ passwordError }}</p>
  </div>
  <div class="text-capitalize mt-3">
    <p class="pl-2 text-center " v-html="link"></p>
  </div>
</div>
</main>
</template>  

  
<script setup>
    import router from '@/router';
    import { signup, login } from '@/services/auth.service';
    import {
        ref,
        defineProps
    } from 'vue';
    import {
        useStore
    } from 'vuex'

    const store = useStore();


    const props = defineProps({
        title: {
            type: String,
            required: true
        },
        secondTitle: {
            type: String,
            required: true
        },
        buttonTitle: {
            type: String,
            required: true
        },
        choixInscription: {
            type: Boolean
        },
        insertPhoto: {
            type: Boolean
        },
        confirmPwd: {
            type: Boolean
        },
        link: {
            type: String,
            required: true,
        }
    });
    const username = ref('');
    const password = ref('');
    const email = ref('');
    const retypePassword = ref('');
    let passwordError = ref('');
    let showPasswordError = ref(false);
    let isLoading = ref(false);
    const backgroundColor = ref('#5c6aff');
    const clickedButton = ref('#3aa55c');
    const isFormEmpty = () => {
        return !(username.value && password.value);
    };




    function isPasswordLongEnough() {
        return password.value.length >= 8;
    }

    function isPasswordContainSpecialChar() {
        const specialChars = /[$&+.,:;=?@#|'"<>^*ඞ()%!-]/;
        return specialChars.test(password.value);
    }

    function isPasswordContainDigit() {
        const digit = /\d/;
        return digit.test(password.value);
    }

    function verifyPassword() {
        if (props.confirmPwd) {
            if (retypePassword.value == "") {
                showPasswordError.value = false;
                passwordError.value = '';
                return false;
            } else if ((password.value !== retypePassword.value)) {
                showPasswordError.value = true;
                passwordError.value = 'Votre mot de passe ne correspond pas avec celui retapé';
                return false;
            } else if (password.value == retypePassword.value && !isPasswordLongEnough() || !isPasswordContainDigit() ||
                !isPasswordContainSpecialChar()) {
                showPasswordError.value = true;
                passwordError.value = 'Votre mot de passe ne rempli pas toutes les conditions!';
                return false;
            } else {

                showPasswordError.value = false;
                passwordError.value = '';
            }
        }
        return true;
    }

function handleRegistration() {
  signup(username.value, email.value, password.value)
    .then(response => {
      showPasswordError = false;
      const token = response.data;
      store.commit('storeToken', token);
      if (response && response.status === 200) { // Vérifier si la propriété status est définie
        router.push("/main");
      } else {
        console.log("Erreur: Impossible d'obtenir le statut de la réponse");
      }
    })
    .catch(error => {
      isLoading.value = false;
      if (error.response.status == 404) {
        passwordError.value = "Désolé, le serveur ne répond pas. Veuillez réessayer ultérieurement"
      } else {
        passwordError.value = error.response.data.message;
      }
    });
}

const handleLogin = () => {
  login(username.value, password.value)
    .then(response => {
      showPasswordError.value = false;
      const token = response.data;
      store.commit('storeToken', token);
      router.push("/main");
    })
    .catch(error => {
      isLoading.value = false;
      showPasswordError.value = true;
      passwordError.value = error.response.data.message;
    });
}

function submitForm() {
        if (verifyPassword()) {
            isLoading.value = true;
            setTimeout(() => {
                if (showPasswordError.value == false) {
                    if (props.buttonTitle === "Inscription") {
                        handleRegistration()
                    } else if (props.buttonTitle === "Connexion") {
                        handleLogin()
                    }
                }
            }, 500);
        }
    }
</script>

<style scoped>
main{
    background-image: url("@/assets/img/login.jpg");
}

input[type="file"],
input:hover,
input:focus {
    background-color: #40444b;
    border: 0;
}
</style>
