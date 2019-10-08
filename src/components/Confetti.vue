<template></template>

<script>
export default {
  data: function() {
    return {
      timeoutID: null,
      options: {
        particles: [
          {
            type: "heart"
          },
          {
            type: "circle"
          }
        ],
        defaultColors: ["lightgreen", "pink", "#1434e0"],
        defaultDropRate: 10,
        defaultSize: 20,
        particlesPerFrame: 1
      }
    };
  },

  methods: {
    start() {
      if (this.timeoutID == null) {
        this.$confetti.start(this.options);
      }

      window.clearTimeout(this.timeoutID);
      this.timeoutID = window.setTimeout(this.stop, 500);
	},
	
    stop() {
      this.$confetti.stop();
      this.timeoutID = null;
    }
  }
};
</script>