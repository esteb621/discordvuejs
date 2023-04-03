<template>
    <div class="d-flex flex-row h-100" id="discord">
        <MenuSelection/>
        <div id="channel" class="d-flex flex-column">
            <ChannelsList/>
            <ProfileBanner/>
        </div>
        <MessagesList/>
        <UsersList/>
        <!-- <ProfileSettings/> -->
    </div>

</template>

<script setup>
import ChannelsList from '@/components/ChannelsList.vue';
import MenuSelection from '@/components/MenuSelection.vue';
import MessagesList from '@/components/MessagesList.vue'
import UsersList from '@/components/UsersList.vue';
import ProfileBanner from '../components/ProfileBanner.vue';
</script>

<style scoped>

#channel{
    width: 250px;
}

</style>

