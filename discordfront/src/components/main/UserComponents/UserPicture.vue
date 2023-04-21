<template>
    <img class="w-10 h-10 rounded-full" :src="link" alt="Photo de profil" id="profile-picture">
</template>

<script setup>
import { defineProps, ref } from 'vue';


const props = defineProps({
    link:{
        type:String
    }
})
const link = ref(props.link);


</script>