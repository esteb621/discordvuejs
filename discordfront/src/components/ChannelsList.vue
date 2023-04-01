<template>
    <!-- Liste channels / Amis si MP -->
    <div id="channels" class="p-2">
        <h2 class="p-2">Salons textuels</h2>
        <ul class="d-flex row" id="channels-list">
            <div id="channels-list" class="text-left d-flex flex-column w-100">
                <ChannelComponent v-for="(channel, index) in channels" :key="index" :name="channel"/>
            </div>
        </ul>
    </div>
</template>
<script>
import ChannelComponent from './ChannelComponent.vue'

export default {
  name: 'ChannelsList',
  components: {
    ChannelComponent
  },
  data() {
    return {
      channels: ['general', 'devoirs', 'jeux']
    }
  }
}
</script>

<style scoped>

h2{
    font-size: 1rem;
    color:#9298a8;
}

p{
    font-size: 0.7rem;
}


#channels{
    background-color: #2f3136;
    border: 0;
    overflow-x: hidden;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
}


 .channels-icon {
    cursor: pointer;
}

ul{
    list-style-type: none;
    padding: 0;
    width: 110%;
}

.selected{
    font-weight: 600;
}
</style>