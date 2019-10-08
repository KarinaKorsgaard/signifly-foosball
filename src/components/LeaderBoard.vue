<template>
  <main v-if="loaded">
    <div class="board">
      <h2>Team name</h2>
      <h2>Won matches</h2>
      <h2>Points</h2>
      <template v-for="(item, index) in getScores()">
        <div :key="index">
          <p>{{item.name}}</p>
        </div>
        <div :key="index + '1'">
          <p>{{item.gamesWon}}</p>
        </div>
        <div :key="index + '2'">
          <p>{{item.points}}</p>
        </div>
      </template>
    </div>
  </main>
</template>

<script>
export default {
  name: "ScoreBoard",
  methods: {
    getScores() {
      let result = [];
      for (let i = 0; i < this.numTeams; i++) {
        const teamPoints = this.getTeamPoints(i);
        result.push({
          name: this.teamNames[i],
          gamesWon: teamPoints.won,
          points: teamPoints.tie + teamPoints.won * 3
        });
	  }
	  
      result.sort(function(a, b) {
        return b.points - a.points;
      });
      return result;
	},
	
    getTeamPoints(teamId) {
      const homeGames = [...this.games].filter(game => game.id[0] == teamId);
      const outGames = [...this.games].filter(game => game.id[1] == teamId);

      const wonHome = homeGames.filter(game => game.score[0] > game.score[1]);
      const wonOut = outGames.filter(game => game.score[0] < game.score[1]);
      const won = wonHome.length + wonOut.length;
      const ties = [...this.games].filter(
        game => game.score[0] == game.score[1]
      ).length;
      const lost = this.games.length - ties - won;

      return {
        won: won,
        lost: lost,
        tie: ties
      };
    }
  },
  computed: {
    teamNames: function() {
      return this.$store.state.teamNames;
	},
	
    games: function() {
      return this.$store.state.tournaments[this.$store.state.tournamentId]
        .games;
	},
	
    loaded: function() {
      return this.$store.state.loaded;
	},
	
    numTeams() {
      return this.$store.state.numberOfTeams;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.board {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;
  text-align: center;
  div {
    background-color: $grey;
    font-family: $Oswald;
    text-transform: uppercase;
  }
}
</style>
