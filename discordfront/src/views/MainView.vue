<template>
    <div class="flex flex-row h-screen" id="discord">
        <SideBar/>
        <div id="channel" class="flex flex-col">
            <ChannelsList class="grow"/>
            <ProfileBanner/>
        </div>
        <MessagesList/>
        <UsersList/>
        <!-- <ProfileSettings/>-->
    </div>

</template>

<script setup>
import ChannelsList from '@/components/main/ChannelComponents/ChannelsList.vue';
import MessagesList from '@/components/main/MessageComponents/MessagesList.vue'
import UsersList from '@/components/main/UserComponents/UsersList.vue';
import ProfileBanner from '../components/main/Profile/ProfileBanner.vue';
import SideBar from '@/components/main/SideBar/SideBar.vue';


// A METTRE POUR LA PROD

// import authHeader from '@/services/auth-header';
// import router from '@/router';
// import { onMounted } from 'vue';

// onMounted(() => {
//   const headers = authHeader();
//   if (!headers['x-access-token']) {
//   router.push('/connexion');
// }});

</script>

<style>

#channel{
    width: 250px;
}

a{
    text-decoration: none;
}

a,p{
    text-align: left;
}

</style>

