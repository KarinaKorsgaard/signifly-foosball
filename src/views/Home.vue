<template>
  <div class="home">
    <h1>Signifly Scoreboard</h1>
    <main>
      <TournamentNav />
      <CurrentMatch />
      <br />
      <br />
      <h2>Tournament games</h2>
      <ScoreBoard />
    </main>
  </div>
</template>

<script>
// @ is an alias to /src
import ScoreBoard from "@/components/ScoreBoard.vue";
import CurrentMatch from "@/components/CurrentMatch.vue";
import TournamentNav from "@/components/TournamentNav.vue";

export default {
  name: "home",
  components: {
    ScoreBoard,
    CurrentMatch,
    TournamentNav
  }
};
</script>
