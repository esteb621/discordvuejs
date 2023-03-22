<template>
  <router-view/>
</template>

<style>
html,body{
    background-image:url("assets/background.jpg");
    background-repeat: no-repeat;
    background-size:cover;
    color: #b9bbbe;
    font-family: 'Gotham Light', sans-serif;
    height: 100%;
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
</style>
