<template>
    <div id="profile" class="p-2">
        <div class="d-flex flex-row align-items-center" >

            <a href="#" id="profileSettings" data-toggle="tooltip" data-trigger="hover" data-placement="top" title="Modifier le profil"
                class="d-flex flex-row justify-content-center p-2">
                <img id="profile-picture" src="@/assets/profile-default.jpg" alt="Photo profil">
                <p class="px-2">Esteban</p>
            </a>
            <a href="../" class="p-2 ml-auto" id="exit" data-toggle="tooltip" data-trigger="hover" data-placement="top" title="Déconnexion">
                <i class="bi bi-box-arrow-right"></i>
            </a>
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