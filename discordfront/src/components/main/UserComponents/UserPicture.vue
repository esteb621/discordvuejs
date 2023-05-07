<template>
    <div v-if="isloading" class="w-10 h-10 rounded-full bg-gray-600 animate-pulse" alt="Photo de profil" id="profile-picture"></div>
    <img v-if="!isloading" class="w-10 h-10 rounded-full" :src="link" alt="Photo de profil" id="profile-picture">
</template>

<script setup>
import { defineProps, onMounted, ref } from 'vue';
import pictureService from '@/services/picture.service';
import store from '@/store';

const props = defineProps({ 
    id:{
        type:Number
    },
    link:{
        type:String
    }
})

let link = ref(props.link);
let idUser = ref(props.id).value;
let isloading=ref(false);

onMounted(async () => {
    isloading.value=true;
    if(!link.value){  
        if(!idUser && store.getters['auth/getUser'])
        {
            idUser=store.getters['auth/getUser'].id
        }
        link.value = await pictureService.getProfilePicture(idUser);        
    }
    isloading.value=false;

})
</script>