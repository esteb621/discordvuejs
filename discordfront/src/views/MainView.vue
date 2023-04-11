<template>
    <div class="flex flex-row h-screen" id="discord">
        <SideBar/>
        <div id="channel" class="d-flex flex-column h-full">
            <ChannelsList class="flex-grow h-[calc(100vh-8vh)]"/>
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

