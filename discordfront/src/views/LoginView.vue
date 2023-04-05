<template>
    <LoginForm 
    :title="title" 
    :secondTitle="secondTitle"
    :buttonTitle="buttonTitle"
    :confirmPwd="confirmPwd"
    :link="link"
    :submit="submit" />
  </template>

<script setup>
import LoginForm from '@/components/login/LoginForm.vue';

const title= 'Content de te revoir!';
const secondTitle= 'Renseigne tes identifiants pour te connecter';
const buttonTitle= 'Connexion';
const confirmPwd=false;
const submit='';
const link = "Besoin d'un compte ? <a href='/inscription'>S'inscrire</a>";

</script>


