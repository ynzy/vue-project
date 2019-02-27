<template>
  <div id="app">
    <v-header></v-header>
    <!-- <router-view/> -->
  </div>
</template>

<script>
import Header from "./components/Header.vue"

export default {
  name: 'App',
  components: {
    "v-header": Header
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">


</style>
