<template>
    <!-- Liste channels / Amis si MP -->
    <div class="w-100">
        <h2 class="p-2 text-gray-100">Salons textuels
            <span @click="addChannel()"
            class="text-gray-100 opacity-50
            cursor-pointer hover:opacity-100 p-1
            transition-all duration-200 ease-linear">
                <font-awesome-icon :icon="['fas', 'plus']"  />
            </span>
        </h2>
        <div id="channels-list" class="text-left flex flex-col">
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
    document.getElementById('channels-list').appendChild(input);
    input.focus();
}


</script>

<style scoped>

a{
    margin:0.2em 1em;
    border-radius: 5px;
    width: 90%;
    padding:5px 10px;
    text-decoration: none;

}


a:hover,.selected
{
    cursor: pointer;
    background-color: #3c3f45;
}

a:hover>li{
    color: #dcddde;
}

a:focus>li{
    color:#dcddde;
    font-weight: 600;
}
</style>