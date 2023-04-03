<template>
    <a  :class="{ channelSelected: selectedChannelId === index }" @click="selectChannel(1)" >
        <li>{{ name }}</li>
    </a>
</template>

<script setup>
import { defineProps } from 'vue';
defineProps({
  name: String
})

function selectChannel(channelId) {
  console.log(channelId);
}

</script>
<style scoped>


li{
    color: #a9aaab;
}

li::before{
    content: "# ";
}

a{
    margin:0.2em 1em;
    border-radius: 5px;
    width: 90%;
    padding:5px 10px;

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