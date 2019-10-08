import Vue from "vue";
import Vuex from "vuex";
import Data from "@/assets/data.json";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tournaments: [],
    teamNames: [],
    loaded: false,
    teamIds: [],
    numberOfTeams: 0,
    tournamentId: 0,
    currentGame: -2
  },
  mutations: {
    setTournaments(state, tournaments) {
      state.tournaments = tournaments;
    },
    setTeamNames(state, names) {
      state.teamNames = names;
    },
    setNumberOfTeams(state, games) {
      const allIds = games["games"].flatMap(x => [x.id[0], x.id[1]]);
      const unique = allIds.filter((v, i, a) => a.indexOf(v) === i);
      state.numberOfTeams = unique.length;
    },
    setTournamentId(state, id) {
      state.tournamentId = id;
      this.commit("setNumberOfTeams", state.tournaments[id]);
    },
    updateScore(state, params) {
      const old = [...state.tournaments];
      old[state.tournamentId].games[params.currentGame].score[params.teamID]++;
      state.tournaments = old;
    },
    setCurrentGame(state, id) {
      state.currentGame = id;
    }
  },
  actions: {
    fetchData({ commit }) {
      commit("setTournaments", Data.tournaments);
      commit("setTournamentId", Data.tournaments.length - 1);
      commit("setTeamNames", Data.teamnames);

      this.state.loaded = true;
      return this.state;
    }
  }
});
