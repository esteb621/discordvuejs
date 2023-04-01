<template>
    <!-- Message conversation -->
    <div class="flex-xl-grow-1 d-flex flex-column align-items-stretch" id="messages-field">
        <h2 class="p-2 mb-auto">General</h2>
        <div id="message-container" class="d-flex flex-column w-100">
            <MessageComponent/>
        </div>
        <TextBarComponent/>
    </div>
</template>

<script>
import TextBarComponent from './TextBarComponent.vue';
import MessageComponent from './MessageComponent.vue';

export default {
  name: 'MessagesList',
  components: {
    MessageComponent,TextBarComponent
  }
}

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