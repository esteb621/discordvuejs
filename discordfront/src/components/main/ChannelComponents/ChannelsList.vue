<template>
    <!-- Liste channels / Amis si MP -->
    <div class="w-100 flex-grow bg-gray-800">
            <p class="mt-4 p-2 pl-3 text-left text-xs cursor-default text-gray-500 hover:text-gray-300 font-bold uppercase">Salons textuels
                <span @click="addChannel()"
                class="text-gray-100 opacity-50
                cursor-pointer hover:opacity-100 p-1
                transition-all duration-200 ease-linear" id="plus">
                    <font-awesome-icon :icon="['fa', 'plus']" size="lg" />
                </span>
            </p>
        <div id="channels-list" class="text-left flex flex-col overflow-y-auto">
            <span v-if="error" class="text-red-600 font-bold p-2">{{ error }}</span>
            <div v-if="!isloading">
                <ChannelComponent v-for="(channel, index) in channels" :id="channel.id" :key="index" :name="channel.nom"/>
            </div>
            <ChannelSkeleton v-if="isloading"/>
        </div>
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import ChannelComponent from './ChannelComponent.vue';
import ChannelSkeleton from './ChannelSkeleton.vue';
import channelService from '@/services/channel.service';


const channels=ref([]);
const isloading=ref(false);
const error=ref('');
const fetchChannels= async() => {
    error.value=false;
    isloading.value=true;
    try{
        const data = await channelService.getChannels();
        channels.value=data;
    }
    catch{
        error.value=true;
    }
    isloading.value=false;
}



onMounted(async () => {
    await fetchChannels();
});


const addChannel = async() => {
    const input = document.createElement('input');
    input.type = 'text';
    input.required='true';
    input.addEventListener('keydown', async (event) => {
    if (event.key === 'Enter' && event.target.value!='' && !channels.value.includes(event.target.value) ) {
        const channelName = event.target.value;
        await channelService.addChannel(channelName)
        .then(response=>{
            console.log(response);
            channels.value.push(response);
            event.target.remove(); 
        })
        .catch(e=>{
            error.value=e;            
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


</script>

