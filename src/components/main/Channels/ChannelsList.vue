<template>
    <!-- Liste channels / Amis si MP -->
    <div class="w-100 flex-grow bg-gray-800">
            <p class="mt-4 p-2 pl-3 text-left text-xs cursor-default text-gray-500 hover:text-gray-300 font-bold uppercase">{{ title }}
                <span v-if="isAdmin" @click="addChannel()"
                class="text-gray-100 opacity-50
                cursor-pointer hover:opacity-100 p-1
                transition-all duration-200 ease-linear" id="plus">
                    <font-awesome-icon :icon="['fa', 'plus']" size="lg" />
                </span>
            </p>
        <div id="channels-list" class="text-left flex flex-col overflow-y-auto">
            <div v-if="!isloading">
                <ChannelComponent :admin="isAdmin" v-for="(channel, index) in channels" :id="channel.id" :key="index" :name="channel.nom" @delete-channel="deleteChannel"/>
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
const error=ref('');
const isAdmin=ref(false);
const route=useRouter();
const store=useStore();
// const fetchChannels= async() => {
//     error.value=false;
//     isloading.value=true;
//     await channelService.getChannels()
//     .then(data => {
//         channels.value=data;
//     })
//     .catch(e => {
//         console.warn(e.response.data.message);
//     })
//     isloading.value=false;
// }



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
        title.value="Messages privés";
        channels.value={};
    }
});

const emit = defineEmits(['info-message']);
const addChannel = async() => {
    const input = document.createElement('input');
    input.type = 'text';
    input.required='true';
    input.addEventListener('keydown', async (event) => {
    if (event.key === 'Enter' && event.target.value!='' && !channels.value.includes(event.target.value) ) {
        const channelName = event.target.value;
        await channelService.addChannel(channelName)
        .then(response=>{
            channels.value.push(response);
            event.target.remove(); 
            error.value="";
            emit('info-message', `Le channel ${channelName} a bien été crée!`);
        })
        .catch(e=>{
            emit('info-message', e);
        })  
    }
    else if(event.key==='Escape'){
        event.target.remove();
    }
    });
    input.placeholder="Nom du salon"
    input.className="w-90 py-2 px-3 mb-3 mx-2 left-2 bg-gray-600 rounded-md outline-none text-gray-200"
    document.getElementById('channels-list').appendChild(input);
    input.focus();
}

async function deleteChannel(id){
    const index = channels.value.findIndex(channel => channel.id === id);
    if (index !== -1) {
        await channelService.delete(id)
        .then(() => {
            const deletedChannel = channels.value[index].nom;
            channels.value = channels.value.filter(channel => channel.id !== id);
            emit('info-message', `Le channel ${deletedChannel} a bien été supprimé!`);
        })
        .catch(e => {
            emit('info-message', e);
        })
    }
}

</script>

