<template>
    <!-- Liste channels / Amis si MP -->
    <div class="w-100">
        <h2 class="p-2 text-gray-100">Salons textuels
            <span class="text-gray-100 opacity-50
            cursor-pointer hover:opacity-100 p-1
            transition-all duration-200 ease-linear">
                <font-awesome-icon :icon="['fas', 'plus']"  />
            </span>
        </h2>
        <div id="channels-list" class="text-left flex flex-col">
            <a :class="{ active: index == currentIndex }"
            v-for="(channel, index) in channels" :key="index"
            class="rounded-md w-90 p-5 mx-1 hover:bg-gray-500 focus:text-gray-200" 
            @click="setActiveChannel(channel, index)">

                <p class="text-gray-100">{{ channel }}</p>
            </a>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'

const channels = ref(['general', 'devoirs', 'jeux'])
const currentChannel= ref(null);
const currentIndex= ref(-1);

function setActiveChannel(channel, index) {
      currentChannel.value = channel;
      currentIndex.value = channel ? index : -1;
}


</script>

<style scoped>
.active{
    font-weight: bold;
    --tw-bg-opacity: 1;
    background-color: rgb(79 84 92 / var(--tw-bg-opacity));
}

p::before{
    content: "# ";
}

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