<template>
    <div id="profile" class="p-2">
        <div class="d-flex flex-row align-items-center" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Modifier le profil">

            <a href="#" id="profileSettings" data-bs-toggle="modal" data-target="#settings" data-bs-trigger="hover"
                class="d-flex flex-row justify-content-center p-2">
                <img id="profile-picture" src="@/assets/profile-default.jpg" alt="Photo profil">
                <p class="px-2">Esteban</p>
            </a>
            <a href="../" class="p-2 ml-auto" id="exit" data-toggle="tooltip" data-trigger="hover" data-placement="top" title="Déconnexion">
                <i class="bi bi-box-arrow-right"></i>
            </a>
        </div>
    </div>
    <div class="modal fade" id="settings" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header border-0">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Mon profil</h1>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <form action="">
                        <div class="align-self-center modal-body d-flex flex-row br-2 m-3 rounded">
                            <label id="file-label" class="rounded-circle align-self-center">
                                <input type="file" id="file-input" accept=".jpg,.jpeg,.gif,.png">
                            </label>

                            <div class="d-flex flex-column m-3 w-75">
                                <div class="d-flex flex-column mb-3">
                                    <label class="pb-2">Nom d'utilisateur</label>
                                    <input type="text" name="username" class="pb-2" value="Esteban">
                                </div>

                                <div class="d-flex flex-column mb-3">
                                    <label class="pb-2">E-mail</label>
                                    <input type="email" name="email" required="true" class="pb-2"
                                        value="loremipsum@dolor.com">
                                </div>
                                <div class="d-flex flex-column mb-3">
                                    <label class="pb-2">Mot de passe</label>
                                    <input type="password" required="true" class="pb-2" value="loremipsum">
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer border-0">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                            <input type="submit" class="btn btn-primary" value="Appliquer les changements">
                        </div>
                    </form>
                </div>
            </div>
        </div>
</template>

<style scoped>
#profile{
    background-color:#232428;
}

#profile-picture{
    width: 35px;
    height: 35px;
    border-radius: 50%;
}

a{
    width: fit-content;
    color: azure;
}

a:hover, a:visited, a:link{
    outline: 0;
}

a:hover{
    background-color: #3c3f45;
    border-radius: 5px;
}
</style>