<template>
    <div>
        <HomeNav></HomeNav>
        <HomeBanner></HomeBanner>
        <HomeColumn></HomeColumn>
        <HomeAd></HomeAd>
        <HomeShop></HomeShop>
        <!-- <router-link to="/meishi">美食</router-link> -->
    </div>
</template>

<script>
import HomeNav from './HomeNav.vue'
import HomeBanner from './HomeBanner.vue'
import HomeColumn from './HomeColumn.vue'
import HomeAd from './HomeAd.vue'
import HomeShop from './HomeShop.vue'
    export default {
        components: {
            HomeNav,
            HomeBanner,
            HomeColumn,
            HomeAd,
            HomeShop
        }
    }
</script>

<style scoped>

</style>