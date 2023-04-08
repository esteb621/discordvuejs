<template>
    <div class="top-0 left-0 h-screen w-16
                flex flex-col bg-primary text-secondary shadow-lg">
        <SideBarIcon :icon="['fab', 'discord']" name="Messages privés" id="1"/>
        <SideBarIcon :icon="['fas', 'users']" name="Serveur principal" id="2"/>
    </div>

</template>

<script setup>
import SideBarIcon from './SideBarIcon.vue';

</script>