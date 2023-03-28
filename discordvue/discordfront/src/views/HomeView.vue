<template>
    <HomeHeader/>
    <section id="demo" class="bg-dark py-5">
      <div class="container">
        <div class="row">
          <div class="col-md-6 mx-auto text-center">
            <h2 class=" mb-4">Démonstration</h2>
            <p class="lead mb-5">
              Découvrez l'interface sans devoir vous connecter!
            </p>
            <button class="btn btn-outline-primary" @click="voirDemo()">
              Voir la démo
            </button>
          </div>
        </div>
      </div>
    </section>
</template>

<script>
  // @ is an alias to /src
  import HomeHeader from '@/components/HomeHeader.vue'

  export default {
    name: 'HomeView',
    components: {
      HomeHeader
    },
    methods: {
      connecter() {
        console.log("Connexion...")
      },
      inscrire() {
        console.log("Inscription...")
      }
    }
  }
</script>

<style scoped>
#demo {
  color: #f6f6f6;
}
</style>