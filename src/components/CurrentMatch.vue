<template>
  <section>
    <transition-expand>
      <main v-if="loaded && currentGame!=-2">
        <h2>Current game</h2>
        <Confetti ref="confetti" />
        <section class="currentGameContainer">
          <div class="currentGame" @click="updateScore(0)">
            <h3>{{teamNameB}}</h3>
            <h2>{{game.score[1]}}</h2>
          </div>&nbsp; &nbsp;
          <div class="currentGame" @click="updateScore(1)">
            <h3>{{teamNameA}}</h3>
            <h2>{{game.score[0]}}</h2>
          </div>
        </section>
        <button class="button submitgame" @click="submitGame">Submit game result</button>
      </main>
    </transition-expand>

    <transition-expand>
      <main v-if="currentGame==-2">
        <p>Click on a game to start</p>
      </main>
    </transition-expand>
  </section>
</template>

<script>
import Confetti from "@/components/Confetti.vue";
import TransitionExpand from "@/components/TransitionExpand.vue";

export default {
  name: "CurrentMatch",

  methods: {
    updateScore(params) {
      this.$store.commit("updateScore", {
        currentGame: this.currentGame,
        teamID: params
      });
      this.$refs.confetti.start();
    },

    submitGame() {
      this.game.isDone = true;
      this.$store.commit("setCurrentGame", -2);
    }
  },

  components: {
    Confetti,
    TransitionExpand
  },

  watch: {
    currentGame: function(newVal, oldVal) {
      const allgames = this.$store.state.tournaments[
        this.$store.state.tournamentId
      ].games;

      const gameToReset = allgames[oldVal];

      if (gameToReset != undefined && !gameToReset.isDone)
        gameToReset.score = [0, 0];
    }
  },

  computed: {
    game: function() {
      const allgames = this.$store.state.tournaments[
        this.$store.state.tournamentId
      ].games;
      return allgames[this.currentGame];
    },

    teamNameA: function() {
      return this.$store.state.teamNames[this.game.id[0]];
    },

    teamNameB: function() {
      return this.$store.state.teamNames[this.game.id[1]];
    },

    loaded: function() {
      return this.$store.state.loaded;
    },

    currentGame() {
      return this.$store.state.currentGame;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  height: 0;
}

main {
  width: 100%;
  height: auto;
}

.currentGameContainer {
  min-width: 320px;
  width: 100%;
  display: flex;

  .currentGame {
    width: 50%;
    max-height: 250px;
    background-color: $blue;
    text-align: center;
    color: white;
    cursor: pointer;
    h3: {
      font-size: 30px;
    }

    h2 {
      font-size: 3em;
      line-height: 0em;
    }

    @include small {
      max-height: 150px;
      h2 {
        font-size: 2em;
        line-height: 0em;
      }
    }
  }
}

.submitgame {
  position: relative;
  display: block;
  margin: 20px auto;
}
</style>
