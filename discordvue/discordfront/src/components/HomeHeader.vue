<template>
    <section id="home" class="d-flex flex-column align-items-end">
        <div class="container text-light align-self-center d-flex justify-content-center align-items-center h-100">
            <div class="row justify-content-center">
                <div class="text-center">
                    <h1 class="m-4 font-weight-bold">
                        Bienvenue sur Discord!
                    </h1>
                    <h2 class="h4 font-weight-light mb-5">
                        Inscrivez-vous ou connectez-vous pour commencer
                    </h2>
                        <RouterLink to="/connexion"  class="btn btn-primary btn-lg m-2">Se connecter</RouterLink>
                        <RouterLink to="/inscription" class="btn btn-secondary btn-lg">S'inscrire</RouterLink>
                </div>
            </div>
        </div>
    <div class="p-2 mt-auto align-self-start"> 
            Dévelopée par <a href="">Esteban Vangi</a>,<a href=""> Pierre Pujos</a> et <a href=""> Lucas Buonocore</a>
    </div>
    </section>
</template>

<style scoped>

    #home {
        font-family: "Gotham", sans-serif;
        color: azure;
        height: 91vh;
        background-image: url("@/assets/home.png");
    }

    .btn-primary {
    background-color: #7289da;
    border-color: #7289da;
  }

  .btn-primary:hover {
    background-color: #677bc4;
    border-color: #677bc4;
  }

  .btn-secondary {
    background-color: #99aab5;
    border-color: #99aab5;
  }

  .btn-secondary:hover {
    background-color: #8b9fb2;
    border-color: #8b9fb2;
  }

  .btn-outline-primary {
    border-color: #677bc4;
    color: #677bc4;
  }

  .btn-outline-primary:hover {
    background-color: #677bc4;
    border-color: #677bc4;
  }

</style>