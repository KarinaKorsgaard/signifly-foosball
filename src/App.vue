<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Scoreboards</router-link>
      <p>&nbsp;|&nbsp;</p>
      <router-link to="/leaderboard">Leaderboard</router-link>
      <p>&nbsp;|&nbsp;</p>
      <router-link to="/admin">Admin</router-link>
    </div>
    <transition name="fade">
      <router-view class="routerView" />
    </transition>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch("fetchData");
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Oswald:700&display=swap");

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}

h1,
h2,
h3 {
  font-family: "Oswald", sans-serif;
  text-transform: uppercase;
}

h1 {
  font-size: 3em;
}

h2 {
  font-size: 1.3em;
}

p {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  text-transform: none;
  font-size: 0.8em;
}

.button {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  background-color: $blue;
  font-size: 1em;
  font-weight: bold;
  color: white;
  border-radius: 100px;
  transition: all 0.2s ease-in-out;
  padding: 20px;
  border: none;
}

.button:hover {
  transform: scale(1.1);
}

.routerView {
  width: 80%;
  margin: 10%;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

#nav {
  padding: 10px;
  text-align: right;
  a,
  p {
    font-weight: bold;
    color: #2c3e50;
    font-family: $Oswald;
    text-transform: uppercase;
    display: inline;
    &.router-link-exact-active {
      color: $green;
    }
  }
}
</style>
