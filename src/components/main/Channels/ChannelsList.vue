<template>
    <!-- Liste channels / Amis si MP -->
    <div class="w-100 flex-grow bg-gray-800">
        <p class="mt-4 p-2 pl-3 text-left text-xs cursor-default text-gray-500 hover:text-gray-300 font-bold uppercase">{{ title }}
            <span v-if="isAdmin && route.currentRoute.value.path === '/main/server'" @click="buttonClicked=true"
            class="text-gray-100 opacity-50 cursor-pointer hover:opacity-100 p-1 transition-all duration-200 ease-linear" id="plus">
                <font-awesome-icon :icon="['fa', 'plus']" size="lg" />
            </span>
        </p>
        <div id="channels-list" class="text-left flex flex-col overflow-y-auto">
            <div v-if="!isloading">
                <ChannelComponent :admin="isAdmin" v-for="(channel, index) in channels" :id="channel.id" :key="index" :name="channel.nom" @delete-channel="deleteChannel"/>
                <input v-model="input" v-if="buttonClicked && route.currentRoute.value.path === '/main/server'" type="text" placeholder="Nom du salon" @keyup.esc="buttonClicked=false;" @keyup.enter="addChannel" required title="Enter" 
                class="rounded-md w-90 py-2 px-3 mb-3 mx-2 font-bold bg-gray-600 outline-none text-gray-200 flex flex-row items-center space-x-2"/>
                <div v-if="route.currentRoute.value.path === '/main/personal'">
                    <input v-model="friendUsername" type="text" placeholder="Nom d'utilisateur" class="rounded-md w-90 py-2 px-3 mb-3 mx-2 font-bold bg-gray-600 outline-none text-gray-200 flex flex-row items-center space-x-2"/>
                    <button @click="addFriend" class="rounded-md py-2 px-3 bg-green-500 text-gray-200">+</button>
                </div>
            </div>
            <ChannelSkeleton v-if="isloading"/>
        </div>
    </div>
</template>





<script setup>
import { ref ,defineEmits, watchEffect} from 'vue';
import ChannelComponent from './ChannelComponent.vue';
import ChannelSkeleton from './ChannelSkeleton.vue';
import channelService from '@/services/channel.service';
import userService from '@/services/user.service';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const channels=ref(null);
const title=ref('Salons textuels');
const isloading=ref(false);
const input=ref('');
const isAdmin=ref(false);
const buttonClicked=ref(false);
const route=useRouter();
const store=useStore();
//test
const friendUsername = ref('');




watchEffect(async () => {
    const link=route.currentRoute.value;
    if (link.path.includes("server")) {
        title.value="Salons textuels";
        if(Object.keys(store.getters['channel/getChannels']).length === 0){
            store.dispatch('channel/fetchChannels');
        }
        channels.value=store.getters['channel/getChannels'];
        if(store.getters['auth/getUser']){
            await userService.getUserById(store.getters['auth/getUser'].id)
            .then(response => {
                if(response.role_id==2){
                    isAdmin.value=true;
                }
            })
            .catch(e => {
                console.warn(e.response.data.message);
            })
        }
    }
    if(link.path.includes("personal")==true){
        const id= store.getters['auth/getUser'].id;
        title.value="Messages privés";
        if(!store.getters['channel/getPrivateMessages']){
            store.dispatch('channel/fetchPrivateMessages',id);
        }
        isAdmin.value=false;
        channels.value = store.getters['channel/getPrivateMessages'];
        console.log(channels.value)
    }
});

const emit = defineEmits(['info-message']);

//test
const addFriend = async () => {
  if(friendUsername.value){
    try{
      const user1 = store.getters['auth/getUser'].id;
      const user2 = friendUsername.value;
      
      const response = await userService.addFriend(user1, user2);

      if (response) {
        emit('info-message', `L'utilisateur ${friendUsername.value} a bien été ajouté comme ami!`);
        friendUsername.value = ''; // On réinitialise la zone de saisie
      } else {
        console.log(response);
        emit('info-message', response);
      }
    }
    catch(e){
      emit('info-message', e);
    }
  }
}



const addChannel = async() => {
    if(input.value && !channels.value.includes(input.value)){
        try{
            await channelService.addChannel(input.value,1)
            .then(response=>{
                channels.value.push(response);
                buttonClicked.value=false;
                emit('info-message', `Le channel ${input.value} a bien été crée!`);
            })
        }
        catch(e){
            emit('info-message', e);
        }
    }
}

async function deleteChannel(id){
    console.log(id)
    await channelService.delete(id)
          .then(async (response)=>{
              store.dispatch("channel/fetchChannels");
              route.push('./1')
              emit('info-message', response.message);
          })
          .catch(e => {
            emit('info-message',e);
          })
}

</script>

