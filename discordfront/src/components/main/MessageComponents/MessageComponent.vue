<template>
    <div id="message" class="flex flex-row mb-3">
        <div class="flex-shrink-0 p-2">
            <img id="profile-picture-message"
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                alt="photo de profil">
        </div>
        <div class="p-2 flex flex-col flex-wrap text-left">
            <h4>{{ username }}</h4>
            <p>{{ message }}</p>
        </div>
    </div>
</template>
<script setup>
import { ref,defineProps } from 'vue';

const props = defineProps({
    username:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    }
})

const username= ref(props.username);
const message= ref(props.message);
</script>
<style scoped>
#message img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
}
h4{
    color: #f1c40f;
    font-size: large;
    
}
p{
    color:#cccccc;
}


h4:focus{
    text-decoration: underline;
}

h4,p{
    width: fit-content;
}

#message h4:hover{
    text-decoration: underline;
    cursor: pointer;
}

#message:hover{
    background-color: #32353b;
}
</style>