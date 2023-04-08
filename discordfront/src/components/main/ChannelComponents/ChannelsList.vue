<template>
    <!-- Liste channels / Amis si MP -->
    <div class="w-100">
        <h2 class="p-2 text-gray-100">Salons textuels
            <span @click="addChannel()"
            class="text-gray-100 opacity-50
            cursor-pointer hover:opacity-100 p-1
            transition-all duration-200 ease-linear" id="plus">
                <font-awesome-icon :icon="['fas', 'plus']"  />
            </span>
        </h2>
        <div id="channels-list" class="text-left flex flex-col overflow-y-auto">
            <ChannelComponent v-for="(channel, index) in channels" :id="index" :key="index" :name="channel"/>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import ChannelComponent from './ChannelComponent.vue';


const channels = ref(['general', 'devoirs', 'jeux'])


function addChannel() {
    const input = document.createElement('input');
    input.type = 'text';
    input.required='true';
    input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && event.target.value!='') {
        const channelName = event.target.value;
        channels.value.push(channelName);
        event.target.remove();
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

