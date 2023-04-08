<template> 
<router-link :to="'/main/'+ props.id"
    :class="{selected: $route.path.includes(props.id) }"
    class="relative flex items-center justify-center 
                h-12 w-12 mt-2 mb-2 mx-auto shadow-lg
                bg-gray-800 text-green-500
                hover:bg-green-600 hover:text-gray-200
                active:top-0.5
                rounded-3xl hover:rounded-xl
                transition-all duration-200 ease-linear cursor-pointer group"
                >
    <font-awesome-icon :icon="props.icon" size="xl" />
    <span class="absolute w-auto p-2 m-2 min-w-max left-14
                rounded-md shadow-md
                text-gray-100 bg-gray-900
                text-sm font-bold
                transition-all duration-100 scale-0 origin-left group-hover:scale-100">
    {{ props.name }}</span>
</router-link>    
</template>


<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    name: {
        type: String,
        required: true
    },
    icon: {
        type: Array,
        required: true,
    },
    id: {
        type:String,
        required:true
    }
});


</script>

<style scoped>
.selected{
    background-color:rgb(22 163 74/ var(--tw-text-opacity));
    color: rgb(235 237 239 / var(--tw-text-opacity));
    border-radius: 0.75rem;
}
</style>