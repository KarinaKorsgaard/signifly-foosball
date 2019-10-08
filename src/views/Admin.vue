<template>
  <div class="home">
    <h1>Edit team names</h1>
    <EditTeamNames />
  </div>
</template>

<script>
// @ is an alias to /src
import EditTeamNames from "@/components/EditTeamNames.vue";

export default {
  name: "admin",
  components: {
    EditTeamNames
  }
};
</script>
