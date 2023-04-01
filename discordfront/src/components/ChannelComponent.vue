<template>
    <a  :class="{ channelSelected: selectedChannelId === index }" @click="selectChannel(1)" >
        <li>{{ channelName }}</li>
    </a>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  props: {
    name: String
  },
  data() {
    return {
      channelName: this.name
    }
  },
  computed: {
    ...mapGetters(['selectedChannelId'])
  },
  methods: {
    ...mapMutations(['setSelectedChannelId']),
    selectChannel(id) {
      this.setSelectedChannelId(id)
      localStorage.setItem('selectedChannelId', id)
    }
  }

}
</script>
<style scoped>


li{
    color: #a9aaab;
}

li::before{
    content: "# ";
}

a{
    margin:0.2em 1em;
    border-radius: 5px;
    width: 90%;
    padding:5px 10px;

}


a:hover,.selected
{
    cursor: pointer;
    background-color: #3c3f45;
}

a:hover>li{
    color: #dcddde;
}

a:focus>li{
    color:#dcddde;
    font-weight: 600;
}
</style>