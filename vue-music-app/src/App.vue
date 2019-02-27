<template>
  <div id="app">
    <v-header></v-header>
    <Tab></Tab>
    <router-view/>
  </div>
</template>

<script>
import Header from "./components/Header.vue"
import Tab from "./components/Tab.vue"
export default {
  name: 'App',
  components: {
    "v-header": Header,
    Tab
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import './common/css/reset'
    body
      margin 0
      padding 0


</style>
