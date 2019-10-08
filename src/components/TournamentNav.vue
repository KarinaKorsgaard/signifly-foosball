<template>
  <div class="tournamentNavigation">
    <template v-for="n in numberOfTournaments">
      <p
        :key="n"
        :class="{active: tournamentId == n - 1}"
        @click="setTournament(n - 1)"
      >Tournament: {{n}}</p>&nbsp;
      <p :key="n + '1'" v-if="n!=numberOfTournaments">|</p>&nbsp;
    </template>
  </div>
</template>

<script>
export default {
  name: "TournamentNav",
  methods: {
    setTournament(param) {
      this.$store.commit("setTournamentId", param);
    }
  },
  
  computed: {
    numberOfTournaments() {
      return this.$store.state.tournaments.length;
	},
	
    tournamentId() {
      return this.$store.state.tournamentId;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.tournamentNavigation {
  width: 100%;
  position: relative;
  left: 0px;
  display: flex;

  p {
    text-align: left;
    cursor: pointer;
  }

  .active {
    color: $green;
    font-weight: bold;
  }
}
</style>
