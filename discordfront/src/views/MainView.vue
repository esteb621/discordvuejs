<template>
    <div class="flex" id="discord">
        <SideBar/>
        <!-- <div id="channel" class="d-flex flex-column">
            <ChannelsList/>
            <ProfileBanner/>
        </div>
        <MessagesList/>
        <UsersList/> -->
        <!-- <ProfileSettings/> -->
    </div>

</template>

<script setup>
// import ChannelsList from '@/components/main/ChannelComponents/ChannelsList.vue';
// import MessagesList from '@/components/main/MessageComponents/MessagesList.vue'
// import UsersList from '@/components/main/UserComponents/UsersList.vue';
// import ProfileBanner from '../components/main/Profile/ProfileBanner.vue';
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

