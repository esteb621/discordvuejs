<template>
    <router-link class="rounded-md w-90 p-5 mx-1 hover:bg-gray-600 focus:text-gray-200" 
    @click="selectChannel(id)">
        <p class="text-gray-100">{{ name }}</p>
    </router-link>
</template>


<script setup>
import { defineProps } from 'vue';

defineProps({
  name: String,
  id: Number
})


</script>
