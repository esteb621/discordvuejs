<template>
    <img class="w-10 h-10 rounded-full" :src="link" alt="Photo de profil" id="profile-picture">
</template>

<script setup>
import { defineProps, onMounted, ref } from 'vue';
import pictureService from '@/services/picture.service';

const props = defineProps({
    id:{
        type:Number
    },
    link:{
        type:String
    }
})
let link = ref(props.link);

const idUser = ref(props.id).value;

onMounted(async () => {
    if(!link.value && idUser)
    {
        link.value = await pictureService.getProfilePicture(idUser);
    }
})
</script>