<template> 
<a  :class="{ selected: props.id == store.getters.selectedButtonId }"
    class="relative flex items-center justify-center 
                h-12 w-12 mt-2 mb-2 mx-auto shadow-lg
                bg-gray-800 text-green-500
                hover:bg-green-600 hover:text-gray-200
                active:top-0.5
                rounded-3xl hover:rounded-xl
                transition-all duration-200 ease-linear cursor-pointer group"
                @click="setSelectedButtonId(props.id)">
    <font-awesome-icon :icon="props.icon" size="xl" />
    <span class="absolute w-auto p-2 m-2 min-w-max left-14
                rounded-md shadow-md
                text-gray-100 bg-gray-900
                text-sm font-bold
                transition-all duration-100 scale-0 origin-left group-hover:scale-100">
    {{ props.name }}</span>
</a>    
</template>


<script setup>
import router from '@/router';
import { defineProps } from 'vue';
import { useStore } from 'vuex';
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

    const store = useStore()

    const setSelectedButtonId = (id) => {
      store.commit('setSelectedButtonId', id);
      router.push(id);
    }


</script>

<style scoped>
.selected{
    background-color:rgb(22 163 74/ var(--tw-text-opacity));
    color: rgb(235 237 239 / var(--tw-text-opacity));
    border-radius: 0.75rem;
}
</style>