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
import ChannelsList from '@/components/main/Channels/ChannelsList.vue';
import MessagesList from '@/components/main/Messages/MessagesList.vue'
import UsersList from '@/components/main/Users/UsersList.vue';
import Alert from '@/components/main/AlertComponent.vue';
import ProfileBanner from '../components/main/Profile/ProfileBanner.vue';
import ProfileSettings from '../components/main/Profile/ProfileSettings.vue';
import SideBar from '@/components/main/SideBar/SideBar.vue';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import EventBus from '@/common/EventBus';

const showModal = ref(false);
const info = ref("");
const store = useStore()
const router = useRouter();
function handleInfoMessage(infoMessage) {
  info.value = infoMessage;
  setTimeout(() => {
     info.value = '';
  }, 3000);
}

const logOut = () => {
  store.dispatch('auth/logout');
  router.push('/login');
};

onMounted(() => {
  EventBus.on("logout", () => {
    logOut();
  });
});

onBeforeUnmount(() => {
  EventBus.remove("logout");
});
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

