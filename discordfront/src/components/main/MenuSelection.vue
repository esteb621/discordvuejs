<template>
     <div class="menu p-2 d-flex flex-column h-100">
        <button 
            :class="{ buttonSelected: selectedButtonId === 1 }"
            @click="setSelectedButtonId(1)" id="mpButton" class="mb-3 active" type="submit" 
            data-toggle="tooltip" data-trigger="hover" data-placement="right" title="Messages privés">
            <font-awesome-icon :icon="['fab', 'discord']" size="xs" style="color: #f5f5f5;" />
        </button>
        <button id="serverButton" 
            :class="{ buttonSelected: selectedButtonId === 2 }"
            @click="setSelectedButtonId(2)"
            data-toggle="tooltip" data-trigger="hover" data-placement="right" title="Serveur principal">
        </button>
    </div>
</template>


<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()

    const selectedButtonId = computed(() => store.getters.selectedButtonId)

    const setSelectedButtonId = (id) => {
      store.commit('setSelectedButtonId', id)
      localStorage.setItem('selectedButtonId', id)
    }

    return {
      selectedButtonId,
      setSelectedButtonId
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
    background-image: url("@/assets/Pierre_Pujos.jpg");
    background-position: center;
    background-size: cover;
}
</style>