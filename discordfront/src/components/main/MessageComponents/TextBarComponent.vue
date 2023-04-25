<template>
    <div class="relative p-2 mb-2">
        <form @submit.prevent="submitMessage">
            <input id="textbar" type="text" required autocomplete="off"
                class="shadow-none rounded-md  w-full p-3 pr-10 focus:outline-none
                bg-gray-800 text-gray-400 placeholder:text-gray-400 placeholder:opacity-50 resize-y h-12 min-h-12 max-h-40"
                placeholder="Ecrivez votre message..." v-model="message"
                aria-label="Recipient's username" aria-describedby="button-addon2"/>
            <button @click="submitMessage" class="absolute mt-3 right-0 mr-5 text-rounded-md text-gray-400 hover:text-gray-500 duration-200" type="button">
                <font-awesome-icon :icon="['fas', 'paper-plane'] " />
            </button>        
        </form>
    </div>
</template>


<script setup>
import { ref,defineEmits } from 'vue';
import { useRouter } from 'vue-router';
// import { useStore } from 'vuex';

// const store = useStore();
const route = useRouter();
const message = ref('');
// const idUser = ref(store.getters['auth/getUser'].id).value;
const idUser = ref(1).value;

const emit = defineEmits(['send-message']);
function submitMessage() {
    const link=route.currentRoute.value;
    const idChannel=link.params.id || 1;
    emit('send-message',idUser,idChannel,message.value);
    message.value = '';

}
</script>