<template>
<router-link :to="'/main/personal/user/'+userId" class=" p-2 rounded-md flex items-center cursor-pointer hover:bg-gray-700">
  <UserPicture :id="userId" :link="link"/>
  <h4 class="p-2 rounded-sm text-md font-bold text-yellow-400 ">{{ username }}</h4>
</router-link>

</template>

<script setup>
import { defineProps, ref } from 'vue';
import UserPicture from '@/components/main/UserComponents/UserPicture.vue'



const props = defineProps({
    userId:{
        type:Number,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    link:{
        type:String,
        required:true
    }
})

const username=ref(props.username).value;
const userId=ref(props.userId).value;
const link=ref(props.link).value;
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