<template>
        <b-modal id="settings" title="Paramètres du profil">
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
        </b-modal>

</template>

<script>
export default {
  props: ['show']
}
</script>