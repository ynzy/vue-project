<template>
  <div class="mine">
   <MeNav></MeNav>
   <MeBanner></MeBanner>
   <MeMoney></MeMoney>
   <MeOther></MeOther>
  </div>
</template>

<script>
import MeNav from './MeNav'
import MeBanner from './MeBanner'
import MeMoney from './MeMoney'
import MeOther from './MeOther'
export default {
  data() {
    return {

    }
  },
  components: {
    MeNav,
    MeBanner,
    MeMoney,
    MeOther
  }
};
</script>

<style less="" scoped>
</style>