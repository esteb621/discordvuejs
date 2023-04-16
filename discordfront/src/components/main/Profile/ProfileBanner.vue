<template>
    <div id="profile" class="p-2">
        <div class="flex flex-row items-center">
            <a @click="$emit('show-modal')"
            class="flex flex-row justify-center 
            items-start p-2 group cursor-pointer">
                <img id="profile-picture" src="@/assets/img/profile-default.jpg" alt="Photo profil">
                <p class="px-2 font-bold">Esteban</p>
                <ToolTip class="origin-bottom bottom-14" title="Modifier le profil"/>
            </a>
            <a @click="handleLogout()" class="p-2 ms-auto group cursor-pointer" >
                <ToolTip title="Déconnexion" class="origin-bottom bottom-14 left-60"/>
                <font-awesome-icon :icon="['fas', 'sign-out-alt']" />
            </a>
            
        </div>  
    </div>
</template>

<script setup>
import store from '@/store';
import ToolTip from '../ToolTip.vue';
import router from '@/router';

const handleLogout = async () => {
    store.dispatch('auth/logout');
    router.push('/login');
}

</script>



<style scoped>
#profile{
    background-color:#232428;
}

#profile-picture{
    width: 35px;
    height: 35px;
    border-radius: 50%;
}

a{
    width: fit-content;
    color: azure;
    text-decoration: none;
}

a:hover, a:visited, a:link{
    outline: 0;
}

a:hover{
    background-color: #3c3f45;
    border-radius: 5px;
}
</style>