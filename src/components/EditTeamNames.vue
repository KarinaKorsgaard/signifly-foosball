<template>
  <main v-if="loaded">
    <div v-for="(item, index) in teamNames" :key="index">
      <input v-model="teamNames[index]" :placeholder="item" />
    </div>
  </main>
</template>

<script>
export default {
  name: "EditTeamNames",
  computed: {
    teamNames: function() {
      return this.$store.state.teamNames;
	},
	
    loaded: function() {
      return this.$store.state.loaded;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
input {
  width: 200px;
  height: 50px;
  font-size: 1em;
  margin: 5px;
  text-align: left;
  background-color: $grey;
}
</style>
