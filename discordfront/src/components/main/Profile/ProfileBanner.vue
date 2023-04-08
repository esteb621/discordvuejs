<template>
    <div id="profile" class="p-2">
        <div class="flex flex-row items-center" >

            <a href="#" id="profileSettings" data-toggle="tooltip" data-trigger="hover" data-placement="top" title="Modifier le profil"
                class="flex flex-row justify-center items-start p-2">
                <img id="profile-picture" src="@/assets/img/profile-default.jpg" alt="Photo profil">
                <p class="px-2 font-bold">Esteban</p>
            </a>
            <a href="../" class="p-2 ms-auto" id="exit" data-toggle="tooltip" data-trigger="hover" data-placement="top" title="Déconnexion">
                <font-awesome-icon :icon="['fas', 'sign-out-alt']" />
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
    text-decoration: none;
}

a:hover, a:visited, a:link{
    outline: 0;
}

a:hover{
    background-color: #3c3f45;
    border-radius: 5px;
}
</style>