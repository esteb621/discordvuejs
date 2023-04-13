<template>
  <section id="home" class="flex flex-col items-end bg-gray-900 h-screen">
    <div class="container text-white self-center flex justify-center items-center h-screen">
      <div class="row justify-center">
        <div class="text-center w-screen">
          <h1 class="opacity-0 m-4 font-bold text-5xl  animate-slide-in animation-delay-200">
            Bienvenue sur Discord!
          </h1>
          <h2 class="opacity-0 font-light text-xl mb-5 animate-slide-in animation-delay-500">
            Inscrivez-vous ou connectez-vous pour commencer
          </h2>
          <div class="self-center">
            <RouterLink to="/connexion" class="opacity-0 bg-blue-500 text-white text-xl font-bold rounded-lg py-3 px-6 m-2
             hover:bg-blue-600 duration-200 animate-slide-in animation-delay-700">
              Se connecter
            </RouterLink>
            <RouterLink to="/inscription" class="opacity-0 bg-gray-500 text-white text-xl font-bold rounded-lg py-3 px-6 
            hover:bg-gray-600 duration-200 animate-slide-in animation-delay-700">
              S'inscrire
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
    <div id="credits" class="opacity-0 p-2 mt-auto self-start text-white animate-slide-in animation-delay-1000"> 
      Développé par 
      <a href="" class="underline">Esteban Vangi</a>,
      <a href="" class="underline">Pierre Pujos</a> et 
      <a href="" class="underline">Lucas Buonocore</a>
    </div>
  </section>
</template>

<style scoped>

    #home {
        font-family: "Gotham", sans-serif;
        background-image: url("@/assets/img/home.png");
    }

    /* Définit une animation pour le titre h1 */

</style>