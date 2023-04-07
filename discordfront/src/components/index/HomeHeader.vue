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
                    <div class="align-self-center">
                        <RouterLink to="/connexion"  class="btn btn-primary btn-lg m-2">Se connecter</RouterLink>
                        <RouterLink to="/inscription" class="btn btn-secondary btn-lg">S'inscrire</RouterLink>
                    </div>
                </div>
            </div>
        </div>
    <div id="credits" class="p-2 mt-auto align-self-start"> 
            Dévelopée par <a href="">Esteban Vangi</a>,<a href=""> Pierre Pujos</a> et <a href=""> Lucas Buonocore</a>
    </div>
    </section>
</template>

<style scoped>

    #home {
        font-family: "Gotham", sans-serif;
        color: azure;
        height: 100%;
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
/* Applique une opacité de 0% au titre h1 */

    /* Définit une animation pour le titre h1 */
    h1,h2,.btn,#credits {
    opacity: 0%;
    animation-name: slide-in;
    animation-duration: 1s;
    animation-fill-mode: forwards;
    }

    h1{
      animation-delay: 0.2s; /* Délai de demi-seconde avant que l'animation ne commence */  
    }
    h2 {
    animation-delay: 0.5s; /* Délai de demi-seconde avant que l'animation ne commence */
    }

    .btn {
    animation-delay: 0.7s; /* Délai de demi-seconde avant que l'animation ne commence */
    }

    #credits{
      animation-delay: 1s;
    }

    /* Définit les propriétés de l'animation */
    @keyframes slide-in {
        from {
            opacity: 0%;
            transform: translateY(100%);
        }
        to {
            opacity: 100%;
            transform: translateY(0%);
        }
    }

</style>