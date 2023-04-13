<template>
    <!-- Message conversation -->
    <div class="flex-grow flex flex-col items-stretch" id="messages-field">
        <div class="mb-auto text-left text-lg  shadow-md bg-gray-700 font-bold p-3">
          <h2 v-if="!isloading" class="text-gray-300"><font-awesome-icon :icon="['fa', 'hashtag']" class="text-gray-500" /> {{ currentChannel }}</h2>
          <div v-if="isloading" class="animate-pulse bg-gray-600 rounded-md w-20 h-6"></div>
        </div>
        <div id="message-container" class="flex flex-col w-100 snap-y" >
            <MessageComponent class="snap" v-for="message in messages" v-bind:key="message.username" :username="message.username" :message="message.text"/>
        </div>
        <TextBarComponent @send-message="sendMessage"/>
    </div>
</template>

<script setup>
import TextBarComponent from './TextBarComponent.vue';
import MessageComponent from './MessageComponent.vue';
import { ref, nextTick, watchEffect } from 'vue';
import channelService from '@/services/channel.service';
import { useRouter } from 'vue-router';
const currentChannel = ref('');


const route = useRouter();
const isloading=ref(false);
const messages = ref([
  {
    "username":"Lucas",
    "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
  },
  {
    "username":"Esteban",
    "text":"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
  },
  {
    "username":"Esteban",
    "text":"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
  },
  {
    "username":"Esteban",
    "text":"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
  }

]);

function sendMessage(message, username) {
  console.log(message);
  messages.value.push({username:username,text:message});
  nextTick(() => {
    scrollToLastMessage();
  });
}

function scrollToLastMessage(){
  console.log("fait");
  const messageList = document.querySelector('#message-container');
  messageList.scrollTo(0, messageList.scrollHeight);
}

watchEffect(async () => {
  isloading.value=true;
  const link=route.currentRoute.value;
  const newId = link.params.id;
  if (link.path.includes("server/") && newId) {
    const id = newId;
    currentChannel.value = await channelService.getChannelName(id);
  }
  isloading.value=false;
});

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