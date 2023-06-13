<template>
    <div v-if="isloading" class="w-10 h-10 rounded-full bg-gray-600 animate-pulse" alt="Photo de profil" id="profile-picture"></div>
    <img v-if="!isloading" class="w-10 h-10 rounded-full" :src="link" alt="Photo de profil" id="profile-picture">
</template>

<script setup>
import { defineProps, ref,onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const props = defineProps({ 
    id:{
        type:Number
    },
    link:{
        type:String
    }
})

let link = ref(props.link);
let userId = ref(props.id).value;
let isloading=ref(false);

onMounted(async () => {
    isloading.value=true
    if(!store.getters['user/getPicture'](userId)){
        await store.dispatch('user/fetchPicture',userId);
    }
    link.value=store.getters['user/getPicture'](userId);
    isloading.value=false
});
</script>