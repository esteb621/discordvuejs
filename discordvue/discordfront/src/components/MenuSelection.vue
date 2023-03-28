<template>
     <div class="menu p-2 d-flex flex-column h-100">
        <button 
            v-bind:class="{ active: activeButton === 'privateMessage', buttonSelected: activeButton === 'privateMessage' }" 
            @click="setSelectedButton('privateMessage')"            id="mpButton" class="mb-3 active" type="submit" 
            data-toggle="tooltip" data-trigger="hover" data-placement="right" title="Messages privés">
                <i class="bi bi-discord"></i>
        </button>
        <button id="serverButton" 
            v-bind:class="{ active: activeButton === 'server', buttonSelected: activeButton === 'server' }" 
            @click="setSelectedButton('server')"
            data-toggle="tooltip" data-trigger="hover" data-placement="right" title="Serveur principal">
        </button>
    </div>
</template>


<script>
    export default {
    data() {
        return {
        activeButton: null
        }
    },
    methods: {
        setSelectedButton(button) {
            this.activeButton = button;
        }
    }
    }
</script>

<style scoped>
.menu{
    width: fit-content;
    background-color: #1e1f22;
}

button{
    background-color: #2f3136;
    font-size: 30px;
    width: 50px;
    height: 50px;
    border: 0;
    border-radius: 30px;
    color: #dcddde;
    transition: 0.5s;
    position: relative;
}

.buttonSelected,
button:hover{
    border-radius: 12px;
    transition: 0.2s;
    cursor:pointer;
}

button:active{
    top: 1px;
}

button:active,:focus{
    outline: none;
    box-shadow: none;
  }


button:hover:first-child{
    background-color: #4752c4;
}

#serverButton{
    background-image: url("../assets/Pierre_Pujos.jpg");
    background-position: center;
    background-size: cover;
}
</style>