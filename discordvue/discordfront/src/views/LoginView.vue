<template>
    <LoginForm 
    :title="title" 
    :secondTitle="secondTitle"
    :buttonTitle="buttonTitle"
    :confirmPwd="confirmPwd"
    :link="link" />
  </template>

<script>
import LoginForm from '@/components/LoginForm.vue';

export default {
  name: 'LoginView',
  components: {
    LoginForm
  },
  data(){
    return {
        title: 'Content de te revoir!',
        secondTitle: 'Renseigne tes identifiants pour te connecter',
        buttonTitle: 'Connexion',
        confirmPwd:false,
    };
  },
  computed: {
    link(){
      return "Besoin d'un compte ? <a href='/inscription'>S'inscrire</a>";
    }
  }
}
</script>


