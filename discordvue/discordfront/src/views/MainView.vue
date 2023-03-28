<template>
    <MenuSelection class="menu"/>
    <MessagesList/>
</template>

<script>
import MenuSelection from '@/components/MenuSelection.vue';
import MessagesList from '@/components/MessagesList.vue'

export default{
    name: 'MenuView',
    components:{
        MenuSelection,MessagesList
    }
}
</script>

<style>
</style>