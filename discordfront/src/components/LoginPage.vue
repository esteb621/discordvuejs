<template>
    <div id="login">
      <h1>Content de te revoir!</h1>
      <h2></h2>
      <login-form></login-form>
      <div>
        <router-link to="/register">Créer un compte</router-link>
        <router-link to="/forgot-password">Mot de passe oublié</router-link>
      </div>
    </div>
  </template>
  
  <script>
  import LoginForm from './LoginForm.vue'
  
  export default {
    components: {
      LoginForm
    }
  }
  </script>