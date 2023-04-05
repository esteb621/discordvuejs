<template>
    <HomeHeader/>
    <section id="demo" class="bg-dark py-5 text-light">
      <div class="container">
        <div class="row">
          <div class="col-md-6 mx-auto text-center">
            <h2 class=" mb-4">Démonstration</h2>
            <p class="lead mb-5">
              Découvrez l'interface sans devoir vous connecter!
            </p>
            <RouterLink class="btn btn-outline-primary" to="/main">Voir la démo</RouterLink>
          </div>
        </div>
      </div>
    </section>
</template>

<script setup>
import HomeHeader from '@/components/index/HomeHeader.vue';
</script>

