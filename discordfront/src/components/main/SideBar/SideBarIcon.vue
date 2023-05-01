<template> 
<router-link :to="!$route.path.includes('/main/') ? '/main/' + props.id : ''"
    :class="{selected: $route.path.includes(props.id) }"
    class="relative flex items-center justify-center 
                h-12 w-12 mt-2 mb-2 mx-auto shadow-lg
                bg-gray-800 text-blue-600
                hover:bg-blue-600 hover:text-gray-200
                active:top-0.5
                rounded-3xl hover:rounded-xl
                transition-all duration-200 ease-linear cursor-pointer group">
    <ToolTip :title="props.name" class="origin-left left-14"/>
    <font-awesome-icon :icon="props.icon" size="xl" />
</router-link>    
</template>


<script setup>
import { defineProps } from 'vue';
import ToolTip from '../ToolTip.vue';

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
    background-color: rgb(37 99 235 / var(--tw-bg-opacity));
    color: rgb(235 237 239 / var(--tw-text-opacity));
    border-radius: 0.75rem;
}
</style>