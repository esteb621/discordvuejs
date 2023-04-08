<template>
  <router-link :to="'/main/server/channel/' + (id+1)" :class="{active: $route.path.includes('channel/'+(id+1)) }"
    class="rounded-md w-90 py-2 px-3 mb-3 mx-2
     focus:text-gray-200 hover:cursor-pointer hover:bg-gray-600
    " @click="setActiveChannel(name, index)">
    <p class="text-gray-100">{{ name }}</p>
  </router-link>
</template>


<script setup>
import { ref } from 'vue'
  import { defineProps } from 'vue';

  const props = defineProps({
    name: String,
    id: Number
  })

const currentChannel= ref(null);
const currentIndex= ref(-1);
function setActiveChannel(channel, index) {
      currentChannel.value = channel;
      currentIndex.value = channel ? index : -1;
      console.log(props.id)
      console.log(currentIndex.value)
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
</style>