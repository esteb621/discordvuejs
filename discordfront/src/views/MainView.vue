<template>
    <div class="d-flex flex-row h-100" id="discord">
        <MenuSelection/>
        <ChannelsList/>
        <MessagesList/>
        <UsersList/>
    </div>
</template>

<script>
import ChannelsList from '@/components/ChannelsList.vue';
import MenuSelection from '@/components/MenuSelection.vue';
import MessagesList from '@/components/MessagesList.vue'
import UsersList from '@/components/UsersList.vue';

export default{
    name: 'MenuView',
    components:{
    MenuSelection,
    MessagesList,
    ChannelsList,
    UsersList
}
}
</script>

