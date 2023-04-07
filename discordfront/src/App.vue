<template>
    <router-view/>
</template>

<script>

</script>
<style>

@import url('https://fonts.cdnfonts.com/css/gotham');
main{
    background-repeat: no-repeat;
    background-size:cover;
    color: #b9bbbe;
    font-family: 'Gotham Light', sans-serif;
    height: 100%;
    }

body, html {
  margin: 0;
  height: 100%;
  background-color: #313338;
  overflow-y: hidden;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
