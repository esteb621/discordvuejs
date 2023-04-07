<template>
    <main class="d-flex justify-content-center align-items-center text-left">
        <div id="login" class="shadow-lg p-4 rounded">
            <h1 class="pb-2 text-light">{{ title }}</h1>
            <h2 class="text-center">{{ secondTitle }}</h2>
            <div class="mt-4 text-start">
                <form class="form-group" method="POST">
                    <!-- Champ pseudo -->
                    <div class="row">
                        <div class="col-md-12">
                            <label for="username" class="form-label">Nom d'utilisateur *</label>
                            <input v-model="username" class="form-control text-light" ref="usernameInput"
                                type="username" id="username" name="username" required>
                        </div>
                    </div>
                    <div class="row" v-if="props.confirmPwd">
                        <div class="col-md-12">
                            <label for="email" class="form-label">Adresse mail *</label>
                            <input v-model="email" class="form-control text-light" ref="emailInput" type="email"
                                id="email" name="email" required>
                        </div>
                    </div>

                    <!-- Champ mot de passe -->
                    <div class="row">
                        <div class="col-md-12">
                            <label for="password" class="form-label ">Mot de passe *</label>
                            <input v-model="password" class="form-control text-light" ref="passwordInput"
                                type="password" id="password" name="password" required>
                        </div>
                    </div>

                    <!-- Conditions du mot de passe -->
                    <div v-if="props.confirmPwd">
                        <span class="mb-2 text-light">Votre mot de passe doit contenir au moins:</span>
                        <ul class="list-unstyled text-light">
                            <li :class="{ 'text-success': isPasswordLongEnough() }">
                                <font-awesome-icon v-if="isPasswordLongEnough()" :icon="['fa', 'check']" style="color: #0ba70b;" />
                                8 caractères
                            </li>
                            <li :class="{ 'text-success': isPasswordContainDigit() }">
                                <font-awesome-icon v-if="isPasswordContainDigit()" :icon="['fa', 'check']" style="color: #0ba70b;" />
                                Un chiffre
                            </li>
                            <li :class="{ 'text-success': isPasswordContainSpecialChar() }">
                                <font-awesome-icon v-if="isPasswordContainSpecialChar()" :icon="['fa', 'check']" style="color: #0ba70b;" />
                                 Un caractère spécial
                            </li>
                        </ul>
                    </div>

                    <!-- Champ confirmer mot de passe -->
                    <div v-if="props.confirmPwd" class="row">
                        <div class="col-md-12">
                            <label for="retypePassword" class="form-label">Confirmer le mot de passe *</label>
                            <input v-model="retypePassword" class="form-control text-light " type="password"
                                id="retypePassword" name="password" required="true">
                        </div>
                    </div>

                    <!-- Photo de profil -->
                    <div v-if="insertPhoto" class="row">
                        <div class="col-md-12">
                            <label for="profile_picture" class="form-label">Photo de profil (optionnel)</label>
                            <input type="file" accept=".jpg,.jpeg,.gif,.png" id="profile_picture" class="form-control">
                        </div>
                    </div>
                </form>
                <button :style="{ backgroundColor: isLoading ? clickedButton : backgroundColor }" @click="submitForm()"
                    :disabled="showPasswordError || isFormEmpty()" id="submit" class="btn btn-primary">
                    <span v-if="!isLoading">{{ buttonTitle }}</span>
                    <span v-if="isLoading">
                        <font-awesome-icon :icon="['fas', 'spinner']" spin /></span>
                </button>
                <p :on-change="showPasswordError=false" class="text-danger col-md-12">{{ passwordError }}</p>
            </div>
            <div class="text-capitalize mt-3">
                <p class="pl-2 text-center " v-html="link"></p>
            </div>
        </div>
    </main>
</template>


<script setup>
    import router from '@/router';
    import axios from 'axios';
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
        axios.post('/api/auth/signup', {
                username: username.value,
                email: email.value,
                password: password.value,
            })
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
        axios.post('/api/auth/login', {
                username: username.value,
                password: password.value
            })
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

<style scoped lang="css">
    main {
        background-image: url("@/assets/login.jpg");
    }


    #login {
        border-radius: 5px;
        background-color: #36393f;
        max-height: 75%;
        overflow-y: auto;
    }

    h1 {
        font-size: 30px;
        font-weight: 600;
        line-height: 30px;

    }

    h1,
    #submit {
        color: #f3f1f1;
    }

    h1,
    h2 {
        text-align: center;
        margin: 5px;
    }

    h2 {
        font-size: 20px;
    }

    * {
        color: #f3f1f1;
    }

    ul {
        list-style-type: ' ';
    }

    label {
        font-size: 15px;
        font-weight: 700;
        margin-bottom: 8px;
        text-align: left;
    }


    #label-picture::after {
        content: none;
    }

    input,
    #submit {
        width: 100%;
        height: 40px;
        background-color: #40444b;
        border: 0;
        border-radius: 3px;
        margin-bottom: 15px;
        outline: 0;
    }

    input[type="file"],
    input:hover,
    input:focus {
        background-color: #40444b;
        color: #f3f1f1;
        border: 0;
    }

    #submit {
        height: 44px;
        border-radius: 3px;
        font-size: 18px;
        transition: all 0.2s ease 0s;
    }

    #submit:hover {
        background-color: #4752c4;
        cursor: pointer;
    }

    a:hover {
        text-decoration: none;
    }

    a {
        color: #00aff4;
    }

    p {
        font-size: 15px;
    }

    .condition-checked {
        color: rgb(11, 167, 11);
    }

    i {
        font-size: 25px;
        transition: all 0.2s ease-in-out;
    }

    .isLoading {
        background-color: rgb(50, 159, 30);
    }
</style>