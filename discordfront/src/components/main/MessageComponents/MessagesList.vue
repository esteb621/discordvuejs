<template>
    <!-- Message conversation -->
    <div class="flex-grow flex flex-col items-stretch" id="messages-field">
        <h2 class="p-2 mb-auto">General</h2>
        <div id="message-container" class="flex flex-col w-100">
            <MessageComponent username="Lucas" message="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"/>
            <MessageComponent username="Esteban" message="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."/>
        </div>
        <TextBarComponent/>
    </div>
</template>

<script setup>
import TextBarComponent from './TextBarComponent.vue';
import MessageComponent from './MessageComponent.vue';
</script>

<style>
h2{
    color:#9298a8;
    font-size: x-large;
}

#message-container{
    overflow-y: auto;
    max-height: calc(100vh - 100px);
}

#messages-field{
    -webkit-flex: 2;
    -ms-flex: 2;
    flex: 2;
    background-color: #36393f;
    padding: 0 ;

}



</style>