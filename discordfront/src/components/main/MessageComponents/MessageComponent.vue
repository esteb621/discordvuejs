<template>
    <div id="message" class="flex flex-row mb-3">
        <div class="flex-shrink-0 p-2 ml-3">
            <UserPicture :id="userId"/>
        </div>
        <div class="p-2 flex flex-col flex-wrap text-left">
            <div v-if="!username" class="w-16 h-6 rounded-md bg-gray-600 animate-pulse"></div>
            <h4 v-if="username">{{ username }}</h4>
            <p>{{ message }}</p>
        </div>
    </div>
</template>
<script setup>
import userService from '@/services/user.service';
import { ref,defineProps, onMounted } from 'vue';
import UserPicture from '../UserComponents/UserPicture.vue';

const props = defineProps({
    userId:{
        type:Number,
        required:true
    },
    message:{
        type:String,
        required:true
    }
})
const userId= ref(props.userId).value;
const message= ref(props.message);
const username = ref('');

onMounted(async () => {
    username.value=(await userService.getUserById(userId)).username;
});
</script>
<style scoped>

h4{
    color: #f1c40f;
    font-size: large;
    
}
p{
    color:#cccccc;
}


h4:focus{
    text-decoration: underline;
}

h4,p{
    width: fit-content;
}

#message h4:hover{
    text-decoration: underline;
    cursor: pointer;
}

#message:hover{
    background-color: #32353b;
}
</style>