<template>
    <div id="message" class="d-flex flex-row mb-3">
        <div class="flex-shrink-0 p-2">
            <img id="profile-picture-message"
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                alt="photo de profil">
        </div>
        <div class="p-2 d-flex flex-column flex-wrap text-left">
            <h4>Lucas</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris magna felis, sollicitudin et
            dolor vitae, dignissim convallis nibh. Mauris vitae leo in leo lacinia semper id eu enim. In
            at lectus nec neque condimentum iaculis nec ac sapien. Praesent nulla dui, pellentesque vel
            velit non, rhoncus rhoncus ex. Aenean ipsum nisl, ornare vitae ornare in, fermentum nec
            nulla. Ut accumsan, odio in imperdiet commodo, nisl libero consectetur enim, sed commodo sem
            massa et justo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per
            inceptos himenaeos. </p>
        </div>
    </div>
</template>

<style scoped>
#message img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
}
h4{
    color: #f1c40f;
    font-size: large;
    
}
p{
    color:#cccccc;
}


h4:focus{
    text-decoration: underline;
}

h4,p{
    width: fit-content;
}

#message h4:hover{
    text-decoration: underline;
    cursor: pointer;
}

#message:hover{
    background-color: #32353b;
}
</style>