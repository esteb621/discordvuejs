<template>
    <!-- Liste channels / Amis si MP -->
    <div id="users" class="w-fit">
        <h2 class="p-2">Utilisateurs</h2>
        <div class="p-2 flex flex-col mb-3" id="users-list">
            <UserSkeleton v-if="isloading"/>
            <div v-if="!isloading">
                <UserComponent v-for="user in users.sort()" :username="user.username" v-bind:key="user.id" :userId="user.id" :link="user.picture" />
            </div>
        </div>
    </div>
</template>

<script setup>
import userService from '@/services/user.service';
import UserComponent from './UserComponent.vue';
import UserSkeleton from './UserSkeleton.vue'

import { onMounted, ref } from 'vue';

const users=ref([]);
const isloading = ref(false);
onMounted(async () => {
    isloading.value=true;
    users.value=await userService.getUsers();
    users.value.sort(function (a,b){
        const nameA = a.username.toUpperCase();
        const nameB = b.username.toUpperCase();
        
        let comparison = 0;
        if (nameA > nameB) {
            comparison = 1;
        } else if (nameA < nameB) {
            comparison = -1;
        }
        return comparison;
    })
    isloading.value=false;
})

</script>

<style>
#users {
    background-color: #2f3136;
    max-width: 240px;
    min-width: 235px;
    border: 0;
    overflow-x: hidden;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
 }



</style>