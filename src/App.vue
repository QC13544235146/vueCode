<template>
  <div>
    <!-- <img src="./assets/logo.png"> -->
    <router-view></router-view>
    <foot-guide v-bind:active="active"></foot-guide>
  </div>
</template>

<script>
import FootGuide from "./components/footer/footGuide";
export default {
  data() {
    return {
      active: [false, false, false, false]
    };
  },
  components: {
    FootGuide
  },
  watch: {
    $route(to, from) {
      //console.log(to.path);
      var path = to.path;
      this.active=[false, false, false, false]
      if (path == "/home") {
        this.active[0] = true;
      } else if (path == "/report") {
        this.active[1] = true;
      } else if (path == "/record") {
        this.active[2] = true;
      } else {
        this.active[3] = true;
      }
    }
  },
  created: function() {
    var path = this.$route.path;
    if (path == "/home") {
      this.active[0] = true;
    } else if (path == "/report") {
      this.active[1] = true;
    } else if (path == "/record") {
      this.active[2] = true;
    } else {
      this.active[3] = true;
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
