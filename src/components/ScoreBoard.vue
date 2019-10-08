<template>
  <div class="wrapper">
    <main class="scoreboard" :style="gridLayout" v-if="loaded">
      <!-- column labels -->
      <p />
      <p v-for="(n, column) in numTeams" :key="column + '-colLables'">{{teamNames[column]}}</p>

      <template v-for="(n, row) in numTeams">
        <!-- row labels -->
        <p :key="row + '-row'">{{teamNames[row]}}</p>

        <!-- board -->
        <div
          v-for="(item, column) in getTeamRow(row)"
          :key="column + ' ' + row"
          @click="setCurrentGame(item)"
          :class="{active: item.gameId == currentGame, clickable: item.gameId >= 0 && !item.isDone && item.gameId != currentGame}"
        >
          <p v-if="item.gameId!=-1">{{item.score[1]}}-{{item.score[0]}}</p>
		  
          <div class="white none" v-else></div>
        </div>
      </template>
    </main>
  </div>
</template>

<script>
export default {
  name: "ScoreBoard",
  data: function() {
    return {
      gridLayout: {
        "grid-template-columns": `repeat(${this.numTeams}, auto)`
      }
    };
  },
  
  methods: {
    getTeamRow(teamId) {
	  let teamRow = this.games.filter(game => game.id[0] == teamId);
	  
	  teamRow.sort(function(a, b) {
        return a.id[1] - b.id[1];
      });
      teamRow.splice(teamId, 0, { id: [0, 0], score: [0, 0], gameId: -1 });
      return teamRow;
	},
	
    setCurrentGame(item) {
      //TODO: remove click from game squares that can't be clicked.
      if (item.gameId == -1 || item.isDone)
        this.$store.commit("setCurrentGame", -2);
      else this.$store.commit("setCurrentGame", item.gameId);
    }
  },

  watch: {
    numTeams: function(val) {
      this.gridLayout = {
        "grid-template-columns": `80px repeat(${val}, auto)`
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
      this.gridLayout = {
        "grid-template-columns": `repeat(${this.$store.state.numberOfTeams +
          1}, auto)`
      };
      return this.$store.state.numberOfTeams;
	},
	
    currentGame() {
      return this.$store.state.currentGame;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.wrapper {
  width: 100%;
  overflow: hidden;
  overflow-x: scroll;
}

.scoreboard {
  display: grid;
  grid-gap: 10px;
  width: 100%;
  text-align: center;
  div {
    background-color: $grey;
    min-width: 60px;
    p {
      font-family: $Oswald;
      text-transform: uppercase;
    }
  }

  .active {
    background-color: $blue;
    color: white;
  }

  .clickable {
    cursor: pointer;
    background: white;
    border: 1px solid black;
  }

  .white {
    opacity: 0.5;
    background-color: aliceblue;
  }

  .none {
    width: 100%;
    height: 100%;
  }
}
</style>
