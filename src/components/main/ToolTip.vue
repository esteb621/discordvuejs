<template>
    <span class="absolute w-auto p-2 m-2 min-w-max
    rounded-md shadow-md
    text-gray-100 bg-gray-900
    text-sm font-bold
    transition-all duration-100 scale-0 group-hover:scale-100">
        {{ props.title }}
    </span>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    title:{
        type:String,
        required:true
    }
})
</script>