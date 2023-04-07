<template>
  <LoginForm 
  :title="title" 
  :secondTitle="secondTitle" 
  :email="email"
  :choixInscription="choixInscription"
  :insertPhoto="insertPhoto" 
  :confirmPwd="confirmPwd"
  :buttonTitle="buttonTitle"
  :link="link"
  />
</template>

<script>
import LoginForm from '@/components/login/LoginForm.vue';

export default {
  name: 'LoginView',
  components: {
    LoginForm
  },

  data(){
    return {
        title: 'Ravi de faire ta connaissance!',
        secondTitle: 'Merci de renseigner les informations suivantes',
        buttonTitle: 'Inscription',
        insertPhoto:true,
        choixInscription:false,
        confirmPwd:true,
        email:true
    };
  },
  computed: {
    link(){
      return "Déjà inscrit ? <a class='text-blue-500' href='/connexion'>Connexion</a>";
    }
  }
}
</script>

