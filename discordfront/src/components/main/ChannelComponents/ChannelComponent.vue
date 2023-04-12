<template>
  <router-link :to="'/main/server/channel/' + id" :class="{active: $route.path.includes('channel/'+id) }"
    class="rounded-md w-90 py-2 px-3 mb-3 mx-2
    focus:text-gray-200 hover:cursor-pointer hover:bg-gray-600
    ">
    <p class="text-gray-100">{{ props.name }}</p>
  </router-link>
</template>

<script setup>
import { defineProps } from 'vue';

  const props = defineProps({
    name: String,
    id: Number
  })


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