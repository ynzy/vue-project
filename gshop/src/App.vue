<template>
  <div id="app">
    <router-view/>
    <!-- TODO: 底部菜单组件是否要显示 -->
    <FooterGuide v-show="$route.meta.showFooter"></FooterGuide>
  </div>
</template>

<script>
import FooterGuide from './components/FooterGuide/FooterGuide.vue'
export default {
  name: 'App',
  components: {
    FooterGuide
  }
}
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>
  #app
    width 100%
    height 100%
    background #f5f5f5
</style>
