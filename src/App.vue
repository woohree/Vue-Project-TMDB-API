<template>
  <div id="app" class="container">
    <nav>
      <router-link :to="{ name: 'home' }">Home</router-link> |
      <router-link :to="{ name: 'random' }">Random</router-link> |
      <router-link :to="{ name: 'watchList' }">Watch List</router-link>
    </nav>
    <router-view/>
  </div>

</template>

<style>
#app {
  font-family: 'pt-sans', sans-serif, Avenir, Helvetica, Arial;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #6610f2;
}
</style>
