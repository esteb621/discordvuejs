<template>
    <div class="fixed top-0 left-0 h-screen w-16 m-0
                flex flex-col bg-primary text-secondary shadow-lg">
        <SideBarIcon :icon="['fab', 'discord']" name="Messages privés" id="1"/>
        <SideBarIcon :icon="['fab', 'user']" name="Serveur principal" id="2"/>
    </div>

</template>

<script setup>
import SideBarIcon from './SideBarIcon.vue';

</script>