<template>  
    <!-- Message conversation -->
    <div class="flex-grow flex flex-col items-stretch" id="messages-field">
        <div class="mb-auto text-left text-lg  shadow-md bg-gray-700 font-bold p-3">
          <h2 v-if="!isloading" class="text-gray-300"><font-awesome-icon :icon="['fa', 'hashtag']" class="text-gray-500" /> {{ currentChannel }}</h2>
          <div v-if="isloading" class="animate-pulse bg-gray-600 rounded-md w-20 h-6"></div>
        </div>
        <div v-if="route.currentRoute.value.params.id" id="message-container" class="flex flex-col w-100 snap-y bg-gray-00" >
          <div v-if="!isloading" class="flex flex-col p-2 ml-3 space-y-2 text-left">
            <font-awesome-icon :icon="['fa', 'hashtag']" class="p-4 rounded-full text-3xl w-10 h-10 bg-gray-600 text-gray-300  " />
            <h2 class="text-gray-100 text-3xl font-bold w-fit">Bienvenue dans #{{ currentChannel }}!</h2>
            <h3 class="text-gray-300">C'est le début du salon #{{ currentChannel }}.</h3>
          </div>
            <MessageComponent v-for="message in messages" v-bind:key="message.id" :userId="message.user" :message="message.text"/>
            <MessageSkeleton v-if="isloading"/>
        </div>
        <TextBarComponent @send-message="sendMessage"/>
    </div>
</template>

<script setup>
import TextBarComponent from './TextBarComponent.vue';
import MessageComponent from './MessageComponent.vue';
import { ref, nextTick, watchEffect, onBeforeUnmount } from 'vue';
import messageService from '@/services/message.service';
import { useRouter } from 'vue-router';
import MessageSkeleton from './MessageSkeleton.vue';
import router from '@/router';
import { useStore } from 'vuex';
const currentChannel = ref('Veuillez sélectionner un channel');


const route = useRouter();
const isloading=ref(false);
const messages = ref([]);
const store = useStore();




function sendMessage(userId,channelId,message) {
  messages.value.push({ user:userId ,channel:channelId, text:message });
  messageService.sendMessage(userId,channelId,message);
  nextTick(() => {
    scrollToLastMessage();
  });
}

function scrollToLastMessage(){
  const messageList = document.querySelector('#message-container');
  console.log('scrollToLastMessage : ', messageList)
  messageList.scrollTo(0, messageList.scrollHeight);
}

watchEffect(async () => {
  const link = route.currentRoute.value;
  const newId = link.params.id;
  
  if (link.path.includes('server') && newId) {
    idChannel = newId;
    
    if (!store.getters['message/getMessagesByChannelId'](idChannel)) {
      isloading.value = true;
      await store.dispatch('message/fetchMessages', idChannel);
    }
    
    messages.value = store.getters['message/getMessagesByChannelId'](idChannel);
    currentChannel.value = store.getters['message/getChannelNameById'](idChannel);
  
  } else if (!link.path.includes('personal')) {
    router.push('/main/server');
  }
  
  isloading.value = false;
});

    // Définir une intervalle de 5 secondes pour appeler store.dispatch
    const intervalId = setInterval(async () => {
      if(idChannel){
        await store.dispatch('message/fetchMessages', idChannel);
      }
    }, 5000);

    // Avant de détruire le composant ou l'effet, effacer l'intervalle
    onBeforeUnmount(() => {
      clearInterval(intervalId);
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
