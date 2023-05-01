<template>
    <div class="flex flex-row h-screen" id="discord">
      <div class="flex flex-row max-[768px]:hidden">
        <component :is="SideBar"/>
        <div id="channel" class="flex flex-col">
          <component :is="ChannelsList" class="grow" @info-message="handleInfoMessage" />
          <component :is="ProfileBanner" @show-modal="showModal = true" />
        </div>
      </div>
      <div class="flex flex-col w-full">
        <Alert v-if="info" :info="info" />
        <component :is="MessagesList"/>
      </div>  
      <div class="flex flex-col max-[768px]:hidden">
        <component :is="UsersList"/>
      </div>
      <Transition name="fade">
        <component :is="ProfileSettings" v-if="showModal" @close="showModal = false" @info-message="handleInfoMessage" />
      </Transition>
    </div>
</template>
  

<script setup>
import ChannelsList from '@/components/main/ChannelComponents/ChannelsList.vue';
import MessagesList from '@/components/main/MessageComponents/MessagesList.vue'
import UsersList from '@/components/main/UserComponents/UsersList.vue';
import Alert from '@/components/main/AlertComponent.vue';
import ProfileBanner from '../components/main/Profile/ProfileBanner.vue';
import ProfileSettings from '../components/main/Profile/ProfileSettings.vue';
import SideBar from '@/components/main/SideBar/SideBar.vue';
import { ref } from 'vue';
import authHeader from '@/services/auth-header';
import router from '@/router';
import { onMounted } from 'vue';

const showModal = ref(false);
const info = ref("");


function handleInfoMessage(infoMessage) {
  info.value = infoMessage;
  setTimeout(() => {
     info.value = '';
  }, 3000);
}

onMounted(() => {
  const headers = authHeader();
  if (!headers['x-access-token']) {
    router.push('/login');
}});

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

.fade-enter-from{
  opacity: 0;
}

.fade-enter-to{
  opacity:1;
}

.fade-enter-active{
  transition: opacity 0.5s;
}

</style>

