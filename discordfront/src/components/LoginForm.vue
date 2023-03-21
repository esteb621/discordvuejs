<template>
    <form @submit.prevent="login">
      <label for="username">Nom d'utilisateur</label>
      <input type="text" id="username" v-model="username" required>
      <label for="password">Mot de passe</label>
      <input type="password" id="password" v-model="password" required>
      <button type="submit">Se connecter</button>
    </form>
  </template>

<script lang="ts">
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login() {
      // Insérer le code pour la vérification de l'authentification ici
    }
  }
}
</script>