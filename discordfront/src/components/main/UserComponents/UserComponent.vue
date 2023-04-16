<template>
<router-link :to="'/main/personal/user/'+userId" class="flex items-center">
  <img src="@/assets/img/profile-default.jpg" alt="Photo de profil" id="profile-picture">
  <h4 class="p-2 text-sm">{{ username }}</h4>
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
a{
    color: #a9aaab;
    margin:0.2em 1em;
    border-radius: 5px;
    width: 90%;
    padding:5px 10px;
}

a:hover, a:visited, a:link,#send:focus{
    text-decoration: none;
    outline: 0;
}


a:hover,.selected
{
    cursor: pointer;
    background-color: #3c3f45;
}

#profile-picture{
    width:35px;
    max-height: 35px;
    border-radius: 50%;
}

h4{
    color: #f1c40f;
    font-size: large;
}

</style>