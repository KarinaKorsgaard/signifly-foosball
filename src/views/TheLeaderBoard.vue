<template>
  <div class="about">
    <h1>Signifly Leaderboard</h1>
    <TournamentNav />
    <LeaderBoard />
  </div>
</template>

<script>
// @ is an alias to /src
import LeaderBoard from "@/components/LeaderBoard.vue";
import TournamentNav from "@/components/TournamentNav.vue";

export default {
  name: "TheLeaderBoard",
  components: {
    LeaderBoard,
    TournamentNav
  }
};
</script>
