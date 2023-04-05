<template>
    <!-- Liste channels / Amis si MP -->
    <div id="users">
        <h2 class="p-2">Utilisateurs</h2>
        <div class="p-2 d-flex row mb-3" id="users-list">
            <UserComponent/>
        </div>
    </div>
</template>

<script setup>
import UserComponent from './UserComponent.vue';
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