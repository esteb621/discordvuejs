<template>
    <body class="d-flex justify-content-center align-items-center text-left">
        <div id="login" class="p-4">
            <h1 class="pb-2">{{ title }}</h1>
            <h2>{{ secondTitle }}</h2>
            <div class="mt-4">
                <form method="POST">
                    <label for="username">Nom d'utilisateur</label>
                    <input class="p-2" type="username" id="username" name="username" required="true">
                    
                    <label for="password">Mot de passe</label>
                    <input v-model="password" class="p-2" type="password" id="password" name="password" required="true">
                    <div v-if="pwdChecker">
                        <span class="mb-2">Votre mot de passe doit contenir au moins:</span>
                            <p v-bind:class="{ 'condition-checked': password.length >= 8 }"><span v-if="password.length >= 8"><i class="bi bi-check-lg"></i></span> 8 caractères</p>
                            <p v-bind:class="{ 'condition-checked': /\d/.test(password) }">
                                <span v-if="/\d/.test(password)"><i class="bi bi-check-lg"></i></span> Un chiffre</p>
                            <p v-bind:class="{ 'condition-checked': /[-!$%^&*()_+|~=`{}\[\]:'<>?,.@#\]]/.test(password) }">
                                <span v-if="/[-!$%^&*()_+|~=`{}\[\]:'<>?,.@#\]]/.test(password)"><i class="bi bi-check-lg"></i></span> Un caractère spécial</p>
                    </div>
                    <div v-if="confirmPwd">
                        <label>Confirmer le mot de passe</label>
                        <input v-model="retypePassword" class="p-2" type="password" id="retypePassword" name="password"
                            required="true" @focus="showPasswordError = true">
                    </div>

                    <p v-if="showPasswordError && password!==retypePassword" class="text-danger">Le mot de passe ne
                        correspond pas avec celui retapé</p>

                    <div v-if="insertPhoto">
                        <label id="label-picture">Photo de profil (optionnel)</label>
                        <div class="input-group mb-3">
                            <input type="file" accept=".jpg,.jpeg,.gif,.png" id="profile_picture" class="form-control">
                        </div>
                    </div>
                    <button @click="buttonClick" class="p-2" id="submit">{{ buttonTitle }}</button>
                </form>
            </div>
            <div class="text-capitalize">
                <p class="pl-2" v-html="link"></p>
            </div>
        </div>
    </body>
</template>

<script>
    export default {
        name: 'LoginForm',
        data() {
            return {
                password: '',
                retypePassword: ''
            }
        },
        methods:{
            isPasswordContainSpecialChar() {
                const specialChars = /[$&+,:;=?@#|'<>.^*()%!-]/;
                return specialChars.test(this.password);
                },
            isPasswordContainDigit() {
                const digit = /\d/;
                return digit.test(this.password);
                },
        },
        props: {
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
            pwdChecker: {
                type: Boolean
            },
            link: {
                type: String,
                required: true,
            },
        },
    }
</script>

<style scoped lang="css">
    @import url('https://fonts.cdnfonts.com/css/gotham');


    #login {
        border-radius: 5px;
        padding: 20px;
        background-color: #36393f;
        width: 500px;
        box-shadow: 2px 2px 10px #5e5e60;
        height: fit-content;
        min-width: 300px;
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

    ul{
        list-style-type: ' ';
    }

    label {
        font-size: 15px;
        font-weight: 700;
        margin-bottom: 8px;
        text-align: left;
    }

    label::after {
        content: ' *';
        color: #ea4245;
    }

    #label-picture::after{
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
    input[type="file"]:hover,
    input[type="file"]:focus {
        background-color: #40444b;
        color: #f3f1f1;
        border: 0;
    }

    #submit {
        margin-top: 20px;
        background-color: #5c6aff;
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

    .condition-checked{
        color: rgb(11, 167, 11);
    }
</style>