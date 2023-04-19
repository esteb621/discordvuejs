<template>
<router-link :to="'/main/personal/user/'+userId" class=" p-2 rounded-md flex items-center cursor-pointer hover:bg-gray-700">
  <img class=" w-10 rounded-full" src="@/assets/img/profile-default.jpg" alt="Photo de profil" id="profile-picture">
  <h4 class="p-2 rounded-sm text-md font-bold text-yellow-400 ">{{ username }}</h4>
</router-link>

</template>

<script setup>
import { defineProps, ref } from 'vue';



const props = defineProps({
    username:{
        type:String,
        required:true
    },
    userId:{
        type:Number,
        required:true
    }
})

const username=ref(props.username).value;
const userId=ref(props.userId).value;
</script>
<style scoped>
/* a{
    color: #a9aaab;
    margin:0.2em 1em;
    border-radius: 5px;
    width: 90%;
    padding:5px 10px;
} */

</style>